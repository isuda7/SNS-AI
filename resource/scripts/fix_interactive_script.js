const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const scriptToInject = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // 1. Variable Apply Logic
            const applyBtns = Array.from(document.querySelectorAll('.btn-primary')).filter(btn => btn.textContent.includes('적용하여 프롬프트 완성하기'));
            const applyBtn = applyBtns.length > 0 ? applyBtns[0] : null;
            const varGroups = document.querySelectorAll('.var-group');
            const promptTextContainer = document.querySelector('.prompt-text');
            
            if (promptTextContainer) {
                const originalPromptHTML = promptTextContainer.innerHTML;

                if (applyBtn && varGroups.length > 0) {
                    applyBtn.addEventListener('click', () => {
                        let currentHTML = originalPromptHTML;
                        
                        varGroups.forEach(group => {
                            const labelEl = group.querySelector('label');
                            const inputEl = group.querySelector('.var-input');
                            if (labelEl && inputEl) {
                                const varIdMatch = labelEl.textContent.match(/(\\[.*?\\])/);
                                if (varIdMatch && inputEl.value.trim() !== '') {
                                    const varId = varIdMatch[1];
                                    // Safe escaping without using special replacement patterns
                                    const escapedVarId = varId.replace(/\\[/g, '\\\\[').replace(/\\]/g, '\\\\]');
                                    const regex = new RegExp('<span class="variable">' + escapedVarId + '</span>', 'g');
                                    
                                    const highlightedValue = '<span class="variable" style="color: var(--primary); font-weight: bold; background: rgba(99, 102, 241, 0.1); padding: 0.1rem 0.3rem; border-radius: 4px;">' + inputEl.value + '</span>';
                                    currentHTML = currentHTML.replace(regex, highlightedValue);
                                }
                            }
                        });
                        
                        promptTextContainer.innerHTML = currentHTML;
                        
                        const originalText = applyBtn.innerHTML;
                        applyBtn.innerHTML = '<i class="ph ph-check"></i> 적용 완료!';
                        setTimeout(() => { applyBtn.innerHTML = originalText; }, 1500);
                    });
                }
            }
            
            // 2. Clipboard Copy Logic
            const copyBtns = document.querySelectorAll('.copy-btn, .header-actions .btn-primary');
            copyBtns.forEach(btn => {
                if (btn.textContent.includes('전체 복사') || btn.textContent.includes('복사')) {
                    btn.addEventListener('click', () => {
                        if (promptTextContainer) {
                            const textToCopy = promptTextContainer.innerText;
                            navigator.clipboard.writeText(textToCopy).then(() => {
                                const originalHTML = btn.innerHTML;
                                btn.innerHTML = '<i class="ph ph-check"></i> 복사 완료!';
                                setTimeout(() => { btn.innerHTML = originalHTML; }, 1500);
                            });
                        }
                    });
                }
            });
        });
    </script>
`;

let fixCount = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the broken script block completely
    const brokenScriptRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/;
    if (brokenScriptRegex.test(content)) {
        content = content.replace(brokenScriptRegex, '');
    }
    
    // Also remove any stray \n</body> if they duplicated, just to be safe.
    // The previous script did replace('</body>', script + '\n</body>').
    // Since the script block was matched and removed above, we might just have `</body>` left.
    // Let's ensure there's exactly one </body> tag.
    
    // Now inject safely using a replacement function to avoid $& bugs!
    if (content.includes('</body>')) {
        content = content.replace('</body>', () => scriptToInject + '\n</body>');
        fs.writeFileSync(filePath, content);
        fixCount++;
    }
});
console.log('Fixed broken script tags in ' + fixCount + ' files.');

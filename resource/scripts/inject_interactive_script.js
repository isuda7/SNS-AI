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
                // Store the original HTML so we can re-apply multiple times safely
                const originalPromptHTML = promptTextContainer.innerHTML;

                if (applyBtn && varGroups.length > 0) {
                    applyBtn.addEventListener('click', () => {
                        let currentHTML = originalPromptHTML;
                        
                        varGroups.forEach(group => {
                            const labelEl = group.querySelector('label');
                            const inputEl = group.querySelector('.var-input');
                            if (labelEl && inputEl) {
                                // Extract [variable_name] from the label text
                                const varIdMatch = labelEl.textContent.match(/(\\[.*?\\])/);
                                if (varIdMatch && inputEl.value.trim() !== '') {
                                    const varId = varIdMatch[1];
                                    const escapedVarId = varId.replace(/[\\[\\]]/g, '\\\\$&');
                                    // Match the exact span structure used in the template
                                    const regex = new RegExp('<span class="variable">' + escapedVarId + '</span>', 'g');
                                    
                                    // Replace with user input, making it stand out
                                    const highlightedValue = '<span class="variable" style="color: var(--primary); font-weight: bold; background: rgba(99, 102, 241, 0.1); padding: 0.1rem 0.3rem; border-radius: 4px;">' + inputEl.value + '</span>';
                                    currentHTML = currentHTML.replace(regex, highlightedValue);
                                }
                            }
                        });
                        
                        promptTextContainer.innerHTML = currentHTML;
                        
                        // Button feedback
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
                            // Extract only the text without HTML tags
                            const textToCopy = promptTextContainer.innerText;
                            navigator.clipboard.writeText(textToCopy).then(() => {
                                const originalHTML = btn.innerHTML;
                                btn.innerHTML = '<i class="ph ph-check"></i> 복사 완료!';
                                setTimeout(() => { btn.innerHTML = originalHTML; }, 1500);
                            }).catch(err => {
                                console.error('Failed to copy: ', err);
                            });
                        }
                    });
                }
            });
        });
    </script>
`;

let updateCount = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove old script block if it exists
    const existingScriptRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/;
    if (existingScriptRegex.test(content)) {
        content = content.replace(existingScriptRegex, '');
    }
    
    // Inject the script just before the closing </body> tag
    if (content.includes('</body>')) {
        content = content.replace('</body>', scriptToInject + '\n</body>');
        fs.writeFileSync(filePath, content);
        updateCount++;
    }
});
console.log('Injected interactive script to ' + updateCount + ' files.');

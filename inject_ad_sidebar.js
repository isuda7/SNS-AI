const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newAdSidebar = `
            <!-- Level 1: 광고 사이트 -->
            <li class="nav-item">
                <details>
                    <summary class="nav-link">
                        <i class="ph ph-megaphone nav-icon"></i> 광고 사이트
                        <i class="ph ph-caret-down toggle-icon"></i>
                    </summary>
                    <div class="nav-sub">
                        <details>
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-shopping-cart"></i> 제휴 마케팅 (Affiliate)</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="ad-coupang.html" class="nav-link-sub-sub">쿠팡 파트너스</a>
                                <a href="ad-clickbank.html" class="nav-link-sub-sub">클릭뱅크 (ClickBank)</a>
                            </div>
                        </details>
                        
                        <details>
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-hand-coins"></i> CPA / CPI 네트워크</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="ad-tenping.html" class="nav-link-sub-sub">텐핑 (Tenping) 노하우</a>
                            </div>
                        </details>
                    </div>
                </details>
            </li>
`;

let count = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('<!-- Level 1: 광고 사이트 -->')) {
        const startIdx = content.indexOf('<!-- Level 1: 광고 사이트 -->');
        const endIdx = content.indexOf('</li>', startIdx) + 5;
        content = content.substring(0, startIdx) + content.substring(endIdx);
    }
    
    const searchStart = '<i class="ph ph-robot nav-icon"></i> AI Platform';
    const startIdx = content.indexOf(searchStart);
    if (startIdx !== -1) {
        const liStart = content.lastIndexOf('<li class="nav-item">', startIdx);
        // Find the END of this li.nav-item. It could contain many nested details.
        // It's safer to find the </li> that belongs to it.
        // But since we know the structure:
        // <li class="nav-item">
        //   <details> ... <summary> ... </summary> <div class="nav-sub"> ... </div> </details>
        // </li>
        // We can just find the NEXT <li class="nav-item"> or </ul>
        const nextLiIdx = content.indexOf('<li class="nav-item">', startIdx);
        const ulEndIdx = content.indexOf('</ul>', startIdx);
        
        let insertPos = -1;
        if (nextLiIdx !== -1 && nextLiIdx < ulEndIdx) {
            insertPos = nextLiIdx;
        } else {
            insertPos = ulEndIdx;
        }
        
        content = content.substring(0, insertPos) + newAdSidebar + '\n' + content.substring(insertPos);
        fs.writeFileSync(filePath, content);
        count++;
    }
});
console.log('Appended Ad sidebar to ' + count + ' files.');

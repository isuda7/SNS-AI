const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const accordionScript = `
            // 3. Sidebar Accordion Logic
            const allDetails = document.querySelectorAll('.sidebar details');
            allDetails.forEach(details => {
                details.addEventListener('toggle', (e) => {
                    if (details.open) {
                        allDetails.forEach(other => {
                            if (other !== details && other.open) {
                                const isLevel1 = details.parentElement.classList.contains('nav-item');
                                const isOtherLevel1 = other.parentElement.classList.contains('nav-item');
                                
                                const isLevel2 = details.parentElement.classList.contains('nav-sub');
                                const isOtherLevel2 = other.parentElement.classList.contains('nav-sub');
                                
                                if (isLevel1 && isOtherLevel1) {
                                    other.removeAttribute('open');
                                } else if (isLevel2 && isOtherLevel2) {
                                    // Only close level 2 details if they are in the same parent menu
                                    if (details.parentElement === other.parentElement) {
                                        other.removeAttribute('open');
                                    }
                                }
                            }
                        });
                    }
                });
            });
`;

let count = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Only inject if it doesn't already have the accordion script
    if (!content.includes('// 3. Sidebar Accordion Logic')) {
        // Find the existing script block
        // All files should have // 2. Clipboard Copy Logic
        const injectPoint = content.indexOf('// 2. Clipboard Copy Logic');
        if (injectPoint !== -1) {
            // Find the end of the Clipboard logic, or just inject before the end of the script block
            const scriptEnd = content.lastIndexOf('});', content.lastIndexOf('</script>'));
            if (scriptEnd !== -1) {
                content = content.substring(0, scriptEnd) + accordionScript + content.substring(scriptEnd);
                fs.writeFileSync(filePath, content);
                count++;
            }
        }
    }
});

console.log('Injected accordion logic into ' + count + ' files.');

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dynamicSidebarScript = `
            // 4. Dynamic Sidebar Active State Logic
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            const sidebarLinks = document.querySelectorAll('.sidebar a');
            
            // First, remove any hardcoded active/open states in the DOM just to be perfectly clean
            document.querySelectorAll('.sidebar details').forEach(d => d.removeAttribute('open'));
            document.querySelectorAll('.sidebar .active').forEach(el => el.classList.remove('active'));
            
            let foundActive = false;
            sidebarLinks.forEach(link => {
                const href = link.getAttribute('href');
                // Check if the href matches the current file
                if (href && href.includes(currentPath) && !foundActive) {
                    foundActive = true;
                    // Add active to the link itself
                    link.classList.add('active');
                    
                    // Traverse up and open parent details
                    let parent = link.closest('details');
                    while (parent) {
                        parent.setAttribute('open', '');
                        
                        // Make the top-level summary active if it's the main category
                        const summary = parent.querySelector(':scope > summary');
                        if (summary && summary.classList.contains('nav-link')) {
                            summary.classList.add('active');
                        }
                        
                        parent = parent.parentElement.closest('details');
                    }
                }
            });
`;

let count = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove ALL hardcoded 'open' attributes from <details> in the sidebar
    // We only want to target <details> inside the sidebar, but since this is a global replace, 
    // it's safer to use regex targeting <details ...> inside the <aside class="sidebar">.
    const sidebarStart = content.indexOf('<aside class="sidebar">');
    const sidebarEnd = content.indexOf('</aside>');
    if (sidebarStart !== -1 && sidebarEnd !== -1) {
        let sidebarHtml = content.substring(sidebarStart, sidebarEnd);
        
        // Strip open
        sidebarHtml = sidebarHtml.replace(/<details\s+[^>]*open[^>]*>/g, match => match.replace(/\sopen/g, ''));
        sidebarHtml = sidebarHtml.replace(/<details\s*open\s*>/g, '<details>');
        
        // Strip active from summary and a tags
        sidebarHtml = sidebarHtml.replace(/class="([^"]*)\bactive\b([^"]*)"/g, 'class="$1$2"');
        // Clean up double spaces from the replacement
        sidebarHtml = sidebarHtml.replace(/class="\s+/g, 'class="').replace(/\s+"/g, '"').replace(/\s{2,}/g, ' ');

        content = content.substring(0, sidebarStart) + sidebarHtml + content.substring(sidebarEnd);
    }
    
    // Inject the dynamic JS if it doesn't exist
    if (!content.includes('// 4. Dynamic Sidebar Active State Logic')) {
        const injectPoint = content.lastIndexOf('});', content.lastIndexOf('</script>'));
        if (injectPoint !== -1) {
            content = content.substring(0, injectPoint) + dynamicSidebarScript + content.substring(injectPoint);
        }
    } else {
        // Replace existing just in case
        const regex = /\/\/ 4\. Dynamic Sidebar Active State Logic[\s\S]*?(?=\}\);)/;
        content = content.replace(regex, dynamicSidebarScript);
    }

    fs.writeFileSync(filePath, content);
    count++;
});

console.log('Applied dynamic sidebar logic to ' + count + ' files.');

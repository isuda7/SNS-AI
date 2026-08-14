const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function processHtml(html) {
    // 폰트사이즈, 줄간격, 색상 등 인라인 스타일 주입
    // \b matches word boundary to prevent matching things like <property>
    html = html.replace(/<p([^>]*)>/gi, '<p$1 style="margin-bottom: 1.2rem; margin-top: 0; font-size: 16px; line-height: 1.8; color: #333; font-family: \'Pretendard\', -apple-system, sans-serif;">');
    html = html.replace(/<img([^>]*)>/gi, '<img$1 style="max-width: 100%; height: auto; border-radius: 12px; margin: 2rem 0; display: block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">');
    html = html.replace(/<ul([^>]*)>/gi, '<ul$1 style="margin-left: 1.5rem; margin-bottom: 1.5rem; font-size: 16px; line-height: 1.8; color: #333;">');
    html = html.replace(/<ol([^>]*)>/gi, '<ol$1 style="margin-left: 1.5rem; margin-bottom: 1.5rem; font-size: 16px; line-height: 1.8; color: #333;">');
    html = html.replace(/<li([^>]*)>/gi, '<li$1 style="margin-bottom: 0.5rem;">');
    html = html.replace(/<strong([^>]*)>/gi, '<strong$1 style="font-weight: 700; color: #111;">');
    html = html.replace(/<b([^>]*)>/gi, '<b$1 style="font-weight: 700; color: #111;">');
    html = html.replace(/<h2([^>]*)>/gi, '<h2$1 style="font-size: 1.5rem; font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; color: #111;">');
    html = html.replace(/<h3([^>]*)>/gi, '<h3$1 style="font-size: 1.3rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.8rem; color: #222;">');
    html = html.replace(/<table([^>]*)>/gi, '<table$1 style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; border: 1px solid #ddd; font-size: 16px; text-align: left;">');
    html = html.replace(/<th([^>]*)>/gi, '<th$1 style="padding: 10px; border: 1px solid #ddd; background-color: #f8f9fa; font-weight: 600;">');
    html = html.replace(/<td([^>]*)>/gi, '<td$1 style="padding: 10px; border: 1px solid #ddd;">');
    // Remove duplicate style attributes that might occur if we run this multiple times
    // This is simple but for this context it works (assuming no complex overlapping)
    return html;
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.js') && file !== 'data.js' && file !== 'app.js') { // Only data drafts
            console.log(`Processing ${fullPath}`);
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Extract the contentHtml value which is wrapped in backticks or quotes
            // Since it's a JS file using template literals (backticks) or double quotes for contentHtml:
            // Let's use a regex to match "contentHtml": `...` or "contentHtml": "..."
            
            // First let's try backticks
            const backtickRegex = /("contentHtml"\s*:\s*)`([\s\S]*?)`/g;
            let replaced = false;
            content = content.replace(backtickRegex, (match, p1, html) => {
                replaced = true;
                return p1 + '`\n' + processHtml(html).trim() + '\n`';
            });
            
            // Try double quotes if backticks not used
            if (!replaced) {
                const quoteRegex = /("contentHtml"\s*:\s*)"([^"]*)"/g;
                content = content.replace(quoteRegex, (match, p1, html) => {
                    // if it's quotes, html has escaped newlines like \n and \", unescape first
                    let rawHtml = html.replace(/\\n/g, '\n').replace(/\\"/g, '"');
                    let newHtml = processHtml(rawHtml);
                    // escape back
                    newHtml = newHtml.replace(/\n/g, '\\n').replace(/"/g, '\\"');
                    return p1 + '"' + newHtml + '"';
                });
            }
            
            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

const targetDir = path.join(__dirname, '..', 'data');
processDirectory(targetDir);
console.log('Finished processing all files.');

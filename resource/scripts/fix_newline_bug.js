const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the literal text "\n" (backslash and n) with an actual newline character
    content = content.replace(/\\n/g, '\n');
    
    fs.writeFileSync(filePath, content);
});
console.log('Fixed the literal \\n characters in all HTML files.');

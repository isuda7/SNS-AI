const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedFiles = [];
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('글로벌 기본 상식')) {
        content = content.replace(/글로벌 기본 상식/g, '프롬프트 기본 상식');
        fs.writeFileSync(filePath, content);
        updatedFiles.push(file);
    }
});
console.log('Replaced in:', updatedFiles.join(', '));

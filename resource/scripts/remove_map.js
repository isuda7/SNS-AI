const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace 'AI Prompt 맵' with 'AI Prompt'
    content = content.replace(/AI Prompt 맵/g, 'AI Prompt');
    
    fs.writeFileSync(filePath, content);
});
console.log('Removed " 맵" from AI Prompt menu across all 15 files.');

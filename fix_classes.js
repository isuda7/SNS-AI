const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix duplicate class attribute
    content = content.replace(/class="nav-link-sub-sub"\s*class="nav-link-sub-sub active"/g, 'class="nav-link-sub-sub active"');
    
    fs.writeFileSync(filePath, content);
});
console.log('Fixed duplicate classes');

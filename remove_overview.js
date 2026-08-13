const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Use regex to remove the Overview nav-item block safely
    // Looking for: <li class="nav-item"> ... 오버뷰 ... </li>
    // Note: It's the first li.nav-item in the ul.nav-menu.
    const regex = /<li class="nav-item">\s*<a href="index\.html" class="nav-link(?:\s+active)?">\s*<i class="ph ph-squares-four nav-icon"><\/i>\s*오버뷰\s*<\/a>\s*<\/li>/;
    
    if (regex.test(content)) {
        content = content.replace(regex, '');
        fs.writeFileSync(filePath, content);
        count++;
    }
});

console.log('Removed Overview menu from ' + count + ' files.');

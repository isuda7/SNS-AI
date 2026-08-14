const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.startsWith('platform-') && f.endsWith('.html'));

let fixCount = 0;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix double class attribute
    // Example: class="nav-link-sub-sub" class="nav-link-sub-sub active"
    content = content.replace(/class="nav-link-sub-sub"\s*class="nav-link-sub-sub active"/g, 'class="nav-link-sub-sub active"');

    // 2. Fix top-level AI Prompt active state
    // In prompt-persona.html, AI Prompt has <summary class="nav-link active">
    const promptSearch = '<i class="ph ph-chat-text nav-icon"></i> AI Prompt';
    const promptIdx = content.indexOf(promptSearch);
    if (promptIdx !== -1) {
        // Find the summary tag before it
        const summaryStart = content.lastIndexOf('<summary', promptIdx);
        const summaryEnd = content.indexOf('>', summaryStart);
        const summaryTag = content.substring(summaryStart, summaryEnd + 1);
        
        if (summaryTag.includes('active')) {
            const newSummaryTag = summaryTag.replace('active', '').trim().replace('class="nav-link "', 'class="nav-link"');
            content = content.substring(0, summaryStart) + newSummaryTag + content.substring(summaryEnd + 1);
        }
    }

    // 3. Set top-level AI Platform to active
    const platformSearch = '<i class="ph ph-robot nav-icon"></i> AI Platform';
    const platformIdx = content.indexOf(platformSearch);
    if (platformIdx !== -1) {
        const summaryStart = content.lastIndexOf('<summary', platformIdx);
        const summaryEnd = content.indexOf('>', summaryStart);
        const summaryTag = content.substring(summaryStart, summaryEnd + 1);
        
        if (!summaryTag.includes('active')) {
            const newSummaryTag = summaryTag.replace('class="nav-link"', 'class="nav-link active"');
            content = content.substring(0, summaryStart) + newSummaryTag + content.substring(summaryEnd + 1);
        }
    }

    fs.writeFileSync(filePath, content);
    fixCount++;
});

console.log('Fixed active state bugs in ' + fixCount + ' platform files.');

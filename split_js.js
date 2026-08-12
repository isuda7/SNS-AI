const fs = require('fs');
const glob = require('glob');
const path = require('path');

const base_dir = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data";

// Read all JS files
const files = glob.sync(`${base_dir}/**/*.js`).filter(f => !f.includes('ai_templates.js'));

let allDrafts = [];
files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    // Extract JSON array
    const match = content.match(/window\.draftData\.push\(\.\.\.(\[[\s\S]*?\])\);/);
    if (match) {
        try {
            const arr = JSON.parse(match[1]);
            allDrafts = allDrafts.concat(arr);
        } catch(e) {
            console.error("Failed to parse", f, e);
        }
    }
    // Delete the old file
    fs.unlinkSync(f);
});

// Write into new structure: account/category/draft_id.js
const scriptTags = [];
allDrafts.forEach((draft, idx) => {
    let acc_folder = "";
    if (draft.account.includes("계정 1")) acc_folder = "account1";
    else if (draft.account.includes("계정 2")) acc_folder = "account2";
    else acc_folder = "account3";
    
    let cat_folder = draft.category.replace(/[\/ &]+/g, "_");
    let target_dir = path.join(base_dir, acc_folder, cat_folder);
    
    if (!fs.existsSync(target_dir)) fs.mkdirSync(target_dir, {recursive: true});
    
    let target_file = path.join(target_dir, draft.id + ".js");
    let content = `window.draftData = window.draftData || [];\nwindow.draftData.push(${JSON.stringify(draft, null, 2)});\n`;
    
    fs.writeFileSync(target_file, content);
    
    let rel_path = path.relative("/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard", target_file);
    scriptTags.push(`<script src="${rel_path}"></script>`);
});

// Update index.html
let html = fs.readFileSync("/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html", "utf8");

// We need to replace all script tags from data/... with the new ones.
// We'll find the ai_templates.js script and replace everything before it that matches data/
html = html.replace(/<script src="data\/account[123].*?\.js"><\/script>\n\s*/g, '');

// Insert new scripts before ai_templates
const aiScriptStr = '<script src="data/ai_templates.js"></script>';
html = html.replace(aiScriptStr, scriptTags.join('\n    ') + '\n    ' + aiScriptStr);

fs.writeFileSync("/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html", html);
console.log("Restructured to 1 file per draft.");

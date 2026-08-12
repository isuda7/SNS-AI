const fs = require('fs');

// Read data.js, remove const declarations and export the object
let content = fs.readFileSync('/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/js/data.js', 'utf8');

// We need to evaluate the code to get the array.
// Wrap it in a function and return the arrays.
let execContent = content + "\n\nmodule.exports = { initialDrafts, aiTemplates };";

fs.writeFileSync('temp_data.js', execContent);
const data = require('./temp_data.js');

const accounts_map = {
    "👤 계정 1 (IT / 테크)": "account1",
    "👤 계정 2 (경제 / 재테크)": "account2",
    "👤 계정 3 (자기계발)": "account3"
};

const base_dir = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data";

if (!fs.existsSync(base_dir)) fs.mkdirSync(base_dir, {recursive: true});

// To keep track of files to load
const indexList = [];

data.initialDrafts.forEach(draft => {
    let acc_folder = accounts_map[draft.account];
    let cat_folder = draft.category.replace(/[\/ &]+/g, "_");
    
    let dir = base_dir + "/" + acc_folder;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
    
    let file_path = dir + "/" + cat_folder + ".json";
    
    // We store as an array in the file, so multiple drafts in same category can be appended.
    let existing = [];
    if (fs.existsSync(file_path)) {
        existing = JSON.parse(fs.readFileSync(file_path, 'utf8'));
    }
    existing.push(draft);
    
    fs.writeFileSync(file_path, JSON.stringify(existing, null, 2));
    
    let rel_path = "data/" + acc_folder + "/" + cat_folder + ".json";
    if (!indexList.includes(rel_path)) {
        indexList.push(rel_path);
    }
});

fs.writeFileSync(base_dir + "/index.json", JSON.stringify(indexList, null, 2));

// Keep AI templates in a separate json
fs.writeFileSync(base_dir + "/ai_templates.json", JSON.stringify(data.aiTemplates, null, 2));

console.log("Data successfully split into JSON files.");

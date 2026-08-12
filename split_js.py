import os
import json
import glob
import re

base_dir = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data"
html_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"

# Read all JS files except ai_templates.js
js_files = glob.glob(f"{base_dir}/**/*.js", recursive=True)
js_files = [f for f in js_files if "ai_templates.js" not in f]

all_drafts = []

for f in js_files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
        match = re.search(r'window\.draftData\.push\(\.\.\.(\[.*?\])\);', content, re.DOTALL)
        if match:
            try:
                arr = json.loads(match.group(1))
                all_drafts.extend(arr)
            except Exception as e:
                print(f"Failed to parse {f}: {e}")
    # Remove the old file
    os.remove(f)

# Recreate the 1-file-per-draft structure
script_tags = []

for draft in all_drafts:
    account = draft.get('account', '')
    acc_folder = 'account1' if '계정 1' in account else ('account2' if '계정 2' in account else 'account3')
    
    # Clean category name for folder
    cat = draft.get('category', 'misc')
    cat_folder = re.sub(r'[\/ &]+', '_', cat)
    
    target_dir = os.path.join(base_dir, acc_folder, cat_folder)
    os.makedirs(target_dir, exist_ok=True)
    
    draft_id = draft.get('id', 'draft_unknown')
    target_file = os.path.join(target_dir, f"{draft_id}.js")
    
    content = f"window.draftData = window.draftData || [];\nwindow.draftData.push({json.dumps(draft, ensure_ascii=False, indent=2)});\n"
    
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(content)
    
    rel_path = os.path.relpath(target_file, "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard")
    script_tags.append(f'<script src="{rel_path}"></script>')

# Clean up empty directories from old structure
for root, dirs, files in os.walk(base_dir, topdown=False):
    for name in dirs:
        try:
            os.rmdir(os.path.join(root, name))
        except OSError:
            pass

# Update index.html
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Remove old data script tags
html = re.sub(r'<script src="data/account[123].*?\.js"></script>\n\s*', '', html)

# Insert new script tags right before ai_templates
ai_script = '<script src="data/ai_templates.js"></script>'
new_scripts = "\n    ".join(script_tags) + "\n    " + ai_script
html = html.replace(ai_script, new_scripts)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Restructured to 1 file per draft successfully.")

import os
import json
import glob
import re
import shutil

base_dir = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data"
html_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"

# Read all individual draft JS files
js_files = glob.glob(f"{base_dir}/**/*.js", recursive=True)
js_files = [f for f in js_files if "ai_templates.js" not in f and len(f.split("/")) > 8] # those in deep folders

category_data = {}

for f in js_files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
        match = re.search(r'window\.draftData\.push\(([\s\S]*)\);', content)
        if match:
            try:
                draft = json.loads(match.group(1))
                
                account = draft.get('account', '')
                acc_folder = 'account1' if '계정 1' in account else ('account2' if '계정 2' in account else 'account3')
                cat = draft.get('category', 'misc')
                cat_name = re.sub(r'[\/ &]+', '_', cat)
                
                key = f"{acc_folder}/{cat_name}"
                if key not in category_data:
                    category_data[key] = []
                
                category_data[key].append(draft)
            except Exception as e:
                print(f"Failed to parse {f}: {e}")
    os.remove(f)

# Clean up empty directories
for root, dirs, files in os.walk(base_dir, topdown=False):
    for name in dirs:
        try:
            os.rmdir(os.path.join(root, name))
        except OSError:
            pass

# Write the new aggregated files
script_tags = []

for key, drafts in category_data.items():
    acc_folder, cat_name = key.split("/")
    target_dir = os.path.join(base_dir, acc_folder)
    os.makedirs(target_dir, exist_ok=True)
    
    target_file = os.path.join(target_dir, f"{cat_name}.js")
    
    content = f"window.draftData = window.draftData || [];\nwindow.draftData.push(...{json.dumps(drafts, ensure_ascii=False, indent=2)});\n"
    
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(content)
        
    rel_path = os.path.relpath(target_file, "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard")
    script_tags.append(f'<script src="{rel_path}"></script>')

# Update HTML
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Remove old deep script tags
html = re.sub(r'<script src="data/account[123]/.*?/.*?\.js"></script>\n\s*', '', html)

# Insert new aggregated script tags
ai_script = '<script src="data/ai_templates.js"></script>'
new_scripts = "\n    ".join(script_tags) + "\n    " + ai_script
html = html.replace(ai_script, new_scripts)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Aggregated to 1 file per menu successfully.")

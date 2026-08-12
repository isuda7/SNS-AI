import os
import json
import glob

base_dir = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data"
html_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"

# Get all json files except index.json
json_files = glob.glob(f"{base_dir}/**/*.json", recursive=True)
json_files = [f for f in json_files if "index.json" not in f]

script_tags = []

for file_path in json_files:
    with open(file_path, "r", encoding="utf-8") as f:
        data = f.read()
    
    js_content = f"window.draftData = window.draftData || [];\nwindow.draftData.push(...{data});\n"
    
    js_file_path = file_path.replace(".json", ".js")
    with open(js_file_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    # Remove old json file
    os.remove(file_path)
    
    # Prepare script tag path (relative to index.html)
    rel_path = os.path.relpath(js_file_path, "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard")
    script_tags.append(f'<script src="{rel_path}"></script>')

# Remove index.json as it's no longer needed
if os.path.exists(f"{base_dir}/index.json"):
    os.remove(f"{base_dir}/index.json")

# Update index.html to include these script tags
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

# Find where to inject script tags
# Replace the old comment <!-- <script src="js/data.js"></script> Replaced by dynamic JSON fetching -->
old_comment = "<!-- <script src=\"js/data.js\"></script> Replaced by dynamic JSON fetching -->"
new_scripts = "\n    ".join(script_tags)

if old_comment in html_content:
    html_content = html_content.replace(old_comment, new_scripts)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("JSON files converted to JS and HTML updated.")

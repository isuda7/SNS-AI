import os
import json
import glob
import re
import shutil

base_dir = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data"
html_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"

# Backup and cleanup old structure
# First read everything to memory
all_data_str = ""
js_files = glob.glob(f"{base_dir}/**/*.js", recursive=True)
for f in js_files:
    if "ai_templates.js" not in f:
        with open(f, "r", encoding="utf-8") as file:
            # We strip out the window.draftData prefix to parse the JSON array
            content = file.read()
            match = re.search(r'window\.draftData\.push\(\.\.\.(\[.*?\])\);', content, re.DOTALL)
            if match:
                all_data_str += match.group(1) + ","
                
# This will form a list of arrays string. We need to evaluate it properly.
# But actually, I already have the exact data in JS arrays, I'll just write a JS script to do it.

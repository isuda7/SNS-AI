import json
import glob
import re

files = glob.glob("/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data/*/*.js")

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    
    match = re.search(r'window\.draftData\.push\(\.\.\.([\s\S]*?)\);\n*$', content)
    if not match:
        continue
    
    try:
        drafts = json.loads(match.group(1))
        for d in drafts:
            html = d.get('contentHtml', '')
            text_only = re.sub(r'<[^>]+>', '', html)
            text_no_spaces = re.sub(r'\s+', '', text_only)
            print(f"[{d['category']}] Length: {len(text_no_spaces)} chars")
            
            img_count = html.count('<img')
            print(f" - Image count: {img_count}")
    except Exception as e:
        print(f"Error reading {f}: {e}")

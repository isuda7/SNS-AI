import json
import re

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data/account3/월별_추천도서.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract the JSON array
match = re.search(r'window\.draftData\.push\(\.\.\.([\s\S]*?)\);\n*$', content)
if not match:
    print("Failed to find JSON data")
    exit(1)

drafts = json.loads(match.group(1))

# We need to swap <img ...> and <h3>...</h3> so it becomes <img> then <h3>.
for draft in drafts:
    html = draft.get('contentHtml', '')
    
    # regex to swap img and h3
    # Find: <img ...>(whitespace)<h3>...</h3>
    # Swap: <img ...> goes BEFORE <h3>. Wait, right now it's <h3> then <img>.
    # So we find <h3>...</h3>(whitespace)<img ...> and swap them.
    
    # <h3>💡 사피엔스: ...</h3>\n<img src="..." alt="Book Cover" style="...">\n
    
    new_html = re.sub(
        r'(<h3[^>]*>.*?</h3>)\s*(<img[^>]+>)',
        r'\2\n\1',
        html
    )
    
    draft['contentHtml'] = new_html

new_content = f"window.draftData = window.draftData || [];\nwindow.draftData.push(...{json.dumps(drafts, ensure_ascii=False, indent=2)});\n"

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Book layouts swapped successfully.")

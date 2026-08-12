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

# Dictionary of images mapping a book name to its URL
book_images = {
    "도파민": "https://image.yes24.com/goods/108389546/L",
    "생각에 관한 생각": "https://image.yes24.com/goods/59580017/L",
    "그릿": "https://image.yes24.com/goods/69622442/L",
    "넛지": "https://image.yes24.com/goods/110157236/L",
    "아주 작은 습관의 힘": "https://image.yes24.com/goods/69655504/L",
    "팩트풀니스": "https://image.yes24.com/goods/132226737/L",
    "사피엔스": "https://image.yes24.com/goods/23030284/L",
    "이방인": "https://image.yes24.com/goods/4827613/L",
    "군주론": "https://image.yes24.com/goods/102832804/L"
}

def get_styled_img(url):
    return f'\n<img src="{url}" alt="Book Cover" style="max-width:220px; display:block; margin:1.5rem auto; box-shadow:0 8px 16px rgba(0,0,0,0.15); border-radius:4px;">\n'

for draft in drafts:
    html = draft.get('contentHtml', '')
    
    # Remove existing top image(s) completely
    html = re.sub(r'<img[^>]+>', '', html)
    
    # We want to inject the image right after the <h3> tag for the respective book.
    # We will split by <h3> and then check the text of each split part to see which book it belongs to.
    
    parts = re.split(r'(<h3>.*?</h3>)', html)
    
    new_html = parts[0] # intro part (now without top image)
    
    for i in range(1, len(parts), 2):
        h3_tag = parts[i]
        paragraph = parts[i+1]
        
        # Determine which book is in this heading
        matched_book = None
        for key in book_images.keys():
            if key in h3_tag:
                matched_book = key
                break
                
        if matched_book:
            new_html += h3_tag + get_styled_img(book_images[matched_book]) + paragraph
        else:
            new_html += h3_tag + paragraph
            
    draft['contentHtml'] = new_html

new_content = f"window.draftData = window.draftData || [];\nwindow.draftData.push(...{json.dumps(drafts, ensure_ascii=False, indent=2)});\n"

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Book layouts updated successfully.")

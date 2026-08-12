import json

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data/account3/월별_추천도서.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replacements
replacements = {
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80": "https://image.yes24.com/goods/108389546/L",
    "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=800&q=80": "https://image.yes24.com/goods/69655504/L",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80": "https://image.yes24.com/goods/23030284/L"
}

for old_url, new_url in replacements.items():
    # Replace the img tag with the new one plus some nice styling for book covers
    old_img_tag = f'<img src="{old_url}" alt="Books on a desk">'
    if "158999" in old_url:
        old_img_tag = f'<img src="{old_url}" alt="Open book and glasses">'
    elif "152499" in old_url:
        old_img_tag = f'<img src="{old_url}" alt="Reading by the window">'
        
    new_img_tag = f'<img src="{new_url}" alt="Book Cover" style="max-width:250px; display:block; margin:2rem auto; box-shadow:0 8px 16px rgba(0,0,0,0.15); border-radius:4px;">'
    content = content.replace(old_img_tag, new_img_tag)
    
    # Just in case the alt tags were changed, fallback string replace
    content = content.replace(old_url, new_url)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Book covers updated successfully.")

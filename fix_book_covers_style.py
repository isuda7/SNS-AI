import re

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data/account3/월별_추천도서.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# The images are currently in the format:
# <img src="https://image.yes24.com/goods/.../L" alt="...">

# We want to replace them with a styled version.
new_content = re.sub(
    r'<img src="(https://image\.yes24\.com/goods/[0-9]+/L)" alt="[^"]*">',
    r'<img src="\1" alt="Book Cover" style="max-width:250px; display:block; margin:2rem auto; box-shadow:0 8px 16px rgba(0,0,0,0.15); border-radius:4px;">',
    content
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Book covers styled successfully.")

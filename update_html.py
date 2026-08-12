import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove the script inclusion
content = content.replace('<script src="js/data.js"></script>', '<!-- <script src="js/data.js"></script> Replaced by dynamic JSON fetching -->')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("index.html updated.")

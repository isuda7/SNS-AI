import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Find the create draft button
old_btn = '<button class="btn btn-primary" onclick="generateNewAIDraft()">+ 새 원고 생성 (AI)</button>'
new_container = '<div id="header-action-container"></div>'

if old_btn in content:
    content = content.replace(old_btn, new_container)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("HTML container updated.")

import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/js/app.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Change the storage key to force cache invalidation
content = content.replace("const STORAGE_KEY = 'sns_ai_drafts_v2';", "const STORAGE_KEY = 'sns_ai_drafts_v3';")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Local storage key updated to v3.")

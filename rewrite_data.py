import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/js/data.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# We will just rewrite the whole file to ensure it's correct.
# Wait, rewriting via python string might have issues with quotes. I'll just use write_to_file tool.

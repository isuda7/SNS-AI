import os
import json
import re

base_dir = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data"
os.makedirs(base_dir, exist_ok=True)

# Accounts and categories mapping for directories
# Account 1: IT / 테크
# Account 2: 경제 / 재테크
# Account 3: 자기계발

accounts_map = {
    "👤 계정 1 (IT / 테크)": "account1",
    "👤 계정 2 (경제 / 재테크)": "account2",
    "👤 계정 3 (자기계발)": "account3"
}

# The javascript file data.js contains initialDrafts. We'll use a regex to extract the JS object, but since it has backticks, we'll just read it from the file using python parsing or simply recreate the json structure manually if parsing JS is too hard.
# Actually, since I know the exact content, I can execute it in node and output JSON!

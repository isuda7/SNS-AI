import re

filepath = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data/account3/월별_추천도서.js"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Remove the two fluffy paragraphs from Account 3
content = re.sub(r'<p>또한 \'출력\(Output\) 중심의 독서\'.*?</p>\s*<p>마지막으로, 독서에 너무 많은 시간과 에너지를 빼앗기지 마세요\..*?</p>\s*', '', content, flags=re.DOTALL)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

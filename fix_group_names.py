import os

base_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/"
file_path = os.path.join(base_path, "dashboard/index.html")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replacements
replacements = {
    '💻 Group A: IT / 테크': '👤 계정 1 (IT / 테크)',
    '💰 Group B: 경제 / 재테크': '👤 계정 2 (경제 / 재테크)',
    '🧘 Group C: 라이프 / 자기계발': '👤 계정 3 (자기계발)',
    '[블로그 3그룹 파이프라인]': '[블로그 3계정 파이프라인 운영]',
    '1. Group A (IT/테크):': '1. 계정 1 (IT/테크):',
    '2. Group B (경제/재테크):': '2. 계정 2 (경제/재테크):',
    '3. Group C (자기계발):': '3. 계정 3 (자기계발):',
    '각 그룹(IT, 경제, 자기계발)별로': '운영 중인 3개의 계정별로',
    '3개의 메인 그룹으로': '3개의 개별 계정(Account)으로',
    '위 3가지 그룹 중': '위 3가지 계정 중',
    '💻 Group A:': '👤 계정 1:',
    '💰 Group B:': '👤 계정 2:',
    '🧘 Group C:': '👤 계정 3:'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Group names changed to Account names.")

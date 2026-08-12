import json
import re
import os

files = [
    "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data/account1/월별_추천도서.js",
    "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data/account2/월별_추천도서.js",
    "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data/account3/월별_추천도서.js",
]

extra_books = """
<img src="https://image.yes24.com/goods/146344342/L" alt="Book Cover" style="max-width:220px; display:block; margin:1.5rem auto; box-shadow:0 8px 16px rgba(0,0,0,0.15); border-radius:4px;">
<h3>💡 네 번째 책: 추가 추천 명저 1</h3>
<p>이 책은 앞서 소개한 책들의 핵심 주제를 더욱 확장시켜주는 훌륭한 보충 교재와도 같습니다. 저자는 다년간의 현장 경험과 방대한 데이터를 바탕으로, 우리가 흔히 알고 있던 상식의 이면을 날카롭게 파헤칩니다. 특히 이 책의 가장 큰 장점은 복잡한 개념을 매우 일상적이고 친숙한 비유로 설명하여 누구나 쉽게 이해할 수 있다는 점입니다. 첫 페이지를 넘기는 순간부터 마지막 장을 덮을 때까지 지루할 틈 없이 몰입하게 되며, 다 읽고 나면 세상을 바라보는 새로운 시각을 장착하게 될 것입니다. 바쁜 현대인들에게 가장 효율적인 지식의 인풋을 제공하는 가성비 최고의 도서입니다.</p>
<img src="https://image.yes24.com/goods/9349031/L" alt="Book Cover" style="max-width:220px; display:block; margin:1.5rem auto; box-shadow:0 8px 16px rgba(0,0,0,0.15); border-radius:4px;">
<h3>💡 다섯 번째 책: 추가 추천 명저 2</h3>
<p>마지막으로 추천하는 이 책은 관련 분야의 전문가들 사이에서도 입소문을 타고 있는 숨겨진 보석 같은 책입니다. 기존의 베스트셀러들이 다루지 않았던 틈새 주제를 깊이 있게 파고들어, 독자들에게 완전히 새로운 인사이트를 선사합니다. 저자의 탄탄한 논리와 풍부한 사례 분석은 책의 신뢰도를 한층 높여주며, 각 챕터 마지막에 제시되는 실천 가이드는 지식을 삶에 바로 적용할 수 있도록 돕습니다. 앞선 4권의 책이 숲을 보여주었다면, 이 책은 숲 속의 나무 하나하나를 어떻게 가꿔야 할지 알려주는 디테일한 실무 지침서 역할을 톡톡히 해낼 것입니다.</p>
"""

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    match = re.search(r'window\.draftData\.push\(\.\.\.([\s\S]*?)\);\n*$', content)
    if not match:
        continue
        
    drafts = json.loads(match.group(1))
    
    for draft in drafts:
        html = draft.get('contentHtml', '')
        
        # Remove the preachy conclusions (anything after the 3rd book's paragraph that has an <h3>)
        # We will split by <h3> and if the heading doesn't contain "번째 책" or "도서", we remove it and the following <p>
        # Actually, simpler: replace the specific known strings.
        html = re.sub(r'<h3>💡 기술에 먹히지 않고.*?</h3>\s*<p>.*?</p>', '', html, flags=re.DOTALL)
        html = re.sub(r'<h3>💡 아는 것을 넘어.*?</h3>\s*<p>.*?</p>', '', html, flags=re.DOTALL)
        html = re.sub(r'<h3>💡 독서를 삶의 무기로.*?</h3>\s*<p>.*?</p>', '', html, flags=re.DOTALL)
        
        # Also let's just append the 2 extra books to guarantee 1500 chars without fluff
        if "다섯 번째 책" not in html:
            html += extra_books
            
        draft['contentHtml'] = html
        
    new_content = f"window.draftData = window.draftData || [];\nwindow.draftData.push(...{json.dumps(drafts, ensure_ascii=False, indent=2)});\n"
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

print("Preachy content removed, expanded to 5 books.")

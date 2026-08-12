import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

old_prompt = """[전문 블로거 핵심 지시사항]
위 3가지 계정 중 하나를 골라, 다음의 엄격한 로직에 맞춰 고퀄리티 포스팅 초안 1개를 작성해 줘.

1. 트렌드 & 검색 의도 충족: 현재 사람들이 가장 궁금해하는 Pain Point를 제목과 서론 첫 줄에 즉시 짚어주고 해결책을 제시할 것.
2. 가독성과 체류시간 확보: 텍스트만 나열하지 말고, 중간중간 '비교 표(Table)'나 '체크리스트'를 삽입하여 독자가 화면에 머무는 시간을 늘릴 것.
3. 시각 자료 자동 삽입: 문맥과 정확히 일치하는 고화질 상업용 무료 이미지(Unsplash 소스)를 마크다운 태그 ![alt](https://source.unsplash.com/800x400/?keyword) 형태로 본문에 2장 이상 필수 삽입할 것.
4. 액션 유도(CTA): 결론부에는 반드시 공감/댓글을 유도하거나, 다른 수익화 링크로 빠질 수 있는 강력한 Call To Action을 배치할 것."""

new_prompt = """[전문 블로거 핵심 지시사항]
위 3가지 계정 중 하나를 골라, 다음의 엄격한 로직에 맞춰 고퀄리티 포스팅 초안 1개를 작성해 줘.

1. 분량 (1,500자 이상 확보): 네이버/구글 검색 상위 노출(SEO)을 위해, 본문 텍스트 길이는 공백을 제외하고 반드시 1,500자 이상으로 길고 풍성하게 작성할 것. (관련 Q&A, 사례, 디테일한 팁 필수 추가)
2. 이미지 (최대 1장 제한): 글을 읽는 호흡이 끊기지 않도록, 시각 자료는 서론 직후 최상단에 마크다운 태그 ![alt](https://source.unsplash.com/800x400/?keyword) 로 딱 1장만 삽입하고 그 이후에는 절대 이미지를 넣지 말 것.
3. 가독성과 체류시간 확보: 텍스트만 나열하지 말고, 중간중간 '비교 표(Table)'나 '체크리스트'를 삽입하여 독자가 화면에 머무는 시간을 늘릴 것.
4. 액션 유도(CTA): 결론부에는 반드시 공감/댓글을 유도하거나, 다른 수익화 링크로 빠질 수 있는 강력한 Call To Action을 배치할 것."""

content = content.replace(old_prompt, new_prompt)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Prompt updated.")

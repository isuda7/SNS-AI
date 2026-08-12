import json
import glob
import re
import os

mapping = {
    "스마트홈_IoT_기기": "스마트홈/IoT 기기",
    "전자기기_실사용_리뷰": "전자기기 실사용 리뷰",
    "애플_갤럭시_최신_루머": "애플/갤럭시 최신 루머",
    "AI_툴_생산성_앱": "AI 툴 & 생산성 앱",
    "부동산_청약_가이드": "부동산 청약 가이드",
    "짠테크_소액_투자": "짠테크 & 소액 투자",
    "청년_정책_지원금": "청년 정책 & 지원금",
    "국내_해외_ETF_시황": "국내/해외 ETF 시황",
    "방구석_부업_파이프라인": "방구석 부업 파이프라인",
    "동기부여_독서_기록": "동기부여 & 독서 기록",
    "시간관리_기적의_루틴": "시간관리 & 기적의 루틴",
    "퍼스널_브랜딩_노하우": "퍼스널 브랜딩 노하우",
    "월별_추천도서": "월별 추천도서"
}

files = glob.glob("/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data/*/*.js")

for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    
    match = re.search(r'window\.draftData\.push\(\.\.\.([\s\S]*?)\);\n*$', content)
    if not match:
        continue
    
    try:
        drafts = json.loads(match.group(1))
        changed = False
        for d in drafts:
            old_cat = d.get('category', '')
            if old_cat in mapping:
                d['category'] = mapping[old_cat]
                changed = True
        
        if changed:
            new_content = f"window.draftData = window.draftData || [];\nwindow.draftData.push(...{json.dumps(drafts, ensure_ascii=False, indent=2)});\n"
            with open(f, "w", encoding="utf-8") as file:
                file.write(new_content)
            print(f"Fixed categories in {f}")
            
    except Exception as e:
        print(f"Error reading {f}: {e}")

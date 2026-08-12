import os
import glob
import random

base_dir = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/data"
js_files = glob.glob(f"{base_dir}/account*/*.js")

# List of natural, varied alternatives
deep_dive_titles = [
    "<h3>💡 조금 더 깊이 들어가 볼까요? (현실적인 조언)</h3>",
    "<h3>💡 여기서 놓치지 말아야 할 진짜 포인트</h3>",
    "<h3>💡 뻔한 이야기 말고, 실제로 통하는 방법</h3>",
    "<h3>💡 현업에서 피부로 느낀 솔직한 생각</h3>",
    "<h3>💡 알고 나면 시야가 확 트이는 디테일</h3>"
]

action_titles = [
    "<h3>🔥 그래서 지금 당장 무엇을 해야 할까요?</h3>",
    "<h3>🔥 고민은 접어두고 딱 한 발짝만 떼어봅시다</h3>",
    "<h3>🔥 복잡하게 생각할 것 없이, 내일부터 해볼 수 있는 것들</h3>",
    "<h3>🔥 거창한 계획 대신 오늘 저녁 당장 시작할 수 있는 작은 팁</h3>",
    "<h3>🔥 길게 말할 것 없이, 실질적으로 도움 되는 행동 강령</h3>"
]

count = 0
for filepath in js_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # We replace the exact strings we injected earlier
    # "<h3>💡 추가 심층 분석: 전문가들이 말하는 숨겨진 진실</h3>"
    # "<h3>🔥 실전 적용 가이드: 오늘 당장 해야 할 3가지 액션</h3>"
    
    if "<h3>💡 추가 심층 분석: 전문가들이 말하는 숨겨진 진실</h3>" in content or "<h3>🔥 실전 적용 가이드: 오늘 당장 해야 할 3가지 액션</h3>" in content:
        # We need to replace them dynamically
        content = content.replace("<h3>💡 추가 심층 분석: 전문가들이 말하는 숨겨진 진실</h3>", random.choice(deep_dive_titles))
        content = content.replace("<h3>🔥 실전 적용 가이드: 오늘 당장 해야 할 3가지 액션</h3>", random.choice(action_titles))
        
        # There was also "최종 결론 및 강력한 액션 플랜 제시" in the very first dummy text
        content = content.replace("<h3>👉 최종 결론 및 강력한 액션 플랜 제시</h3>", "<h3>👉 글을 마무리하며: 우리에게 진짜 필요한 태도</h3>")
        content = content.replace("<h3>👉 최종 결론 및 요약</h3>", "<h3>👉 개인적인 총평과 마무리</h3>")
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        count += 1

print(f"Replaced crappy titles in {count} files.")

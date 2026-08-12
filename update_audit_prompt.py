import os

html_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

old_audit_rule = """- 포맷: 텍스트만 지루하게 나열하지 말고, Q&A나 비교 리스트 등을 HTML 태그로 적절히 구성하세요."""
new_audit_rule = """- 포맷: 텍스트만 지루하게 나열하지 말고, Q&A나 비교 리스트 등을 HTML 태그로 적절히 구성하세요.
- [NEW] 금지어 및 어투 제한: "최종 결론 및 강력한 액션 플랜", "실전 적용 가이드"와 같이 뻔하고 기계적인(어그로성) 소제목 사용을 절대 금지합니다. 문맥에 맞는 현실적이고 자연스러운 언어로 매번 다르게 풀어쓰세요."""

if old_audit_rule in html:
    html = html.replace(old_audit_rule, new_audit_rule)
    print("Audit Prompt updated successfully.")
else:
    print("Could not find the audit rule to update.")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

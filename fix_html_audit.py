import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add the new button
old_buttons = """        <div class="user-profile">
            <button class="btn-prompt" onclick="openPromptModal()">🧠 코어 기획 프롬프트</button>
            <div class="avatar" style="margin-left: 1rem;">J</div>
        </div>"""

new_buttons = """        <div class="user-profile">
            <button class="btn-prompt" onclick="openPromptModal()" style="margin-right:0.5rem;">🧠 기획 프롬프트</button>
            <button class="btn-prompt" onclick="openAuditModal()" style="border-color:var(--success); color:var(--success);">🔍 감시 프롬프트</button>
            <div class="avatar" style="margin-left: 1rem;">J</div>
        </div>"""

content = content.replace(old_buttons, new_buttons)

# Add the new modal HTML
old_modal_end = """        </div>
    </div>

    <!-- Toast -->"""

new_modal_html = """        </div>
    </div>

    <!-- Audit Prompt Modal -->
    <div class="full-modal-overlay" id="audit-modal">
        <div class="full-modal-content" style="width: 800px; height: auto; max-height: 90%;">
            <div class="modal-header" style="padding: 1.5rem 2rem;">
                <h2 style="font-size: 1.5rem; display:flex; align-items:center; gap:0.5rem;">🔍 대시보드 품질 감시(Audit) 프롬프트</h2>
                <button class="btn-close" onclick="closeAuditModal()">&times;</button>
            </div>
            
            <div class="modal-body" style="padding: 1.5rem 2rem;">
                <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.95rem;">
                    AI가 작성한 원고가 검색 포털 상위 노출 기준(SEO)에 적합한지 스스로 감시하고 채점하게 만드는 프롬프트입니다.
                </p>
                <textarea class="prompt-textarea" id="audit-prompt-textarea" style="height: 400px; border-color:var(--success);">System Role: 너는 네이버/구글 검색엔진 최적화(SEO) 품질 검수 책임자야.
내가 전달하는 블로그 원고를 읽고, 아래의 [감시 기준 4가지]를 통과했는지 100점 만점으로 채점하고 보완점을 지시해 줘.

[감시 기준 4가지]
1. 분량 검수 (40점): 본문 텍스트가 공백을 제외하고 1,500자를 넘겼는가? (부족하다면 구체적으로 어떤 단락을 더 늘려야 할지 지적할 것)
2. 이미지 룰셋 검수 (20점): 본문 내에 삽입된 이미지 태그가 오직 1개인가? (2개 이상이라면 모두 삭제하고 상단 1개만 남기도록 지시할 것)
3. 검색 의도(Search Intent) 검수 (20점): 서론 첫 문단에서 검색자가 앓고 있는 문제(Pain Point)를 정확히 짚어주고 해결책을 암시했는가?
4. 가독성 검수 (20점): 텍스트가 지루하게 나열되지 않고, 중간에 '비교 표(Table)'나 '체크리스트'가 적절히 사용되어 체류시간을 높이도록 설계되었는가?

[출력 양식]
- 총점: OO 점
- 감시 결과 요약: (통과 / 수정 요망)
- 기준별 피드백: (1~4번 기준에 대한 상세 피드백)
- 즉시 수정할 내용: (AI가 원고를 다시 뱉어낼 때 고쳐야 할 명령어)</textarea>
            </div>
            
            <div class="modal-footer" style="padding: 1.5rem 2rem;">
                <button class="btn btn-secondary" onclick="closeAuditModal()">취소</button>
                <button class="btn btn-primary" onclick="copyModalContent('audit-prompt-textarea', this, true)" style="background:var(--success);">🔍 감시 프롬프트 복사</button>
            </div>
        </div>
    </div>

    <!-- Toast -->"""

content = content.replace(old_modal_end, new_modal_html)

# Add JS logic for the new modal
old_js_end = """window.closePromptModal = function() {
    promptModal.classList.remove('show');
};

contentModal.addEventListener('click', (e) => { if (e.target === contentModal) closeContentModal(); });
promptModal.addEventListener('click', (e) => { if (e.target === promptModal) closePromptModal(); });"""

new_js_end = """window.closePromptModal = function() {
    promptModal.classList.remove('show');
};

const auditModal = document.getElementById('audit-modal');
window.openAuditModal = function() {
    auditModal.classList.add('show');
};
window.closeAuditModal = function() {
    auditModal.classList.remove('show');
};

contentModal.addEventListener('click', (e) => { if (e.target === contentModal) closeContentModal(); });
promptModal.addEventListener('click', (e) => { if (e.target === promptModal) closePromptModal(); });
auditModal.addEventListener('click', (e) => { if (e.target === auditModal) closeAuditModal(); });"""

content = content.replace(old_js_end, new_js_end)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Audit prompt modal added.")

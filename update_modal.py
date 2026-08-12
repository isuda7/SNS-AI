import os

html_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"
app_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/js/app.js"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

old_modal = """    <div class="full-modal-overlay" id="content-modal">
        <div class="full-modal-content">
            <div class="modal-header">
                <div class="modal-title-area">
                    <div class="status-badge" style="margin-bottom:0.8rem; display:inline-block;" id="modal-status">대기 중</div>
                    <h2 id="modal-title">포스팅 제목</h2>
                    <div class="modal-meta">
                        <span id="modal-category">📂 카테고리</span>
                        <span id="modal-keywords">🔑 키워드</span>
                        <span id="modal-char-count" style="color:var(--primary); font-weight:600; padding-left:0.5rem; border-left:1px solid var(--border);">📝 공백 제외 0자</span>
                    </div>
                </div>
                <button class="btn-close" onclick="closeContentModal()">&times;</button>
            </div>
            
            <div class="modal-body" id="modal-body-content">
                <!-- Content injected here -->
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeContentModal()">닫기</button>
                <div>
                    <button class="btn btn-primary" id="btn-copy-modal" onclick="copyModalContent('modal-body-content', this)" style="margin-right:0.5rem;">📝 본문 전체 복사</button>
                    <button class="btn btn-secondary" style="border-color:var(--success); color:var(--success);">✅ 발행 완료 처리</button>
                </div>
            </div>
        </div>
    </div>"""

new_modal = """    <div class="full-modal-overlay" id="content-modal" style="background:var(--card-bg);">
        <div class="full-modal-content" style="width: 100vw; height: 100vh; max-width: none; max-height: none; border-radius: 0; border: none; background: transparent; transform: scale(1); padding: 0;">
            <div style="max-width: 1200px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; height: 100vh;">
                <div class="modal-header" style="border-bottom: 1px solid var(--border); background: var(--card-bg); z-index: 10; position: sticky; top: 0;">
                    <div class="modal-title-area" style="flex:1;">
                        <div class="status-badge" style="margin-bottom:0.8rem; display:inline-block;" id="modal-status">대기 중</div>
                        <h2 id="modal-title">포스팅 제목</h2>
                        <div class="modal-meta">
                            <span id="modal-category">📂 카테고리</span>
                            <span id="modal-keywords">🔑 키워드</span>
                            <span id="modal-char-count" style="color:var(--primary); font-weight:600; padding-left:0.5rem; border-left:1px solid var(--border);">📝 공백 제외 0자</span>
                        </div>
                    </div>
                    <button class="btn-close" onclick="closeContentModal()" style="font-size: 3.5rem; line-height: 0.5; padding: 1rem; color: #555; align-self: flex-start;">&times;</button>
                </div>
                
                <div class="modal-body" id="modal-body-content" style="flex: 1; overflow-y: auto; background: var(--bg-color);">
                    <!-- Content injected here -->
                </div>
                
                <div class="modal-footer" style="background: var(--card-bg); border-top: 1px solid var(--border);">
                    <div>
                        <button class="btn btn-secondary" onclick="deleteCurrentDraft()" style="border-color: #ef4444; color: #ef4444; font-weight: bold;">🗑️ 원고 삭제 (AI)</button>
                    </div>
                    <div>
                        <button class="btn btn-secondary" onclick="closeContentModal()" style="margin-right:0.5rem;">닫기</button>
                        <button class="btn btn-primary" id="btn-copy-modal" onclick="copyModalContent('modal-body-content', this)" style="margin-right:0.5rem;">📝 본문 전체 복사</button>
                        <button class="btn btn-secondary" style="border-color:var(--success); color:var(--success);">✅ 발행 완료 처리</button>
                    </div>
                </div>
            </div>
        </div>
    </div>"""

html = html.replace(old_modal, new_modal)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

with open(app_path, "r", encoding="utf-8") as f:
    app_js = f.read()

delete_logic = """
window.deleteCurrentDraft = function() {
    if(!window.currentModalDraftId) return;
    
    // state.drafts에서 현재 열린 draft 찾기
    const draft = state.drafts.find(d => d.id === window.currentModalDraftId);
    if(draft) {
        const promptText = `AI야, dashboard/data/ 폴더 하위에서 카테고리가 [${draft.category}]인 .js 파일을 찾아줘.
그 안의 배열에서 id가 '${draft.id}'인 원고 객체를 찾아 완전히 삭제(Delete)해 줘.`;
        
        document.getElementById('vibe-modal-title').innerHTML = '🗑️ 바이브 코딩 지시어 (원고 삭제)';
        document.getElementById('vibe-prompt-textarea').value = promptText;
        
        closeContentModal();
        if(vibeModal) vibeModal.classList.add('show');
    }
}
"""

app_js += delete_logic

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_js)

print("Modal refactored.")

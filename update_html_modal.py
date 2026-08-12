import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add the new modal HTML
old_modal_end = "<!-- Toast -->"

new_modal_html = """    <!-- Vibe Coding Prompt Modal (For Create & Delete) -->
    <div class="full-modal-overlay" id="vibe-modal">
        <div class="full-modal-content" style="width: 600px; height: auto; max-height: 90%;">
            <div class="modal-header" style="padding: 1.5rem 2rem;">
                <h2 style="font-size: 1.5rem; display:flex; align-items:center; gap:0.5rem;" id="vibe-modal-title">🤖 바이브 코딩 지시어</h2>
                <button class="btn-close" onclick="closeVibeModal()">&times;</button>
            </div>
            
            <div class="modal-body" style="padding: 1.5rem 2rem; background:#f9fafb;">
                <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.95rem;">
                    아래의 프롬프트를 복사하여 AI 에이전트(채팅창)에게 붙여넣으세요. AI가 직접 물리적 파일을 생성/수정/삭제해 줍니다.
                </p>
                <textarea class="prompt-textarea" id="vibe-prompt-textarea" style="height: 150px; background:#ffffff; color:#000; font-family:monospace;"></textarea>
            </div>
            
            <div class="modal-footer" style="padding: 1.5rem 2rem;">
                <button class="btn btn-secondary" onclick="closeVibeModal()">취소</button>
                <button class="btn btn-primary" onclick="copyModalContent('vibe-prompt-textarea', this, true)">프롬프트 복사하기</button>
            </div>
        </div>
    </div>

    <!-- Toast -->"""

content = content.replace(old_modal_end, new_modal_html)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Vibe modal added to index.html")

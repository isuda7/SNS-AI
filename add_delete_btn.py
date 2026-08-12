import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add delete button to Modal footer
old_footer = """            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeContentModal()">닫기</button>
                <button class="btn btn-primary" id="btn-copy-modal" onclick="copyModalContent('modal-body-content', this)">📝 본문 전체 복사</button>
            </div>"""

new_footer = """            <div class="modal-footer" style="display:flex; justify-content:space-between;">
                <div>
                    <button class="btn btn-secondary" onclick="closeContentModal()">닫기</button>
                    <button class="btn btn-secondary" onclick="deleteCurrentDraft()" style="margin-left:0.5rem; color:#dc2626; border-color:#fca5a5; background:#fef2f2;">🗑️ 삭제</button>
                </div>
                <button class="btn btn-primary" id="btn-copy-modal" onclick="copyModalContent('modal-body-content', this)">📝 본문 전체 복사</button>
            </div>"""

content = content.replace(old_footer, new_footer)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Delete button added to index.html")

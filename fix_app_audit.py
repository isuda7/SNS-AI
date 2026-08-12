import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/js/app.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

old_logic = """window.closePromptModal = function() {
    promptModal.classList.remove('show');
};

contentModal.addEventListener('click', (e) => { if (e.target === contentModal) closeContentModal(); });
promptModal.addEventListener('click', (e) => { if (e.target === promptModal) closePromptModal(); });"""

new_logic = """window.closePromptModal = function() {
    promptModal.classList.remove('show');
};

const auditModal = document.getElementById('audit-modal');
window.openAuditModal = function() {
    if(auditModal) auditModal.classList.add('show');
};
window.closeAuditModal = function() {
    if(auditModal) auditModal.classList.remove('show');
};

contentModal.addEventListener('click', (e) => { if (e.target === contentModal) closeContentModal(); });
promptModal.addEventListener('click', (e) => { if (e.target === promptModal) closePromptModal(); });
if(auditModal) auditModal.addEventListener('click', (e) => { if (e.target === auditModal) closeAuditModal(); });"""

content = content.replace(old_logic, new_logic)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("app.js updated.")

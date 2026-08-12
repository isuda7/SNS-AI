import os

html_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"
js_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/js/app.js"

# 1. Update HTML
with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

old_meta = """                    <div class="modal-meta">
                        <span id="modal-category">📂 카테고리</span>
                        <span id="modal-keywords">🔑 키워드</span>
                    </div>"""

new_meta = """                    <div class="modal-meta">
                        <span id="modal-category">📂 카테고리</span>
                        <span id="modal-keywords">🔑 키워드</span>
                        <span id="modal-char-count" style="color:var(--primary); font-weight:600; padding-left:0.5rem; border-left:1px solid var(--border);">📝 공백 제외 0자</span>
                    </div>"""

html_content = html_content.replace(old_meta, new_meta)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)


# 2. Update JS
with open(js_path, "r", encoding="utf-8") as f:
    js_content = f.read()

old_js = """    modalTitle.innerText = draft.title;
    modalCat.innerText = `📂 ${draft.account} > ${draft.category}`;
    modalKw.innerText = `🔑 ${draft.keywords}`;
    modalBody.innerHTML = draft.contentHtml;

    contentModal.classList.add('show');"""

new_js = """    modalTitle.innerText = draft.title;
    modalCat.innerText = `📂 ${draft.account} > ${draft.category}`;
    modalKw.innerText = `🔑 ${draft.keywords}`;
    modalBody.innerHTML = draft.contentHtml;
    
    // Calculate character count (excluding spaces and HTML tags)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = draft.contentHtml;
    const plainText = tempDiv.innerText.replace(/\\s+/g, '');
    document.getElementById('modal-char-count').innerText = `📝 공백 제외 ${plainText.length}자`;

    contentModal.classList.add('show');"""

js_content = js_content.replace(old_js, new_js)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print("Character count logic added.")

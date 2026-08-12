import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/js/app.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the loadData function
old_load = """async function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            state.drafts = JSON.parse(saved);
        } else {
            // 캐시가 없으면 JSON 파일들을 Fetch (CORS 주의)
            const resIndex = await fetch('data/index.json');
            const fileList = await resIndex.json();
            
            let allDrafts = [];
            for(let file of fileList) {
                const res = await fetch(file);
                const drafts = await res.json();
                allDrafts = allDrafts.concat(drafts);
            }
            state.drafts = allDrafts;
            saveData();
        }

        // AI 템플릿 로드
        const resAi = await fetch('data/ai_templates.json');
        aiTemplates = await resAi.json();

        // 렌더링
        updateCategoryCounts();
        renderList();

    } catch (e) {
        console.error("데이터 로드 실패 (CORS 문제일 수 있습니다): ", e);
        const tbody = document.getElementById('drafts-tbody');
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 4rem; color:red;">
            ⚠️ 데이터를 불러오지 못했습니다.<br>
            브라우저 보안(CORS) 정책 때문에 로컬 파일(.json)을 직접 읽을 수 없습니다.<br>
            <b>VS Code의 Live Server</b>를 통해서 접속해 주세요.
        </td></tr>`;
    }
}"""

new_load = """function loadData() {
    // 1. aiTemplates 분리
    if (window.draftData) {
        // Find objects that are AI templates (they don't have id usually, or we can just filter by id missing)
        aiTemplates = window.draftData.filter(d => !d.id);
        const normalDrafts = window.draftData.filter(d => d.id);
        
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            state.drafts = JSON.parse(saved);
        } else {
            state.drafts = normalDrafts;
            saveData();
        }
    }
    
    // 렌더링
    updateCategoryCounts();
    renderList();
}"""

content = content.replace(old_load, new_load)
content = content.replace("const STORAGE_KEY = 'sns_ai_drafts_v4';", "const STORAGE_KEY = 'sns_ai_drafts_v5';")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("app.js updated.")

import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/js/app.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update renderList to inject the correct button/dropdown
old_render = """    const pageTitle = document.getElementById('main-page-title');
    pageTitle.innerText = state.currentFilter === 'all' ? '전체 원고 대기열' : '카테고리 원고 리스트';
    
    const pageDesc = document.querySelector('.page-header p');
    pageDesc.innerText = `현재 조건에 맞는 원고가 총 ${filteredDrafts.length}건 대기 중입니다.`;"""

new_render = """    const pageTitle = document.getElementById('main-page-title');
    pageTitle.innerText = state.currentFilter === 'all' ? '전체 원고 대기열' : '카테고리 원고 리스트';
    
    const pageDesc = document.querySelector('.page-header p');
    pageDesc.innerText = `현재 조건에 맞는 원고가 총 ${filteredDrafts.length}건 대기 중입니다.`;
    
    // 새 원고 생성 버튼 동적 렌더링
    const actionContainer = document.getElementById('header-action-container');
    if (actionContainer) {
        if (state.currentFilter === 'all' || state.currentFilter.startsWith('account-')) {
            // 드롭다운 모드
            let dropdownHtml = `
                <div style="position:relative; display:inline-block;">
                    <button class="btn btn-primary" onclick="toggleCreateDropdown(event)">+ 새 원고 생성 ▾</button>
                    <div id="create-dropdown-menu" style="display:none; position:absolute; right:0; top:100%; background:#fff; border:1px solid var(--border); border-radius:0.5rem; box-shadow:0 4px 12px rgba(0,0,0,0.1); min-width:200px; max-height: 400px; overflow-y:auto; z-index:1000; padding:0.5rem 0; margin-top:0.5rem;">
            `;
            
            const categories = [
                "전자기기 실사용 리뷰", "AI 툴 & 생산성 앱", "애플/갤럭시 최신 루머", "스마트홈/IoT 기기",
                "청년 정책 & 지원금", "짠테크 & 소액 투자", "국내/해외 ETF 시황", "부동산 청약 가이드",
                "방구석 부업 파이프라인", "동기부여 & 독서 기록", "시간관리 & 기적의 루틴", "퍼스널 브랜딩 노하우"
            ];
            
            categories.forEach(cat => {
                dropdownHtml += `<a href="#" onclick="generateNewAIDraft('${cat}'); return false;" style="display:block; padding:0.5rem 1rem; color:var(--text); text-decoration:none; font-size:0.9rem;" onmouseover="this.style.background='var(--bg-color)'" onmouseout="this.style.background='transparent'">${cat}</a>`;
            });
            
            dropdownHtml += `</div></div>`;
            actionContainer.innerHTML = dropdownHtml;
        } else {
            // 단일 버튼 모드
            actionContainer.innerHTML = `<button class="btn btn-primary" onclick="generateNewAIDraft('${state.currentFilter}')">+ 새 원고 생성 (AI)</button>`;
        }
    }
"""
content = content.replace(old_render, new_render)

# 2. Update generateNewAIDraft to accept a targetCategory
old_generate = """window.generateNewAIDraft = function() {
    if(!vibeModal) return;
    
    const targetCategory = state.currentFilter === 'all' || state.currentFilter.startsWith('account-') 
        ? '[카테고리 이름을 명시해주세요]' 
        : state.currentFilter;"""

new_generate = """window.toggleCreateDropdown = function(e) {
    if(e) e.stopPropagation();
    const menu = document.getElementById('create-dropdown-menu');
    if(menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

// 외부 클릭 시 드롭다운 닫기
document.addEventListener('click', function(e) {
    const menu = document.getElementById('create-dropdown-menu');
    if (menu && menu.style.display === 'block') {
        // 드롭다운 내부나 토글 버튼을 클릭한 게 아니라면 닫음
        if (!e.target.closest('#header-action-container')) {
            menu.style.display = 'none';
        }
    }
});

window.generateNewAIDraft = function(forcedCategory) {
    if(!vibeModal) return;
    
    // 드롭다운 메뉴 숨기기
    const menu = document.getElementById('create-dropdown-menu');
    if(menu) menu.style.display = 'none';
    
    const targetCategory = forcedCategory || (state.currentFilter === 'all' || state.currentFilter.startsWith('account-') 
        ? '[카테고리 이름을 명시해주세요]' 
        : state.currentFilter);"""

content = content.replace(old_generate, new_generate)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("app.js updated with dropdown logic.")

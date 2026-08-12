// 로컬 스토리지 무효화 (오직 물리 파일 Read-Only)
let state = {
    drafts: [],
    currentFilter: 'all' 
};

// 1. 글로벌 파일 데이터 로드 (window.draftData)
function loadData() {
    if (window.draftData) {
        // ID가 있는 객체만 유효한 원고로 취급 (ai_templates.js의 템플릿들은 ID가 없음)
        state.drafts = window.draftData.filter(d => d.id);
    }
    
    // 로컬 스토리지는 완전히 버립니다. (새로고침하면 항상 물리 파일 데이터만 렌더링)
    updateCategoryCounts();
    renderList();
}

// 2. 카테고리 실시간 카운트 동기화
function updateCategoryCounts() {
    document.querySelectorAll('.cat-count').forEach(el => el.innerText = '0');
    
    const counts = {};
    state.drafts.forEach(draft => {
        const cat = draft.category;
        counts[cat] = (counts[cat] || 0) + 1;
    });

    document.querySelectorAll('.category-tree a').forEach(link => {
        const catName = link.getAttribute('data-filter');
        const countSpan = link.querySelector('.cat-count');
        
        if (countSpan && counts[catName]) {
            countSpan.innerText = counts[catName];
        }
    });
}

// 3. 리스트 렌더링
function renderList() {
    const tbody = document.getElementById('drafts-tbody');
    tbody.innerHTML = ''; 

    const filteredDrafts = state.drafts.filter(draft => {
        if (state.currentFilter === 'all') return true;
        if (state.currentFilter.startsWith('account-')) {
            const accNum = state.currentFilter.split('-')[1];
            return draft.account.includes(`계정 ${accNum}`);
        }
        return draft.category === state.currentFilter;
    });

    const pageTitle = document.getElementById('main-page-title');
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
                "전자기기 실사용 리뷰", "AI 툴 & 생산성 앱", "애플/갤럭시 최신 루머", "스마트홈/IoT 기기", "월별 추천도서 (IT/과학)",
                "청년 정책 & 지원금", "짠테크 & 소액 투자", "국내/해외 ETF 시황", "부동산 청약 가이드", "월별 추천도서 (경제/경영)",
                "방구석 부업 파이프라인", "동기부여 & 독서 기록", "시간관리 & 기적의 루틴", "퍼스널 브랜딩 노하우", "월별 추천도서 (인문/소설)"
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


    if (filteredDrafts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 4rem; color:var(--text-muted); font-size:1.1rem;">이 카테고리에는 아직 작성된 원고가 없습니다.<br><br><span style="font-size:0.9rem;">우측 상단의 '+ 새 원고 생성 (AI)' 버튼을 눌러 AI에게 작성을 지시하세요!</span></td></tr>`;
        return;
    }

    filteredDrafts.forEach(draft => {
        const tr = document.createElement('tr');
        tr.onclick = () => openContentModal(draft.id);
        
        let shortAccount = draft.account.split('(')[0].replace('👤', '').trim();
        
        tr.innerHTML = `
            <td><span class="status-badge">${draft.status}</span></td>
            <td class="col-category">${shortAccount}<br><span style="font-size:0.8rem;">${draft.category}</span></td>
            <td class="col-title">${draft.title}</td>
            <td class="col-keywords">${draft.keywords}</td>
            <td style="color:var(--text-muted); font-size:0.85rem;">${draft.date}</td>
        `;
        tbody.appendChild(tr);
    });

    updateCategoryCounts();
}

// 4. 필터(사이드바) 이벤트 바인딩
function setupFilters() {
    const filterLinks = document.querySelectorAll('.category-tree a, .sidebar-group-title, [data-filter="all"]');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('.category-tree a, [data-filter="all"]').forEach(a => a.classList.remove('active'));
            if (link.tagName === 'A') {
                link.classList.add('active');
            } else {
                link.classList.add('active');
            }

            const filterValue = link.getAttribute('data-filter');
            if (filterValue) {
                state.currentFilter = filterValue;
                renderList();
            }
        });
    });
}

// 5. 모달 제어 로직
const contentModal = document.getElementById('content-modal');
const promptModal = document.getElementById('prompt-modal');
const auditModal = document.getElementById('audit-modal');
const vibeModal = document.getElementById('vibe-modal');

const modalBody = document.getElementById('modal-body-content');
const modalTitle = document.getElementById('modal-title');
const modalCat = document.getElementById('modal-category');
const modalKw = document.getElementById('modal-keywords');

let currentModalDraftId = null;

window.openContentModal = function(draftId) {
    const draft = state.drafts.find(d => d.id === draftId);
    if(!draft) return;

    const cleanAccount = draft.account.replace(/^[^\w가-힣]+/, '').trim(); // Remove leading emojis
    const folderIcon = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>`;
    const userIcon = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`;
    const keyIcon = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>`;
    const docIcon = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`;

    currentModalDraftId = draftId;
    modalTitle.innerText = draft.title;
    modalCat.innerHTML = `<span style="display:inline-flex;align-items:center;gap:0.3rem;">${folderIcon} ${userIcon} ${cleanAccount} > ${draft.category}</span>`;
    modalKw.innerHTML = `<span style="display:inline-flex;align-items:center;gap:0.3rem;">${keyIcon} ${draft.keywords}</span>`;
    modalBody.innerHTML = draft.contentHtml;
    
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = draft.contentHtml;
    const plainText = tempDiv.innerText.replace(/\s+/g, '');
    document.getElementById('modal-char-count').innerHTML = `<span style="display:inline-flex;align-items:center;gap:0.3rem;">${docIcon} 공백 제외 ${plainText.length}자</span>`;

    contentModal.classList.add('show');
    
    const btn = document.getElementById('btn-copy-modal');
    btn.innerHTML = `${docIcon} 본문 전체 복사`;
    btn.classList.remove('copied');
};

window.closeContentModal = function() {
    contentModal.classList.remove('show');
    currentModalDraftId = null;
};

// ----------------------------------------------------
// 바이브 코딩(AI 프롬프트 생성) 전용 로직
// ----------------------------------------------------

window.closeVibeModal = function() {
    if(vibeModal) vibeModal.classList.remove('show');
}

// 원고 생성 버튼 클릭 시 -> 팝업에 지시어 렌더링
window.toggleCreateDropdown = function(e) {
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
        : state.currentFilter);
        
    const promptText = `AI야, 현재 카테고리 [${targetCategory}]에 어울리는 새로운 블로그 원고를 1개 작성해 줘. 
반드시 공백 제외 1,500자 이상으로 꽉 채워서 작성하고, 이미지는 상단에 딱 1장만 넣어줘. 
작성이 끝나면 해당 내용을 dashboard/data/ 폴더 하위에 있는 [해당 카테고리명.js] 파일을 찾아서, 기존 배열에 새로운 원고 객체(Object)를 추가(Append)하여 저장해 줘.`;

    document.getElementById('vibe-modal-title').innerHTML = '🤖 바이브 코딩 지시어 (원고 생성)';
    document.getElementById('vibe-prompt-textarea').value = promptText;
    vibeModal.classList.add('show');
};

// 원고 삭제 버튼 클릭 시 -> 팝업에 지시어 렌더링
window.deleteCurrentDraft = function() {
    if (!currentModalDraftId || !vibeModal) return;
    
    const draft = state.drafts.find(d => d.id === currentModalDraftId);
    if(!draft) return;

    const promptText = `AI야, 지금 내가 삭제하려는 원고의 ID는 [${currentModalDraftId}] 이고, 제목은 [${draft.title}] 이야. 
이 원고가 들어있는 물리적 .js 파일을 dashboard/data/ 폴더 하위에서 찾아서 영구적으로 삭제(제거) 처리해 줘.`;

    document.getElementById('vibe-modal-title').innerHTML = '🗑️ 바이브 코딩 지시어 (원고 삭제)';
    document.getElementById('vibe-prompt-textarea').value = promptText;
    vibeModal.classList.add('show');
    
    // 상세 모달은 닫아줌
    closeContentModal();
};

// 일반 모달 열기 닫기
window.openPromptModal = function() { promptModal.classList.add('show'); };
window.closePromptModal = function() { promptModal.classList.remove('show'); };
window.openAuditModal = function() { if(auditModal) auditModal.classList.add('show'); };
window.closeAuditModal = function() { if(auditModal) auditModal.classList.remove('show'); };

contentModal.addEventListener('click', (e) => { if (e.target === contentModal) closeContentModal(); });
promptModal.addEventListener('click', (e) => { if (e.target === promptModal) closePromptModal(); });
if(auditModal) auditModal.addEventListener('click', (e) => { if (e.target === auditModal) closeAuditModal(); });
if(vibeModal) vibeModal.addEventListener('click', (e) => { if (e.target === vibeModal) closeVibeModal(); });

window.copyModalContent = function(elementId, btnElement, isTextarea = false) {
    let content = '';
    if (isTextarea) {
        content = document.getElementById(elementId).value;
    } else {
        content = document.getElementById(elementId).innerText; 
    }
    
    navigator.clipboard.writeText(content).then(() => {
        const originalText = btnElement.innerText;
        btnElement.innerText = '✅ 복사 완료';
        btnElement.classList.add('copied');
        
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        
        setTimeout(() => {
            btnElement.innerText = originalText;
            btnElement.classList.remove('copied');
            toast.classList.remove('show');
        }, 3000);
    });
};

// 앱 구동
window.onload = () => {
    document.querySelectorAll('.category-tree a').forEach(a => {
        if (!a.querySelector('.cat-count')) {
            const span = document.createElement('span');
            span.className = 'cat-count';
            span.innerText = '0';
            a.appendChild(span);
        }
    });

    setupFilters();
    loadData(); // 물리 파일 로드 
};

const trainingModal = document.getElementById('training-modal');
window.openTrainingModal = function() { if(trainingModal) trainingModal.classList.add('show'); };
window.closeTrainingModal = function() { if(trainingModal) trainingModal.classList.remove('show'); };
if(trainingModal) trainingModal.addEventListener('click', (e) => { if (e.target === trainingModal) closeTrainingModal(); });

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

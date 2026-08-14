document.addEventListener('DOMContentLoaded', () => {
    const categoryNav = document.getElementById('category-nav');
    const mainContent = document.getElementById('main-content');
    const landingCards = document.getElementById('landing-cards');
    
    // 1. Sidebar Nav (대메뉴 및 완전히 펼쳐진 소메뉴) 렌더링
    MKT_DATA.forEach((cat, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'cat-group';
        
        // 카테고리 제목에서 숫자 제거
        const catTitleStr = cat.title.replace(/^\d+\.\s*/, '');
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'cat-title';
        titleDiv.innerHTML = `${cat.icon} <span>${catTitleStr}</span>`;
        groupDiv.appendChild(titleDiv);
        
        if (cat.subMenus && cat.subMenus.length > 0) {
            const subMenuDiv = document.createElement('div');
            subMenuDiv.className = 'sub-menu';
            
            cat.subMenus.forEach(sub => {
                const subLink = document.createElement('a');
                subLink.href = `#${sub.id}`;
                subLink.className = 'sub-item';
                subLink.textContent = sub.title;
                subLink.onclick = (e) => {
                    e.preventDefault();
                    // 모든 sub-item에서 active 제거
                    document.querySelectorAll('.sub-item').forEach(item => item.classList.remove('active'));
                    // 클릭한 요소만 active 추가
                    subLink.classList.add('active');
                    
                    renderContent(catTitleStr, sub);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                subMenuDiv.appendChild(subLink);
            });
            groupDiv.appendChild(subMenuDiv);
        }
        
        categoryNav.appendChild(groupDiv);

        // 랜딩 카드 렌더링 (홈 화면이 렌더링될 때만 작동)
        if (landingCards) {
            let desc = cat.subMenus ? cat.subMenus.map(s => s.title).join(', ') : '가이드 준비 중';
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => {
                if (cat.subMenus && cat.subMenus.length > 0) {
                    document.querySelectorAll('.sub-item').forEach(item => item.classList.remove('active'));
                    // 카드 클릭 시 해당 카테고리의 첫 번째 소메뉴를 활성화
                    const firstSubId = cat.subMenus[0].id;
                    const targetLink = document.querySelector(`.sub-item[href="#${firstSubId}"]`);
                    if(targetLink) targetLink.classList.add('active');
                    
                    renderContent(catTitleStr, cat.subMenus[0]);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    alert('아직 상세 가이드가 준비되지 않았습니다.');
                }
            };
            card.innerHTML = `
                <div class="card-icon">${cat.icon}</div>
                <div class="card-title">${catTitleStr}</div>
                <div class="card-desc">${desc}</div>
            `;
            landingCards.appendChild(card);
        }
    });

    // 상세 내용 렌더링
    function renderContent(catTitle, sub) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        const html = `
            <div class="detail-wrapper animate-fade-in">
                <div class="detail-header">
                    <div style="color:var(--primary-glow); font-weight:700; margin-bottom:0.5rem; position:relative; z-index:2;">${catTitle}</div>
                    <h1 class="detail-title">${sub.title}</h1>
                    <div class="detail-meta">
                        <span class="meta-badge">🎯 난이도: ${sub.difficulty}</span>
                        <span class="meta-badge">💰 초기자본: ${sub.capital}</span>
                        <span class="meta-badge revenue">💸 예상수익: ${sub.revenue}</span>
                        <span class="meta-badge">🌐 추천 플랫폼: ${sub.platform}</span>
                    </div>
                </div>

                <div class="step-grid">
                    <div class="step-box">
                        <div class="step-title"><span>1</span> Overview</div>
                        <div class="step-content">
                            <strong>비즈니스 모델</strong>
                            <p>${sub.overview.businessModel}</p>
                            <strong>기대 효과</strong>
                            <p>${sub.overview.expectation}</p>
                        </div>
                    </div>
                    <div class="step-box">
                        <div class="step-title"><span>2</span> Preparation</div>
                        <div class="step-content">
                            <strong>필수 인프라 세팅</strong>
                            <p>${sub.preparation.infra}</p>
                            <strong>마인드셋 및 목표</strong>
                            <p>${sub.preparation.mindset}</p>
                        </div>
                    </div>
                    <div class="step-box">
                        <div class="step-title"><span>3</span> Risk & Compliance</div>
                        <div class="step-content">
                            <strong>저작권 및 법적 가이드</strong>
                            <p>${sub.risk.copyright}</p>
                            <strong>플랫폼 제재 방지</strong>
                            <p>${sub.risk.policy}</p>
                            <strong>세무 기초</strong>
                            <p>${sub.risk.tax}</p>
                        </div>
                    </div>
                    <div class="step-box" style="grid-column: 1 / -1;">
                        <div class="step-title"><span>4</span> Workflow & Curriculum</div>
                        <div class="step-content">
                            <strong>프로세스 맵 (한눈에 보기)</strong>
                            <div class="workflow-stepper" style="margin-top: 1.5rem; margin-bottom: 3rem;">
                                ${sub.workflow.map.split('➔').map((step, idx) => `
                                    <div class="workflow-step">
                                        <div class="workflow-icon">${idx + 1}</div>
                                        <div class="workflow-label">${step.trim()}</div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <strong>단계별 실무 튜토리얼 (커리큘럼)</strong>
                            <div class="curriculum-container" style="margin-top: 1rem; background: #f8fafc; padding: 2.5rem; border-radius: 12px; border: 1px solid #e2e8f0;">
                                ${sub.stepByStep.guide.map((item, idx) => `
                                <div class="curriculum-item" style="padding-bottom: 2rem; border-left: 2px solid #cbd5e1; margin-left: 1rem; padding-left: 2.5rem; position: relative;">
                                    <div class="curriculum-marker" style="position: absolute; left: -1.25rem; top: 0; background: #2563eb; color: white; width: 2.5rem; height: 2.5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 4px solid #f8fafc; font-size: 1.1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">${idx + 1}</div>
                                    <div class="curriculum-content">
                                        <div class="curriculum-step-title" style="font-size: 1.2rem; font-weight: 700; color: #1e293b; margin-bottom: 0.5rem;">[STEP ${idx + 1}] ${item.step}</div>
                                        <div class="curriculum-desc" style="color: #475569; line-height: 1.7; font-size: 1.05rem;">${item.desc}</div>
                                    </div>
                                </div>
                                `).join('')}
                            </div>

                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem;">
                                <div>
                                    <strong>현실적인 소요 시간</strong>
                                    <p style="background: rgba(37, 99, 235, 0.05); padding: 1.2rem; border-radius: 8px; border-left: 4px solid #2563eb; font-weight: 500;">⏱ ${sub.workflow.time}</p>
                                </div>
                                <div>
                                    <strong>오늘의 액션 플랜</strong>
                                    <p style="background: rgba(16, 185, 129, 0.05); padding: 1.2rem; border-radius: 8px; border-left: 4px solid #10b981; font-weight: 500;">🔥 ${sub.stepByStep.action}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="step-box">
                        <div class="step-title"><span>5</span> Quality Assurance</div>
                        <div class="step-content">
                            <strong>최종 검수 체크리스트</strong>
                            <p>${sub.qa.checklist.replace(/\n/g, '<br>')}</p>
                            <strong>주요 오류 검출</strong>
                            <p>${sub.qa.error}</p>
                        </div>
                    </div>
                    <div class="step-box">
                        <div class="step-title"><span>6</span> Tips & Trouble</div>
                        <div class="step-content">
                            <strong>효율화 노하우</strong>
                            <p>${sub.tips.efficiency}</p>
                            <strong>위기 대처법</strong>
                            <p>${sub.tips.trouble}</p>
                        </div>
                    </div>
                    <div class="step-box">
                        <div class="step-title"><span>7</span> Scale-up</div>
                        <div class="step-content">
                            <strong>레벨링 및 등급화</strong>
                            <p>${sub.scaleUp.leveling}</p>
                            <strong>자동화/외주화 레버리지</strong>
                            <p>${sub.scaleUp.automation}</p>
                        </div>
                    </div>
                </div>
                
                <div style="text-align:center; margin-top:2rem; margin-bottom:2rem;">
                    <a href="side_hustle_prompt.md" target="_blank" class="prompt-btn">AI 마스터 프롬프트로 기획안 복제하기</a>
                </div>
            </div>
        `;
        mainContent.innerHTML = html;
    }
});

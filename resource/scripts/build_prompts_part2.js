const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

const group2Pages = [
    {
        filename: 'prompt-detail.html', breadcrumb: '수익형 블로그 구조화', title: '월 1,000만 원 수익형 블로그 뼈대 작성', 
        prompt: `너는 상위 1% 네이버/티스토리 블로거야. 내가 주어지는 <span class="variable">[keyword]</span> 키워드를 기반으로, 체류시간을 극대화할 수 있는 완벽한 [블로그 목차 구조]를 짜줘.

[구조 작성 규칙]
1. 서론: 독자의 <span class="variable">[pain_point]</span>를 찌르는 후킹 멘트로 시작
2. 본론: 정보성 콘텐츠 3단 구성 (각 목차마다 구체적인 소제목 작성)
3. 결론: 자연스러운 <span class="variable">[action_goal]</span> 유도 문장 포함
4. 각 목차 밑에 어떤 내용이 들어가야 할지 1~2줄로 요약해 줄 것.`,
        vars: [
            { id: '[keyword]', label: '메인 키워드', placeholder: '예: 직장인 부업 추천' },
            { id: '[pain_point]', label: '독자의 페인포인트', placeholder: '예: 월급만으로는 부족한 생활비' },
            { id: '[action_goal]', label: '최종 유도 목표', placeholder: '예: 전자책 다운로드 링크 클릭' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (블로그 애드센스)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 글을 처음부터 무작정 쓰면 이탈률이 높아집니다. 이 프롬프트로 뼈대(구조)부터 완벽하게 잡아 체류시간을 3분 이상으로 늘립니다.</li>
                <li><strong>2단계:</strong> 출력된 구조 중 각 '본론' 파트를 복사하여 다시 AI에게 "이 부분만 500자로 써줘"라고 나누어 질문하여 디테일한 원고를 완성합니다.</li>
                <li><strong>3단계:</strong> 완성된 원고를 워드프레스에 발행하고, 애드센스 자동 광고를 삽입하여 높은 단가의 클릭 수익을 창출합니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-shorts.html', breadcrumb: '바이럴 쇼츠/릴스 대본', title: '조회수 폭발 쇼츠/릴스 대본 작성', 
        prompt: `유튜브 쇼츠 및 인스타 릴스용 40초 분량 대본을 작성해 줘. 주제는 <span class="variable">[topic]</span>이야.

[쇼츠 대본 필수 공식]
- 0~3초 (후킹): 시청자가 무조건 영상을 멈추게 만드는 <span class="variable">[hook_style]</span> 느낌의 충격적인 멘트
- 3~30초 (본문): 시각적 상상을 자극하는 빠르고 간결한 정보 전달 (문장은 짧게 끊어 칠 것)
- 30~40초 (CTA): <span class="variable">[cta_action]</span> 행동을 유도하는 마무리 멘트
- 영상에 들어갈 텍스트 자막(화면용)과 성우가 읽을 대사(더빙용)를 분리해서 표(Table)로 작성해 줘.`,
        vars: [
            { id: '[topic]', label: '영상 주제', placeholder: '예: 다이소 품절 대란 꿀템 3가지' },
            { id: '[hook_style]', label: '초반 후킹 스타일', placeholder: '예: 호기심 자극, 분노 유발, 팩트 폭행' },
            { id: '[cta_action]', label: '마무리 행동 유도', placeholder: '예: 프로필 링크 클릭 유도' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (쿠팡 제휴/조회수)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 이 프롬프트로 완성된 더빙용 대사를 Vrew나 ElevenLabs에 복사하여 붙여넣으면 즉시 퀄리티 높은 AI 성우 목소리가 완성됩니다.</li>
                <li><strong>2단계:</strong> CapCut이나 Runway를 사용해 영상 클립에 목소리를 씌우면 촬영 없이 10분 만에 숏폼이 완성됩니다.</li>
                <li><strong>3단계:</strong> 영상 댓글이나 인스타 프로필 링크트리에 쿠팡 파트너스 링크를 달아 무자본 제휴 수익을 발생시킵니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-hook.html', breadcrumb: '시선을 끄는 후킹 카피', title: '체류시간을 늘리는 극강의 후킹 카피', 
        prompt: `소셜 미디어(인스타/블로그) 썸네일에 들어갈 극도로 시선을 끄는 후킹 카피(Headline) 5가지를 뽑아줘.
판매할 상품/주제는 <span class="variable">[product]</span>이고, 타겟은 <span class="variable">[target]</span>이야.

[후킹 기법 조건]
1. 공포/손실 회피 기법 (이걸 안 보면 손해 본다는 느낌)
2. 구체적인 숫자 활용 (예: 3가지, 99%, 10분)
3. 상식 파괴형 (기존의 믿음을 뒤집는 문장)
위 3가지 기법을 섞어서, 절대 <span class="variable">[banned_word]</span> 같은 뻔하고 진부한 단어는 쓰지 말고 자극적으로 5개 작성해.`,
        vars: [
            { id: '[product]', label: '홍보할 상품/주제', placeholder: '예: 온라인 부업 전자책' },
            { id: '[target]', label: '타겟 고객', placeholder: '예: 퇴사를 꿈꾸는 30대' },
            { id: '[banned_word]', label: '금지 단어(뻔한 말)', placeholder: '예: 추천, 필수, 꿀팁' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (인스타 카드뉴스)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> AI가 뽑아준 후킹 타이틀 중 가장 강력한 1개를 선택하여 Canva(캔바)의 카드뉴스 첫 장(썸네일)에 크게 박아넣습니다.</li>
                <li><strong>2단계:</strong> 이 썸네일 하나만으로 인스타그램 탐색 탭에서의 클릭률(CTR)이 최소 3배 이상 폭발적으로 증가합니다.</li>
                <li><strong>3단계:</strong> 유입된 막대한 트래픽을 프로필 링크(전자책 판매, 강의 등록 등)로 유도하여 직접적인 매출을 발생시킵니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-review.html', breadcrumb: '구매 유도 상품 리뷰', title: '구매 전환율 300% 내돈내산 리뷰', 
        prompt: `네가 진짜 돈을 주고 이 <span class="variable">[product]</span>을 구매해서 한 달간 사용해 본 사람이라고 상상하고 리뷰를 써줘.
광고 티가 나면 절대 안 돼. 철저하게 '내돈내산(내 돈 주고 내가 산)' 진정성 있는 어투를 유지해 줘.

[리뷰 포함 필수 항목]
1. 구매하게 된 진짜 계기 (과거의 고충: <span class="variable">[pain_point]</span>)
2. 첫인상과 언박싱 후기 (솔직하게 단점도 1개 정도 가볍게 언급)
3. 한 달 사용 후 삶이 어떻게 변했는지 (드라마틱한 변화)
4. 최종 결론: <span class="variable">[recommendation]</span> 하는 사람들에게 강력 추천한다는 마무리`,
        vars: [
            { id: '[product]', label: '리뷰할 상품명', placeholder: '예: 로봇청소기 로보락 S8' },
            { id: '[pain_point]', label: '과거 고충', placeholder: '예: 퇴근 후 청소기 돌릴 힘조차 없음' },
            { id: '[recommendation]', label: '추천 대상', placeholder: '예: 시간당 가치가 높은 맞벌이 부부' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (쿠팡 제휴 마케팅)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 무조건 "제품 좋아요! 사세요!" 식의 뻔한 광고글은 전환율이 0에 수렴합니다. 이 프롬프트로 사람 냄새가 나는 진짜 후기 초안을 만듭니다.</li>
                <li><strong>2단계:</strong> 완성된 텍스트 사이사이에 본인이 직접 찍은 사진이나 픽사베이 등 무료 이미지를 섞어 블로그에 발행합니다.</li>
                <li><strong>3단계:</strong> 글 하단에 "제가 구매한 최저가 링크 공유해 드려요"라는 멘트와 함께 쿠팡 파트너스 우회 링크를 삽입하여 판매 수수료를 극대화합니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-seo.html', breadcrumb: '상위노출 랭킹 알고리즘 맞춤', title: '구글/네이버 SEO 상위노출 최적화', 
        prompt: `내가 쓴 아래의 [블로그 초안]을 구글 및 네이버 검색엔진 최적화(SEO) 기준에 맞게 100% 뜯어고쳐줘.
메인 타겟 키워드는 <span class="variable">[main_keyword]</span>이고, 서브 키워드는 <span class="variable">[sub_keyword]</span>야.

[SEO 최적화 필수 규칙]
1. 제목(H1)에 메인 키워드를 가장 앞쪽에 배치할 것.
2. 서론 첫 100자 이내에 메인 키워드와 서브 키워드가 1회 이상 자연스럽게 포함될 것.
3. 소제목(H2, H3)에 서브 키워드를 활용하여 문맥을 나누고, 가독성을 위해 문단을 짧게 칠 것.
4. 절대 <span class="variable">[banned_ai_words]</span> 같은 전형적인 AI 로봇 어투는 사용하지 말 것.

[블로그 초안]
(이곳에 작성된 글이나 대충 쓴 아이디어를 붙여넣으세요)`,
        vars: [
            { id: '[main_keyword]', label: '메인 타겟 키워드', placeholder: '예: 2024년 청년도약계좌' },
            { id: '[sub_keyword]', label: '연관 서브 키워드', placeholder: '예: 조건, 신청방법, 은행금리' },
            { id: '[banned_ai_words]', label: '사용 금지 AI 어투', placeholder: '예: 결론적으로 말하자면, ~에 대해 알아봅시다' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (구글 애드센스 연금화)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 아무리 좋은 글이라도 검색엔진 봇이 읽기 힘들면 상위 노출되지 않습니다. 이 프롬프트는 로봇이 좋아하는 구조(H태그, 키워드 밀도)로 내 글을 자동 번역해 줍니다.</li>
                <li><strong>2단계:</strong> 출력된 완벽한 SEO 양식의 글을 복사하여 워드프레스나 티스토리에 그대로 붙여넣고 발행합니다.</li>
                <li><strong>3단계:</strong> 구글 1페이지에 한 번 안착된 글은 매달 수천 명의 트래픽을 자동으로 모아오며 강력한 달러(애드센스) 자판기 역할을 수행합니다.</li>
            </ul>
        `
    }
];

group2Pages.forEach(page => {
    let html = fs.readFileSync(path.join(dir, 'prompt-persona.html'), 'utf8');
    
    html = html.replace(/<span class="current">.*?<\/span>/, `<span class="current">\${page.breadcrumb}</span>`);
    html = html.replace(/<h1 class="detail-title">[\s\S]*?<\/h1>/, `<h1 class="detail-title">\${page.title} <span class="badge">v1.0</span></h1>`);
    html = html.replace(/<div class="prompt-text">[\s\S]*?<\/div>/, `<div class="prompt-text">\${page.prompt}</div>`);
    
    let varHtml = '';
    page.vars.forEach(v => {
        varHtml += `
            <div class="var-group">
                <label>\${v.label}</label>
                <input type="text" class="var-input" placeholder="\${v.placeholder}" data-var="\${v.id}">
            </div>`;
    });
    
    html = html.replace(/<div class="var-group">[\s\S]*?<\/div>(?=\s*<div class="var-group">|\s*<button)/g, ''); 
    html = html.replace(/(<button class="btn btn-primary" style="width: 100%;)/, varHtml + '\n$1');
    
    const newJsLogic = `
            const applyBtns = Array.from(document.querySelectorAll('.btn-primary')).filter(btn => btn.textContent.includes('적용하여 프롬프트 완성하기'));
            const applyBtn = applyBtns.length > 0 ? applyBtns[0] : null;
            const varGroups = document.querySelectorAll('.var-group');
            const promptTextContainer = document.querySelector('.prompt-text');
            
            if (promptTextContainer && applyBtn) {
                const originalPromptHTML = promptTextContainer.innerHTML;
                applyBtn.addEventListener('click', () => {
                    let currentHTML = originalPromptHTML;
                    varGroups.forEach(group => {
                        const input = group.querySelector('input');
                        const varId = input.getAttribute('data-var');
                        const val = input.value.trim();
                        if (val && varId) {
                            const regex = new RegExp('<span class="variable">\\\\s*' + varId.replace(/\\[/g,'\\\\[').replace(/\\]/g,'\\\\]') + '\\\\s*<\\\\/span>', 'g');
                            currentHTML = currentHTML.replace(regex, '<span class="variable filled">' + val + '</span>');
                        }
                    });
                    promptTextContainer.innerHTML = currentHTML;
                });
            }
    `;
    html = html.replace(/const applyBtns = [\s\S]*?(?=\/\/ 2\. Clipboard)/, newJsLogic);

    html = html.replace(/<div class="right-col">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, 
    `<div class="right-col">
        <div class="panel">
            <div class="panel-header"><h2 class="panel-title"><i class="ph ph-rocket-launch"></i> 실전 수익화 워크플로우</h2></div>
            \${page.workflow}
        </div>
        <div class="panel">
            <div class="panel-header"><h2 class="panel-title"><i class="ph ph-lightbulb"></i> 프롬프트 활용 꿀팁</h2></div>
            <p style="font-size:0.95rem; color:#475569; line-height:1.6;">좌측의 변수 입력칸을 모두 채운 뒤 <strong>[적용하여 프롬프트 완성하기]</strong> 버튼을 누르세요. 이후 복사 버튼을 눌러 ChatGPT나 Claude에 그대로 붙여넣기 하시면 됩니다.</p>
        </div>
    </div></div></div>`);

    fs.writeFileSync(path.join(dir, page.filename), html);
});

console.log('Group 2/3/4 Prompts built: ' + group2Pages.length);

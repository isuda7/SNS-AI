const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..');

const group3Pages = [
    {
        filename: 'prompt-simulation.html', breadcrumb: '역할극 및 시뮬레이션', title: '고객 시뮬레이션 역할극', 
        prompt: `지금부터 너는 <span class="variable">[target_persona]</span> 역할을 완벽하게 연기해야 해.
내가 너에게 질문을 하거나 상품을 팔려고 설득하면, 그 페르소나에 완벽히 빙의해서 [속마음]과 [실제 대답]을 분리해서 말해줘.

[페르소나 설정]
- 성별/나이: <span class="variable">[age_gender]</span>
- 현재 가장 큰 고민: <span class="variable">[core_problem]</span>
- 성격: 비판적이고 방어적이며 쉽게 돈을 쓰지 않음

자, 이제 내가 판매할 상품 <span class="variable">[product]</span>을 제안할게. 네 속마음과 거절 이유를 날것 그대로 말해봐.`,
        vars: [
            { id: '[target_persona]', label: '타겟 페르소나', placeholder: '예: 20대 취업 준비생' },
            { id: '[age_gender]', label: '성별/나이', placeholder: '예: 28세 여성' },
            { id: '[core_problem]', label: '핵심 고민', placeholder: '예: 면접 자꾸 떨어져서 자존감 바닥' },
            { id: '[product]', label: '판매할 상품', placeholder: '예: 1:1 이력서 첨삭 컨설팅' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (상세페이지 제작)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 크몽(Kmong) 상세페이지나 와디즈(Wadiz) 펀딩을 오픈하기 전에, 내 타겟이 어떤 거절을 할지 AI와 시뮬레이션 합니다.</li>
                <li><strong>2단계:</strong> AI가 말해주는 날카로운 거절 이유(비싸다, 믿을 수 없다 등)를 반박하는 내용을 상세페이지 Q&A와 상세 설명에 모두 반영합니다.</li>
                <li><strong>3단계:</strong> 고객이 이탈할 틈을 주지 않는 완벽한 세일즈 페이지를 완성하여 구매 전환율을 극대화합니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-selfrefine.html', breadcrumb: '프롬프트 자가 개선', title: 'AI 스스로 프롬프트 고도화 (Self-Refine)', 
        prompt: `네가 보기에 지금 내 프롬프트 <span class="variable">[my_prompt]</span>가 <span class="variable">[goal]</span> 목적을 달성하기에 완벽한가?
부족한 점이 있다면 네가 스스로 더 전문적이고 날카로운 프롬프트로 재작성해 줘.

[재작성 기준]
1. 모호한 지시어를 구체적인 숫자로 바꿀 것
2. 출력 형식을 표나 JSON으로 강제할 것
3. 전문가 수준의 결과물이 나올 수 있도록 네가 판단하여 변수나 제약조건을 추가할 것`,
        vars: [
            { id: '[my_prompt]', label: '현재 작성한 허접한 프롬프트', placeholder: '예: 좋은 다이어트 글 써줘' },
            { id: '[goal]', label: '최종 목적', placeholder: '예: 조회수가 터지는 블로그 포스팅' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (나만의 AI 비서 만들기)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 좋은 프롬프트를 짤 줄 몰라도 괜찮습니다. 대충 쓴 문장을 주고 GPT에게 "전문가처럼 고쳐"라고 시킵니다.</li>
                <li><strong>2단계:</strong> AI가 역으로 제안한 완벽한 프롬프트를 저장해두고, 블로그 글쓰기나 카피라이팅 작업 시 반복 사용합니다.</li>
                <li><strong>3단계:</strong> 외주 인력 수준의 결과물을 무자본으로 무한 양산할 수 있는 강력한 무기가 생깁니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-negative.html', breadcrumb: '부정 프롬프트 (제어)', title: '절대 금지 룰셋 (부정 프롬프트)', 
        prompt: `글을 작성할 때 반드시 아래의 [Negative Rules]에 적힌 것들을 모두 피해서 써야 해. 하나라도 어기면 안 돼.

[Negative Rules: 절대 금지]
1. 말투: <span class="variable">[banned_tone]</span> 말투 절대 금지 (예: AI 로봇 같은 딱딱한 문어체 금지)
2. 내용: <span class="variable">[banned_content]</span> 절대 언급하지 말 것 (예: 부작용이나 부정적인 이슈)
3. 구조: <span class="variable">[banned_structure]</span> 형식으로 쓰지 말 것 (예: 서론을 3줄 이상 길게 끌지 말 것)
4. 단어: <span class="variable">[banned_words]</span> 사용 불가`,
        vars: [
            { id: '[banned_tone]', label: '금지할 말투', placeholder: '예: 전문가인 척하는 오만한 말투' },
            { id: '[banned_content]', label: '금지할 내용', placeholder: '예: 경쟁사 A제품에 대한 비방' },
            { id: '[banned_structure]', label: '금지할 구조', placeholder: '예: 장황하고 지루한 서론' },
            { id: '[banned_words]', label: '사용 금지어', placeholder: '예: 알아보겠습니다, 결론적으로' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (상업 블로그 어뷰징 방어)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 네이버 블로그는 '알아보겠습니다' 같은 기계적 단어가 반복되면 스팸으로 분류하여 검색 누락을 시킵니다.</li>
                <li><strong>2단계:</strong> 이 부정 프롬프트를 통해 AI 특유의 클리셰 단어들을 강제로 원천 차단합니다.</li>
                <li><strong>3단계:</strong> 사람이 쓴 것과 구별할 수 없는 원고를 대량 생산하여, 애드포스트 수익을 노리거나 CPA 광고를 안전하게 뿌릴 수 있습니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-reverse.html', breadcrumb: '역추론 (리버스 엔지니어링)', title: '대박난 글 리버스 엔지니어링', 
        prompt: `아래 첨부된 [레퍼런스 원본]은 엄청난 조회수와 수익을 올린 대박 텍스트야.
이 텍스트가 왜 성공했는지 리버스 엔지니어링(역추론)해서 완벽히 분석해 줘.

[분석 지시사항]
1. 이 글의 <span class="variable">[element_1]</span> 특징 (예: 후킹, 감정선 변화 등)
2. 독자로 하여금 <span class="variable">[element_2]</span> 하게 만든 심리적 트리거
3. 분석이 끝나면, 이 구조를 100% 모방해서 <span class="variable">[new_topic]</span> 주제로 새로운 글을 작성해 줘.

[레퍼런스 원본]
(이곳에 대박난 원고나 스크립트를 붙여넣으세요)`,
        vars: [
            { id: '[element_1]', label: '분석할 요소 1', placeholder: '예: 문단의 길이와 가독성' },
            { id: '[element_2]', label: '분석할 요소 2', placeholder: '예: 링크 클릭을 유도' },
            { id: '[new_topic]', label: '내가지정할 새 주제', placeholder: '예: 직장인 1000만원 모으기' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (상위노출 모방 전략)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 유튜브나 블로그에서 이미 '터진' 남의 콘텐츠를 긁어옵니다. (아이디어가 없을 때 최고)</li>
                <li><strong>2단계:</strong> AI에게 이 글의 구조와 심리적 장치들을 뼛속까지 벤치마킹하라고 지시합니다.</li>
                <li><strong>3단계:</strong> 분석된 뼈대에 내 주제만 갈아끼워, 조회수가 폭발할 수밖에 없는 검증된 구조의 릴스/쇼츠 대본을 무한 생성합니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-painpoint.html', breadcrumb: '타겟 페인포인트 분석', title: '고객의 딥(Deep) 페인포인트 발굴', 
        prompt: `나는 <span class="variable">[product_service]</span>를 팔려고 해.
내 주요 타겟은 <span class="variable">[target_demographic]</span>이야.

이 타겟이 겉으로 말하는 가짜 불만 말고, 그들이 매일 밤 잠들기 전 스트레스받는 진짜 '심연의 페인포인트(Pain Point)' 5가지를 묘사해 줘.
각 페인포인트마다 내가 던져야 할 <span class="variable">[marketing_message]</span>도 1문장씩 짝지어 줘.`,
        vars: [
            { id: '[product_service]', label: '판매할 상품/서비스', placeholder: '예: 수면 영양제' },
            { id: '[target_demographic]', label: '타겟 고객층', placeholder: '예: 육아와 직장을 병행하는 30대 워킹맘' },
            { id: '[marketing_message]', label: '마케팅 메시지 포맷', placeholder: '예: 공감과 위로를 건네는 카피' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (상세페이지/광고소재 최적화)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 잘 안 팔리는 상품은 보통 "우리 제품 스펙 짱!"만 외칩니다. 이 프롬프트로 고객이 진짜 아파하는 고통을 찾아냅니다.</li>
                <li><strong>2단계:</strong> 도출된 '심연의 고통' 1문장을 인스타 광고나 블로그 썸네일 첫 줄에 크게 박아넣습니다.</li>
                <li><strong>3단계:</strong> 고객이 "어? 이거 내 이야기인데?"라며 무지성으로 클릭하게 만들어, CPA 단가 및 제휴 수익 전환율을 비약적으로 높입니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-email.html', breadcrumb: '설득형 이메일 세일즈', title: 'DB 타겟 설득형 이메일/문자 작성', 
        prompt: `네가 세계 최고의 다이렉트 레스폰스(Direct Response) 카피라이터라고 생각해.
내가 수집한 고객 DB(이메일/문자)에게 <span class="variable">[offer]</span>을(를) 구매하도록 유도하는 이메일 본문을 써줘.

[이메일 구조]
1. 제목: 오픈율(클릭률)이 무조건 50%가 넘을 파격적인 제목
2. 도입부: 고객이 겪고 있을 <span class="variable">[customer_status]</span> 상황 공감
3. 솔루션: 우리 상품이 그 문제를 완벽히 해결한다는 증명
4. 희소성: <span class="variable">[scarcity_offer]</span> (예: 오늘 자정까지 선착순 10명만 할인)
5. CTA: 망설임 없이 결제 링크를 누르게 만드는 버튼 텍스트`,
        vars: [
            { id: '[offer]', label: '판매할 오퍼(상품)', placeholder: '예: 부동산 경매 비밀 전자책' },
            { id: '[customer_status]', label: '고객의 현재 상황', placeholder: '예: 월세 살면서 전세 사기 걱정하는 무주택자' },
            { id: '[scarcity_offer]', label: '희소성/긴급성 조건', placeholder: '예: 24시간 뒤 가격 2배 인상' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (고객 DB 세일즈)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 블로그나 인스타에서 '무료 PDF 증정'을 미끼로 이메일 DB를 수집합니다.</li>
                <li><strong>2단계:</strong> 수집된 DB를 대상으로 이 프롬프트로 작성한 '희소성 폭발' 메일을 단체 발송(Stibee, Mailchimp 등)합니다.</li>
                <li><strong>3단계:</strong> 이미 내게 관심이 있는(Warm) 고객이기 때문에 클릭 한 번에 고단가의 크몽 전자책이나 VOD 강의 결제로 바로 직결됩니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-keyword.html', breadcrumb: '롱테일 키워드 대량 발굴', title: '경쟁 없는 롱테일(세부) 키워드 발굴', 
        prompt: `나는 블로그(티스토리/워드프레스)로 구글 상위 노출을 노리고 있어.
메인 키워드인 <span class="variable">[seed_keyword]</span>와 연관된 롱테일(Long-tail) 세부 키워드를 20개 뽑아줘.

[키워드 조건]
1. 사람들이 검색은 하지만 대형 블로거들이 잘 다루지 않는 틈새(Niche) 키워드
2. <span class="variable">[search_intent]</span> 의도를 가진 사람들이 검색할 만한 문장형 키워드 (예: ~하는 법, ~비교, ~추천)
3. 출력은 반드시 번호, 키워드, 해당 키워드로 글을 쓸 때의 '예상 제목'으로 표(Table)를 만들어 줘.`,
        vars: [
            { id: '[seed_keyword]', label: '메인 시드 키워드', placeholder: '예: 탈모' },
            { id: '[search_intent]', label: '검색 의도', placeholder: '예: 부작용 걱정 없이 치료하고 싶은' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (애드센스 블루오션 선점)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> '탈모' 같은 메인 키워드는 경쟁이 너무 세서 초보자가 쓰면 검색 결과 10페이지로 밀립니다.</li>
                <li><strong>2단계:</strong> 이 프롬프트로 '20대 여자 정수리 탈모 치료 비용 비교' 같은 롱테일 키워드를 대량으로 뽑아냅니다.</li>
                <li><strong>3단계:</strong> 경쟁이 없어 구글 1페이지에 바로 꽂히며, 구매/클릭 의도가 확실한 방문자들이라 애드센스 및 제휴 링크 클릭률(CTR)이 미친듯이 폭발합니다.</li>
            </ul>
        `
    }
];

let count = 0;
group3Pages.forEach(page => {
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
    count++;
});

console.log('Group 3 Prompts built: ' + count);

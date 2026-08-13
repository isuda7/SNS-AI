const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'resource');
const baseHtml = fs.readFileSync(path.join(dir, 'prompt-persona.html'), 'utf8');

// 1. Ad Pages Data
const adPagesData = [
    { filename: 'ad-db.html', cat1: '광고 제공 플랫폼', cat2: '디비센스/텐핑 (CPA)', title: '고단가 CPA / DB생성 수익화', desc: '고객의 상담 신청이나 앱 설치만으로 큰 수익을 창출하는 플랫폼 가이드입니다.', content: '<div class="guide-container"><h2 class="guide-h2"><i class="ph ph-phone-call" style="color:#3b82f6;"></i> 1. CPA 수익 구조 이해하기</h2><p class="guide-p">CPA(Cost Per Action)는 물건을 팔지 않아도 됩니다. 고객이 내 링크를 통해 <strong>무료 상담 신청, 앱 설치, 회원가입</strong>만 완료하면 건당 1~5만 원의 높은 수수료를 받습니다.</p><div class="guide-alert"><div class="guide-alert-title">대표 플랫폼</div><ul class="guide-ul"><li><strong>디비센스(DBsense):</strong> 보험, 대출, 개인회생 등 고단가 DB 특화</li><li><strong>텐핑(Tenping):</strong> 모바일 앱 설치 및 다이어트/미용 특화</li></ul></div></div>' },
    { filename: 'ad-sponsor.html', cat1: '광고 제공 플랫폼', cat2: '브랜드커넥트/레뷰', title: '체험단 및 원고료 수익화', desc: '내 채널의 영향력을 바탕으로 제품 협찬과 현금 원고료를 받는 플랫폼입니다.', content: '<div class="guide-container"><h2 class="guide-h2"><i class="ph ph-gift" style="color:#10b981;"></i> 1. 협찬 플랫폼의 양대 산맥</h2><p class="guide-p">블로그나 인스타 방문자가 500명만 넘어도 충분히 수익을 낼 수 있습니다.</p><ul class="guide-ul"><li><strong>네이버 브랜드커넥트:</strong> 네이버가 공식 지원하는 인플루언서 전용 매칭 플랫폼. 현금 단가가 매우 높음.</li><li><strong>레뷰(REVU):</strong> 국내 최대 체험단. 식당 방문, 뷰티 제품 등 일상적인 협찬이 가장 활발함.</li></ul></div>' },
    { filename: 'ad-banner.html', cat1: '광고 제공 플랫폼', cat2: '애드포스트/애드센스', title: '클릭/노출 기반 배너 수익', desc: '글을 읽는 방문자 수(트래픽)에 비례하여 자동으로 발생되는 패시브 인컴입니다.', content: '<div class="guide-container"><h2 class="guide-h2"><i class="ph ph-mouse" style="color:#f59e0b;"></i> 1. 애드포스트 vs 애드센스 비교</h2><p class="guide-p">트래픽 채널에 따라 달 수 있는 배너의 종류와 단가가 다릅니다.</p><div class="guide-alert"><div class="guide-alert-title">단가 차이</div><ul class="guide-ul"><li><strong>네이버 애드포스트:</strong> 단가가 낮음(1클릭 50~100원 수준). 하지만 네이버 검색 유입으로 트래픽 모으기가 압도적으로 쉬움.</li><li><strong>구글 애드센스(티스토리/워드프레스):</strong> 단가가 높음(1클릭 달러 정산). 이른바 고시라 불릴 만큼 승인이 까다롭지만, 월 천만 원 이상 수익자 대다수가 애드센스를 사용.</li></ul></div></div>' },
    { filename: 'ad-affiliate.html', cat1: '광고 제공 플랫폼', cat2: '쿠팡/클릭뱅크 (제휴)', title: '상품 판매 커미션 (제휴 마케팅)', desc: '국내외 쇼핑몰의 상품을 대신 팔아주고 판매액의 일정 %를 수수료로 받습니다.', content: '<div class="guide-container"><h2 class="guide-h2"><i class="ph ph-shopping-cart" style="color:#ef4444;"></i> 1. 플랫폼별 공략법</h2><ul class="guide-ul"><li><strong>쿠팡 파트너스:</strong> 수익률 3%. 단가가 낮지만 한국인 특성상 전환율(구매율)이 미친듯이 높습니다. 링크 클릭 후 24시간 내 다른 물건을 사도 내 수익이 됩니다.</li><li><strong>클릭뱅크(ClickBank):</strong> 수익률 50~75%. 전자책, 소프트웨어 등 디지털 상품을 판매합니다. 마진율이 엄청나 해외 트래픽(핀터레스트/틱톡)을 뚫으면 수익 단위가 달라집니다.</li></ul></div>' },
    { filename: 'traffic-blog.html', cat1: '광고 배포 채널', cat2: '네이버 블로그', title: '국내 1위 검색 트래픽 채널', desc: '한국 시장에서 가장 빠르고 확실하게 방문자를 모을 수 있는 베이스캠프입니다.', content: '<div class="guide-container"><h2 class="guide-h2"><i class="ph ph-magnifying-glass" style="color:#10b981;"></i> 1. 네이버 블로그의 역할</h2><p class="guide-p"><strong>체험단(레뷰), 애드포스트, CPA 광고</strong>를 뿌리기 가장 좋은 국내 최적화 플랫폼입니다.</p><div class="guide-alert warning"><div class="guide-alert-title">주의점 (저품질)</div><ul class="guide-ul"><li>쿠팡 파트너스 링크나 과도한 CPA 외부 링크를 삽입하면 저품질(검색 누락) 대상이 됩니다.</li><li>우회 링크(리디렉션) 기술을 사용하거나, 10개 중 2개 글에만 링크를 다는 등의 관리가 필수입니다.</li></ul></div></div>' },
    { filename: 'traffic-seo.html', cat1: '광고 배포 채널', cat2: '티스토리/워드프레스', title: '구글 SEO 기반 트래픽', desc: '한 번 상위 노출되면 연금처럼 방문자가 들어오는 구글 생태계 공략 채널입니다.', content: '<div class="guide-container"><h2 class="guide-h2"><i class="ph ph-google-logo" style="color:#3b82f6;"></i> 1. 애드센스 전용 수익화 채널</h2><p class="guide-p">티스토리와 워드프레스는 오직 <strong>구글 애드센스 달러 수익</strong>과 <strong>외부 링크 제약이 없는 특징</strong>을 활용해 제휴 마케팅 링크를 뿌리는 데 특화되어 있습니다.</p><ul class="guide-ul"><li>워드프레스는 서버비가 들지만, 카카오 대형 화재처럼 플랫폼이 날아갈 위험이 없는 완벽한 내 자산입니다.</li><li>글 하나를 써도 구글 SEO(검색엔진 최적화) 양식에 맞춰 길고 전문적으로 쓰는 것이 핵심입니다.</li></ul></div>' },
    { filename: 'traffic-shorts.html', cat1: '광고 배포 채널', cat2: '인스타/유튜브 쇼츠', title: '숏폼 알고리즘 바이럴', desc: '검색이 아닌 알고리즘 추천을 통해 단기간에 수십만 트래픽을 폭발시키는 채널입니다.', content: '<div class="guide-container"><h2 class="guide-h2"><i class="ph ph-video-camera" style="color:#ef4444;"></i> 1. 폭발적인 트래픽과 외부 링크</h2><p class="guide-p">숏폼은 현재 인류가 가장 많은 시간을 소비하는 포맷입니다. 영상 하나가 터지면 블로그 한 달 치 방문자가 하루 만에 들어옵니다.</p><div class="guide-alert"><div class="guide-alert-title">링크 연동 노하우</div><ul class="guide-ul"><li>인스타그램: 프로필에 Linktree(링크트리)를 달고, 영상 내에서 프로필 링크를 확인하세요라고 유도합니다.</li><li>유튜브 쇼츠: 현재 쇼츠 댓글에 외부 링크 클릭이 막혀 있으므로, 관련 동영상 링크로 롱폼을 연결하거나 프로필 링크를 활용해야 합니다.</li></ul></div></div>' },
    { filename: 'traffic-community.html', cat1: '광고 배포 채널', cat2: '지식iN/카페 (게릴라)', title: '타겟 맞춤형 게릴라 마케팅', desc: '내 블로그가 없어도 당장 트래픽을 끌어올 수 있는 실전 노하우입니다.', content: '<div class="guide-container"><h2 class="guide-h2"><i class="ph ph-users" style="color:#8b5cf6;"></i> 1. 지식인/카페 게릴라 트래픽</h2><p class="guide-p">질문을 올린 사람이나 카페 회원은 이미 니즈가 100% 차오른 상태입니다. 이들에게 정확한 솔루션과 함께 내 광고 링크(CPA, 쿠팡 등)를 전달하면 전환율이 압도적입니다.</p><div class="guide-alert warning"><div class="guide-alert-title">어뷰징 주의</div><ul class="guide-ul"><li>카페에서 홍보성 링크를 바로 달면 30초 만에 강퇴당합니다. 쪽지를 활용하거나 자연스러운 정보성 글에 교묘하게 링크를 숨겨야 합니다.</li><li>지식인 답변 시 80%의 진정성 있는 답변 후 20%의 링크를 달아야 네이버 제재를 피할 수 있습니다.</li></ul></div></div>' }
];

const styleBlock = `
    <style>
        .guide-container { background: #fff; padding: 2.5rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .guide-h2 { font-size: 1.4rem; color: #1e293b; margin: 2rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.5rem; }
        .guide-p { font-size: 1.05rem; color: #475569; line-height: 1.7; margin-bottom: 1rem; }
        .guide-alert { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.2rem; border-radius: 0 8px 8px 0; margin: 1.5rem 0; }
        .guide-alert.warning { background: #fef2f2; border-left-color: #ef4444; }
        .guide-alert-title { font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; font-size: 1.1rem; }
        .guide-ul { margin: 1rem 0 1rem 1.5rem; color: #475569; line-height: 1.6; }
        .guide-ul li { margin-bottom: 0.5rem; }
    </style>
`;

adPagesData.forEach(page => {
    let html = baseHtml;
    // We properly evaluate variables in NodeJS now using backticks natively, no escaping $.
    html = html.replace(/<span>AI Prompt<\/span>[\s\S]*?<span class="current">.*?<\/span>/, `<span>광고 사이트</span>
                <i class="ph ph-caret-right"></i>
                <span>${page.cat1}</span>
                <i class="ph ph-caret-right"></i>
                <span class="current">${page.cat2}</span>`);
                
    const contentStart = html.indexOf('<div class="content">');
    const contentEnd = html.lastIndexOf('</div>', html.lastIndexOf('</main>')); 
    
    const newContent = `
        <div class="content">
            ${styleBlock}
            <div style="margin-bottom: 2rem;">
                <h1 style="font-size: 1.8rem; color: #1e293b; margin-bottom: 0.5rem;">${page.title}</h1>
                <p style="color: #64748b; font-size: 1.05rem;">${page.desc}</p>
            </div>
            ${page.content}
        </div>
    `;
    html = html.substring(0, contentStart) + newContent + html.substring(contentEnd + 6);
    fs.writeFileSync(path.join(dir, page.filename), html);
});

// Also create redirect files for the deleted ones, just in case user has them open
const redirectHtml = (target) => `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${target}"></head><body>Redirecting...</body></html>`;
fs.writeFileSync(path.join(dir, 'ad-coupang.html'), redirectHtml('ad-affiliate.html'));
fs.writeFileSync(path.join(dir, 'ad-clickbank.html'), redirectHtml('ad-affiliate.html'));
fs.writeFileSync(path.join(dir, 'ad-tenping.html'), redirectHtml('ad-db.html'));


// 2. Prompts Data
const promptsData = [
    {
        filename: 'prompt-format.html', breadcrumb: '출력 포맷 및 룰셋', title: '출력 포맷 및 룰셋 프롬프트', 
        prompt: `다음 정보를 바탕으로 글을 작성해 줘. \n단, 출력 시 반드시 아래의 [출력 포맷]과 [절대 규칙]을 100% 준수해야 해.\n\n[출력 포맷]\n- 제목: <span class="variable">[title_style]</span>\n- 본문 구조: <span class="variable">[content_structure]</span>\n\n[절대 규칙]\n1. <span class="variable">[rule_1]</span>\n2. <span class="variable">[rule_2]</span>\n3. 금지어: <span class="variable">[forbidden_words]</span>`,
        vars: [{ id: '[title_style]', label: '제목 스타일', placeholder: 'H1 태그, 후킹형' }, { id: '[content_structure]', label: '본문 구조', placeholder: '3열 표' }, { id: '[rule_1]', label: '필수 규칙 1', placeholder: '' }, { id: '[rule_2]', label: '필수 규칙 2', placeholder: '' }, { id: '[forbidden_words]', label: '금지어', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">출력 포맷을 강제하여 하루 10개 쓰던 글을 50개씩 찍어내어 블로그 수익을 폭발시킵니다.</p>`
    },
    {
        filename: 'prompt-hallucination.html', breadcrumb: '할루시네이션(환각) 억제', title: '팩트 체크 및 할루시네이션 억제', 
        prompt: `너는 철저한 팩트 체크 담당 편집장이야. <span class="variable">[topic]</span>에 대해 물으면 3가지를 점검해.\n1. 확실한 사실(Fact)인가?\n2. 불분명하면 "알 수 없습니다" 답변\n3. <span class="variable">[reference_type]</span> 출처 제시`,
        vars: [{ id: '[topic]', label: '주제', placeholder: '' }, { id: '[reference_type]', label: '출처 형태', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">의료/금융(YMYL) 블로그의 저품질을 막고 신뢰도를 높여 고단가 CPA 전환을 이끕니다.</p>`
    },
    {
        filename: 'prompt-fewshot.html', breadcrumb: 'Few-Shot 러닝 (예시 기반)', title: 'Few-Shot 러닝 (예시 학습형)', 
        prompt: `다음 예시 패턴을 학습해.\n\n[학습 예시 1]\n- 입력: <span class="variable">[example_in_1]</span>\n- 출력: <span class="variable">[example_out_1]</span>\n\n[새 미션]\n- 입력: <span class="variable">[new_input]</span>\n- 출력:`,
        vars: [{ id: '[example_in_1]', label: '인풋1', placeholder: '' }, { id: '[example_out_1]', label: '아웃풋1', placeholder: '' }, { id: '[new_input]', label: '새 인풋', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">과거 대박난 카피를 학습시켜 클릭뱅크 및 쿠팡 파트너스 후킹 타이틀을 무한 생산합니다.</p>`
    },
    {
        filename: 'prompt-cot.html', breadcrumb: '단계별 추론 (CoT)', title: 'CoT (Chain of Thought) 추론형', 
        prompt: `<span class="variable">[problem]</span> 문제에 대해 단계별로 생각한 뒤 결론을 내줘.\n1단계: 원인 분석\n2단계: 해결책\n3단계: <span class="variable">[target_audience]</span>에게 미칠 영향\n4단계: 최종 <span class="variable">[output_goal]</span>`,
        vars: [{ id: '[problem]', label: '문제', placeholder: '' }, { id: '[target_audience]', label: '타겟', placeholder: '' }, { id: '[output_goal]', label: '최종목표', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">크몽 전자책이나 VOD 강의 커리큘럼을 깊이 있게 기획하여 패시브 인컴을 구축합니다.</p>`
    },
    {
        filename: 'prompt-audit.html', breadcrumb: '감시 프롬프트 (품질 QA)', title: '발행 원고 품질 감시자 (QA)', 
        prompt: `System Role: 너는 네이버/구글 검색엔진 최적화(SEO) 품질 검수 책임자야.\n내가 전달하는 블로그 원고를 읽고, 아래의 [감시 기준 6가지]를 통과했는지 100점 만점으로 채점하고 보완점을 지시해 줘.\n\n[감시 기준 6가지]\n1. 분량 검수 (40점): 본문 텍스트가 공백을 제외하고 <span class="variable">[min_length]</span>자를 넘겼는가?\n2. 이미지 룰셋 검수 (20점): 본문 최상단에 이미지 태그가 오직 1개만 있는지 확인하라.\n3. 검색 의도(Search Intent) 검수 (20점): 서론 첫 문단에서 검색자가 앓고 있는 문제(<span class="variable">[pain_point]</span>)를 정확히 짚어주고 해결책을 암시했는가?\n4. 가독성 검수 (20점): 중간에 '비교 표'나 '체크리스트'가 적절히 사용되었는가?\n5. 어투 검수 (발견시 0점 처리): 기계적인 프레임의 소제목이 사용되었는가?\n6. 주제 매력도 검수 (발견시 0점 처리): 어그로/후킹 요소가 포함되어 있는가?\n\n[검수할 원고 내용]: (이곳에 작성된 초안을 붙여넣으세요)`,
        vars: [{ id: '[min_length]', label: '최소 글자수', placeholder: '1,500' }, { id: '[pain_point]', label: '페인포인트', placeholder: '예: 비용 낭비' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">유저님의 커스텀 룰(AGENTS.md)이 적용된 감시자입니다. 완벽한 100점짜리 원고만 발행하여 애드센스 단가를 방어합니다.</p>`
    },
    {
        filename: 'prompt-detail.html', breadcrumb: '수익형 블로그 구조화', title: '월 1000만 원 수익형 블로그 뼈대', 
        prompt: `<span class="variable">[keyword]</span> 기반으로 완벽한 [블로그 목차 구조]를 짜줘.\n1. 서론: 독자의 <span class="variable">[pain_point]</span> 후킹\n2. 본론: 3단 구성\n3. 결론: 자연스러운 <span class="variable">[action_goal]</span> 유도`,
        vars: [{ id: '[keyword]', label: '키워드', placeholder: '' }, { id: '[pain_point]', label: '페인포인트', placeholder: '' }, { id: '[action_goal]', label: '최종유도', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">체류시간을 3분 이상으로 늘려 구글 SEO 랭킹을 올리고 광고 클릭을 유도합니다.</p>`
    },
    {
        filename: 'prompt-shorts.html', breadcrumb: '바이럴 쇼츠 대본', title: '조회수 폭발 쇼츠/릴스 대본', 
        prompt: `<span class="variable">[topic]</span> 주제로 40초 대본 작성해 줘.\n0~3초: <span class="variable">[hook_style]</span> 멘트\n3~30초: 정보 전달\n30~40초: <span class="variable">[cta_action]</span> 행동 유도\n화면 자막과 더빙 대사를 표로 분리해.`,
        vars: [{ id: '[topic]', label: '주제', placeholder: '' }, { id: '[hook_style]', label: '후킹스타일', placeholder: '' }, { id: '[cta_action]', label: '행동유도', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">Vrew나 ElevenLabs에 넣어 쇼츠를 공장장처럼 찍어내어 쿠팡 수익을 발생시킵니다.</p>`
    },
    {
        filename: 'prompt-hook.html', breadcrumb: '시선을 끄는 카피', title: '체류시간 늘리는 극강 후킹', 
        prompt: `판매 상품 <span class="variable">[product]</span>, 타겟 <span class="variable">[target]</span>.\n공포기법과 구체적 숫자를 써서 썸네일 카피 5개 뽑아. <span class="variable">[banned_word]</span> 금지.`,
        vars: [{ id: '[product]', label: '상품', placeholder: '' }, { id: '[target]', label: '타겟', placeholder: '' }, { id: '[banned_word]', label: '금지어', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">Canva로 카드뉴스를 만들어 인스타 클릭률(CTR)을 극대화합니다.</p>`
    },
    {
        filename: 'prompt-review.html', breadcrumb: '구매 유도 상품 리뷰', title: '구매 전환율 300% 내돈내산', 
        prompt: `<span class="variable">[product]</span> 내돈내산 리뷰 써줘.\n1. 과거 고충: <span class="variable">[pain_point]</span>\n2. 단점 1개 포함 첫인상\n3. 변화된 점\n4. <span class="variable">[recommendation]</span> 타겟에게 강력 추천`,
        vars: [{ id: '[product]', label: '상품', placeholder: '' }, { id: '[pain_point]', label: '과거고충', placeholder: '' }, { id: '[recommendation]', label: '추천타겟', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">가짜 광고티가 나지 않는 리뷰로 쿠팡 파트너스 커미션을 싹쓸이합니다.</p>`
    },
    {
        filename: 'prompt-seo.html', breadcrumb: '상위노출 SEO', title: '구글/네이버 SEO 최적화', 
        prompt: `블로그 초안을 SEO에 맞게 고쳐줘.\n메인 키워드: <span class="variable">[main_keyword]</span>\n서브 키워드: <span class="variable">[sub_keyword]</span>\n<span class="variable">[banned_ai_words]</span> 사용 금지.`,
        vars: [{ id: '[main_keyword]', label: '메인', placeholder: '' }, { id: '[sub_keyword]', label: '서브', placeholder: '' }, { id: '[banned_ai_words]', label: '금지어', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">구글 1페이지에 안착하여 매달 자동으로 들어오는 트래픽 연금을 만듭니다.</p>`
    },
    {
        filename: 'prompt-simulation.html', breadcrumb: '시뮬레이션', title: '고객 반박 시뮬레이션', 
        prompt: `너는 <span class="variable">[age_gender]</span> <span class="variable">[target_persona]</span>야. 고민은 <span class="variable">[core_problem]</span>.\n내가 <span class="variable">[product]</span>를 팔면 네 속마음과 거절 이유를 날것으로 말해.`,
        vars: [{ id: '[age_gender]', label: '연령/성별', placeholder: '' }, { id: '[target_persona]', label: '페르소나', placeholder: '' }, { id: '[core_problem]', label: '고민', placeholder: '' }, { id: '[product]', label: '상품', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">상세페이지 제작 전 고객의 반박을 파훼하여 구매 전환율을 극대화합니다.</p>`
    },
    {
        filename: 'prompt-selfrefine.html', breadcrumb: '자가 개선', title: '프롬프트 셀프 고도화', 
        prompt: `내 프롬프트 <span class="variable">[my_prompt]</span>가 <span class="variable">[goal]</span>에 적합한지 보고 부족하면 더 전문적으로 다시 짜줘.`,
        vars: [{ id: '[my_prompt]', label: '내 프롬프트', placeholder: '' }, { id: '[goal]', label: '목적', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">외주 없이 퀄리티 높은 나만의 강력한 마케팅 비서를 무자본으로 세팅합니다.</p>`
    },
    {
        filename: 'prompt-negative.html', breadcrumb: '부정 프롬프트', title: '어뷰징 방어 부정 프롬프트', 
        prompt: `[금지 규칙]\n1. 말투: <span class="variable">[banned_tone]</span>\n2. 내용: <span class="variable">[banned_content]</span>\n3. 구조: <span class="variable">[banned_structure]</span>\n4. 단어: <span class="variable">[banned_words]</span> 사용 절대 금지`,
        vars: [{ id: '[banned_tone]', label: '금지 말투', placeholder: '' }, { id: '[banned_content]', label: '금지 내용', placeholder: '' }, { id: '[banned_structure]', label: '금지 구조', placeholder: '' }, { id: '[banned_words]', label: '금지 단어', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">네이버 블로그 스팸 알고리즘을 회피하여 안전한 대량 포스팅 파이프라인을 엽니다.</p>`
    },
    {
        filename: 'prompt-reverse.html', breadcrumb: '역추론 분석', title: '상위 원고 리버스 엔지니어링', 
        prompt: `대박난 원본을 리버스 엔지니어링해.\n1. <span class="variable">[element_1]</span> 분석\n2. <span class="variable">[element_2]</span> 심리 장치\n분석 후 이 뼈대 그대로 <span class="variable">[new_topic]</span>으로 새 글을 써줘.`,
        vars: [{ id: '[element_1]', label: '요소1', placeholder: '' }, { id: '[element_2]', label: '요소2', placeholder: '' }, { id: '[new_topic]', label: '새 주제', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">이미 검증된 조회수 100만 짜리 남의 글 뼈대를 합법적으로 훔쳐와 내 수익으로 만듭니다.</p>`
    },
    {
        filename: 'prompt-painpoint.html', breadcrumb: '페인포인트 분석', title: '심연의 페인포인트 발굴', 
        prompt: `<span class="variable">[product_service]</span> 타겟 <span class="variable">[target_demographic]</span>의 가짜 불만 말고 진짜 심연의 고통 5가지를 뽑고 <span class="variable">[marketing_message]</span> 메시지를 짝지어줘.`,
        vars: [{ id: '[product_service]', label: '상품', placeholder: '' }, { id: '[target_demographic]', label: '타겟층', placeholder: '' }, { id: '[marketing_message]', label: '마케팅방향', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">타겟의 감정을 후벼파는 단 한 줄의 카피로 CPA(상담신청) 전환율을 폭등시킵니다.</p>`
    },
    {
        filename: 'prompt-email.html', breadcrumb: '설득형 세일즈', title: 'DB 타겟 설득형 이메일', 
        prompt: `고객에게 <span class="variable">[offer]</span> 구매를 유도해.\n1. 도입: <span class="variable">[customer_status]</span> 공감\n2. 희소성: <span class="variable">[scarcity_offer]</span>\n3. 강력한 CTA 버튼 삽입`,
        vars: [{ id: '[offer]', label: '오퍼', placeholder: '' }, { id: '[customer_status]', label: '고객상태', placeholder: '' }, { id: '[scarcity_offer]', label: '희소성', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">무료 PDF 배포로 모은 이메일 DB에 자동화 메일을 보내 VOD 강의 및 고단가 컨설팅을 판매합니다.</p>`
    },
    {
        filename: 'prompt-keyword.html', breadcrumb: '롱테일 키워드', title: '경쟁 없는 롱테일 키워드 발굴', 
        prompt: `구글 SEO 타겟팅.\n메인 <span class="variable">[seed_keyword]</span>와 연관된 롱테일 키워드 20개 뽑아.\n대형 블로그가 안 쓰지만 <span class="variable">[search_intent]</span> 의도를 가진 문장형 키워드로.`,
        vars: [{ id: '[seed_keyword]', label: '메인키워드', placeholder: '' }, { id: '[search_intent]', label: '검색의도', placeholder: '' }],
        workflow: `<h4 style="font-weight:700; color:#1e293b;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우</h4><p style="margin-top:0.5rem; color:#475569;">블루오션 키워드를 선점하여 초보 블로그라도 즉시 구글 1페이지에 꽂아 애드센스 수익을 냅니다.</p>`
    }
];

promptsData.forEach(page => {
    let html = baseHtml;
    
    html = html.replace(/<span class="current">.*?<\/span>/, `<span class="current">${page.breadcrumb}</span>`);
    html = html.replace(/<h1 class="detail-title">[\s\S]*?<\/h1>/, `<h1 class="detail-title">${page.title} <span class="badge">v1.0</span></h1>`);
    html = html.replace(/<div class="prompt-text">[\s\S]*?<\/div>/, `<div class="prompt-text">${page.prompt}</div>`);
    
    let varHtml = '';
    page.vars.forEach(v => {
        varHtml += `
            <div class="var-group">
                <label>${v.label}</label>
                <input type="text" class="var-input" placeholder="${v.placeholder}" data-var="${v.id}">
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
            ${page.workflow}
        </div>
        <div class="panel">
            <div class="panel-header"><h2 class="panel-title"><i class="ph ph-lightbulb"></i> 프롬프트 활용 꿀팁</h2></div>
            <p style="font-size:0.95rem; color:#475569; line-height:1.6;">좌측의 변수 입력칸을 모두 채운 뒤 <strong>[적용하여 프롬프트 완성하기]</strong> 버튼을 누르세요. 이후 복사 버튼을 눌러 ChatGPT나 Claude에 그대로 붙여넣기 하시면 됩니다.</p>
        </div>
    </div></div></div>`);

    fs.writeFileSync(path.join(dir, page.filename), html);
});

console.log('Fixed ALL generated files successfully.');

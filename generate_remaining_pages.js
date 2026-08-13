const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const baseHtmlPath = path.join(dir, 'prompt-detail.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const pages = [
  {
    filename: 'prompt-format.html',
    category1: '프롬프트 기본 상식',
    category2: '출력 포맷 및 룰셋',
    title: '완벽한 출력 포맷 및 룰셋 강제 프롬프트',
    version: 'v1.2',
    promptText: '앞으로 제공되는 정보는 반드시 아래의 [출력 포맷]에 맞게 작성하고, [작성 룰셋]을 철저히 지켜.\n\n[작성 룰셋]\n- <span class="variable">[rule_1]</span>\n- <span class="variable">[rule_2]</span>\n\n[출력 포맷]\n<span class="variable">[output_format]</span>',
    variables: [
      { id: '[rule_1]', label: '룰 1 (예: 이모티콘 절대 사용 금지)' },
      { id: '[rule_2]', label: '룰 2 (예: 결론부터 두괄식으로 작성)' },
      { id: '[output_format]', label: '출력 포맷 (예: 마크다운 표 형식)' }
    ],
    exampleParams: '이모티콘 사용 금지 / 소제목 앞에는 번호 매기기 / 마크다운 표 형식',
    exampleOutput: '1. 장점 요약\n| 항목 | 내용 |\n|---|---|\n| 내구성 | 5년 이상 사용 가능 |'
  },
  {
    filename: 'prompt-hallucination.html',
    category1: '프롬프트 기본 상식',
    category2: '할루시네이션(환각) 억제',
    title: '할루시네이션 원천 차단 프롬프트',
    version: 'v2.0',
    promptText: '너는 반드시 사실에 기반해서만 답변해야 해.\n질문에 대해 <span class="variable">[knowledge_source]</span>에서 확인할 수 없는 내용이거나 불확실한 정보라면 "모릅니다"라고 대답해.\n정보를 지어내거나 추론하여 덧붙이는 행위(<span class="variable">[hallucination_type]</span>)를 절대 금지한다.',
    variables: [
      { id: '[knowledge_source]', label: '지식 출처 (예: 대한민국 법령 정보, 주어진 텍스트)' },
      { id: '[hallucination_type]', label: '억제할 환각 유형 (예: 가상의 판례 생성)' }
    ],
    exampleParams: '2023년 개정 세법 데이터 / 임의의 절세 팁 창작',
    exampleOutput: '"제시된 2023년 개정 세법 데이터에는 해당 내용이 명시되어 있지 않아 답변드릴 수 없습니다."'
  },
  {
    filename: 'prompt-hook.html',
    category1: '콘텐츠 기획 & 제작',
    category2: '시선을 끄는 후킹 카피',
    title: '클릭률 300% 상승 썸네일/제목 후킹 카피 프롬프트',
    version: 'v2.5',
    promptText: '주제: <span class="variable">[topic]</span>\n타겟: <span class="variable">[target_audience]</span>\n\n위 사람들의 뇌리에 꽂히는 <span class="variable">[hook_technique]</span> 기법을 사용하여, 절대 스크롤을 넘길 수 없는 썸네일 문구와 제목 조합 5가지를 제안해.',
    variables: [
      { id: '[topic]', label: '주제 (예: 영어회화 독학)' },
      { id: '[target_audience]', label: '타겟 독자 (예: 매번 3일 만에 포기하는 직장인)' },
      { id: '[hook_technique]', label: '후킹 기법 (예: 권위 부정, 숫자 강조, 손실 회피)' }
    ],
    exampleParams: '영어회화 독학 / 3일 만에 포기하는 직장인 / 손실 회피',
    exampleOutput: '"1. 제목: 퇴근 후 영어학원? 당장 취소하세요 (시간 낭비입니다)\n2. 썸네일 텍스트: 영어학원에 쏟은 300만 원 돌려받는 법"'
  },
  {
    filename: 'prompt-painpoint.html',
    category1: '제휴 마케팅 셀링',
    category2: '타겟 페인포인트(Pain Point) 분석',
    title: '타겟의 숨겨진 페인포인트 딥다이브 프롬프트',
    version: 'v1.1',
    promptText: '<span class="variable">[product]</span>를 판매하기 위해 타겟 고객인 <span class="variable">[target_customer]</span>의 심리를 분석해.\n단순한 1차원적 문제를 넘어, 그들이 밤에 잠을 설치며 고민하는 <span class="variable">[deep_emotion]</span>와 관련된 딥 페인포인트 3가지를 도출하고, 이를 자극할 수 있는 마케팅 메시지를 제시해.',
    variables: [
      { id: '[product]', label: '판매 상품 (예: 탈모 샴푸)' },
      { id: '[target_customer]', label: '타겟 고객 (예: 20대 후반 취준생)' },
      { id: '[deep_emotion]', label: '심층 감정 (예: 소개팅 실패의 두려움, 자존감 하락)' }
    ],
    exampleParams: '탈모 샴푸 / 20대 후반 취준생 / 면접에서의 첫인상과 자존감 하락',
    exampleOutput: '"페인포인트 1: 면접관의 시선이 내 정수리에 머물 때의 그 비참함\n마케팅 메시지: 스펙은 만점인데, 머리숱 때문에 첫인상 점수가 깎이고 있진 않나요?"'
  },
  {
    filename: 'prompt-email.html',
    category1: '제휴 마케팅 셀링',
    category2: '설득형 이메일 세일즈',
    title: '오픈율 50% 달성 콜드 이메일 프롬프트',
    version: 'v1.4',
    promptText: '수신자인 <span class="variable">[recipient]</span>에게 <span class="variable">[offer]</span>를 제안하는 콜드 이메일을 작성해.\n제목은 <span class="variable">[curiosity_element]</span>를 담아 무조건 열어보게 만들고, 본문은 "나의 소개 -> 상대의 칭찬/공감 -> 가치 제안 -> 부담 없는 CTA" 구조로 작성해.',
    variables: [
      { id: '[recipient]', label: '수신자 (예: 중소기업 마케팅 팀장)' },
      { id: '[offer]', label: '제안 내용 (예: 첫 달 무료 SEO 컨설팅)' },
      { id: '[curiosity_element]', label: '궁금증 요소 (예: 경쟁사 A가 트래픽을 독식하는 이유)' }
    ],
    exampleParams: '중소기업 마케팅 팀장 / 1개월 무료 SEO 진단 / 경쟁사 A가 검색 1위를 차지한 이유',
    exampleOutput: '"제목: 팀장님, 경쟁사 A가 유독 검색 유입이 많은 이유를 아시나요?\n본문: 안녕하세요. 최근 팀장님 회사의 훌륭한 프로모션을 인상 깊게 본..."'
  },
  {
    filename: 'prompt-seo.html',
    category1: '트래픽 & SEO 최적화',
    category2: '상위노출 랭킹 알고리즘 맞춤',
    title: '검색 엔진(SEO) 알고리즘 최적화 프롬프트',
    version: 'v3.0',
    promptText: '내가 작성한 원고를 <span class="variable">[search_engine]</span>의 최신 상위노출 알고리즘에 맞게 교정해.\n원고에 <span class="variable">[focus_keyword]</span>가 자연스럽게 배치되도록 수정하고, 체류시간을 늘리기 위해 글 중간에 <span class="variable">[engagement_element]</span>를 2개 이상 추가해 줘.',
    variables: [
      { id: '[search_engine]', label: '검색 엔진 (예: 네이버 스마트블록, 구글 SEO)' },
      { id: '[focus_keyword]', label: '메인 타겟 키워드 (예: 제주도 가성비 숙소)' },
      { id: '[engagement_element]', label: '체류시간 유도 요소 (예: 체크리스트, 비교 요약 표)' }
    ],
    exampleParams: '네이버 스마트블록 / 20대 제주도 뚜벅이 여행 코스 / 꿀팁 체크리스트',
    exampleOutput: '"[수정된 원고]\n(서론 생략)\n✅ 뚜벅이 여행자를 위한 필수 체크리스트\n- 짐 보관 서비스 예약 유무\n- 버스 배차 간격(보통 1시간) 확인..."'
  }
];

// First, generate the new HTML files using the base template
pages.forEach(page => {
  let html = baseHtml;
  
  // Breadcrumb
  html = html.replace(/<span>콘텐츠 기획 & 제작<\/span>/, `<span>${page.category1}</span>`);
  html = html.replace(/<span class="current">수익형 블로그 구조화<\/span>/, `<span class="current">${page.category2}</span>`);
  
  // Header
  html = html.replace(/수익형 블로그 포스팅 완벽 구조화 프롬프트/, page.title);
  html = html.replace(/<span class="badge">v2\.1<\/span>/, `<span class="badge">${page.version}</span>`);
  
  // Prompt text
  const escapeRegex = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  
  const oldPromptHtml = `<div class="prompt-text">너는 월 1천만 원 이상의 수익을 내는 탑티어 블로그 콘텐츠 기획자이자 마케터야.

지금부터 내가 제시하는 [메인 키워드]와 [타겟 독자]를 바탕으로, 체류시간을 극대화하고 구매(또는 클릭) 전환율을 높일 수 있는 블로그 포스팅 구조(목차 및 핵심 내용)를 기획해 줘.

[입력 조건]
- 메인 키워드: <span class="variable">[keyword]</span>
- 타겟 독자 (페인포인트): <span class="variable">[target_audience]</span>
- 수익화 목적: <span class="variable">[monetization_goal]</span>

[출력 양식]
1. 후킹 서론 (도입부 3문장): 독자의 페인포인트를 자극하고 공감을 이끌어내는 문구
2. 본론 1 (문제 심화): 왜 이 문제를 지금 당장 해결해야 하는지 (위협 소구)
3. 본론 2 (해결책 제시): <span class="variable">[keyword]</span>가 어떻게 유일한 대안이 되는지 (정보성)
4. 본론 3 (신뢰성 부여): 실제 사례, 수치, 또는 기대 효과 (비교 표 포함)
5. 결론 및 CTA: <span class="variable">[monetization_goal]</span>을 위한 강력한 행동 유도 멘트

단, 너무 기계적이거나 뻔한 소제목("최종 결론 및 액션 플랜" 등)은 피하고, 사람들의 클릭을 유도할 수 있는 매력적인 카피라이팅으로 소제목을 작성해.</div>`;

  let formattedPromptText = page.promptText.replace(/\\n/g, '<br>');
  page.variables.forEach(v => {
    formattedPromptText = formattedPromptText.replace(new RegExp(escapeRegex(v.id), 'g'), `<span class="variable">${v.id}</span>`);
  });
  
  html = html.replace(oldPromptHtml, `<div class="prompt-text">${formattedPromptText}</div>`);
  
  // Variables block
  let varHtml = '';
  page.variables.forEach(v => {
    varHtml += `
                        <div class="var-group">
                            <label>${v.id} - ${v.label.split(' (')[0]}</label>
                            <input type="text" class="var-input" placeholder="${v.label.split(' (')[1].replace(')','')}">
                        </div>`;
  });
  
  const oldVarHtmlRegex = /<div class="var-group">[\s\S]*?<\/div>[\s\S]*?<div class="var-group">[\s\S]*?<\/div>[\s\S]*?<div class="var-group">[\s\S]*?<\/div>/;
  html = html.replace(oldVarHtmlRegex, varHtml);
  
  // Examples
  html = html.replace(/입력 변수: 직장인 부업 \/ 퇴근 후 2시간 \/ 전자책 판매/, `입력 변수: ${page.exampleParams}`);
  
  const oldExampleHtml = `<strong>1. 후킹 서론:</strong><br>
                                "월급날은 어제였는데, 통장 잔고는 왜 벌써 바닥을 보일까요? 매일 야근에 시달리지만 내 집 마련은커녕 전세금 올리기도 벅찬 것이 30대 직장인의 현실입니다. 하지만 퇴근 후 넷플릭스를 보는 2시간만 바꾸면, 매월 100만 원의 파이프라인이 꽂히는 비밀이 있습니다."<br><br>
                                <strong>2. 본론 1:</strong><br>
                                "자본금 0원, 실패 리스크 0%인 무자본 지식 창업의 현실..."`;
                                
  html = html.replace(oldExampleHtml, page.exampleOutput.replace(/\\n/g, '<br>'));
  
  fs.writeFileSync(path.join(dir, page.filename), html);
});

// Now, update sidebar across all 11 files
const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const sidebarTemplate = `                    <div class="nav-sub">
                        <details id="cat-base">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-cube"></i> 프롬프트 기본 상식</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="prompt-persona.html" class="nav-link-sub-sub" id="link-persona">마스터 페르소나 부여</a>
                                <a href="prompt-format.html" class="nav-link-sub-sub" id="link-format">출력 포맷 및 룰셋</a>
                                <a href="prompt-hallucination.html" class="nav-link-sub-sub" id="link-hallucination">할루시네이션(환각) 억제</a>
                            </div>
                        </details>

                        <details id="cat-content">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-pen-nib"></i> 콘텐츠 기획 & 제작</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="prompt-detail.html" class="nav-link-sub-sub" id="link-detail">수익형 블로그 구조화</a>
                                <a href="prompt-shorts.html" class="nav-link-sub-sub" id="link-shorts">바이럴 쇼츠/릴스 대본</a>
                                <a href="prompt-hook.html" class="nav-link-sub-sub" id="link-hook">시선을 끄는 후킹 카피</a>
                            </div>
                        </details>
                        
                        <details id="cat-affiliate">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-currency-circle-dollar"></i> 제휴 마케팅 셀링</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="prompt-review.html" class="nav-link-sub-sub" id="link-review">구매 유도 상품 리뷰</a>
                                <a href="prompt-painpoint.html" class="nav-link-sub-sub" id="link-painpoint">타겟 페인포인트(Pain Point) 분석</a>
                                <a href="prompt-email.html" class="nav-link-sub-sub" id="link-email">설득형 이메일 세일즈</a>
                            </div>
                        </details>

                        <details id="cat-seo">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-trend-up"></i> 트래픽 & SEO 최적화</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="prompt-keyword.html" class="nav-link-sub-sub" id="link-keyword">롱테일 키워드 대량 발굴</a>
                                <a href="prompt-seo.html" class="nav-link-sub-sub" id="link-seo">상위노출 랭킹 알고리즘 맞춤</a>
                            </div>
                        </details>
                    </div>`;

const catMap = {
  'prompt-persona.html': { cat: 'cat-base', link: 'link-persona' },
  'prompt-format.html': { cat: 'cat-base', link: 'link-format' },
  'prompt-hallucination.html': { cat: 'cat-base', link: 'link-hallucination' },
  'prompt-detail.html': { cat: 'cat-content', link: 'link-detail' },
  'prompt-shorts.html': { cat: 'cat-content', link: 'link-shorts' },
  'prompt-hook.html': { cat: 'cat-content', link: 'link-hook' },
  'prompt-review.html': { cat: 'cat-affiliate', link: 'link-review' },
  'prompt-painpoint.html': { cat: 'cat-affiliate', link: 'link-painpoint' },
  'prompt-email.html': { cat: 'cat-affiliate', link: 'link-email' },
  'prompt-keyword.html': { cat: 'cat-seo', link: 'link-keyword' },
  'prompt-seo.html': { cat: 'cat-seo', link: 'link-seo' },
  'index.html': null
};

allFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Use a generic regex to match the <div class="nav-sub"> section until the end of AI Prompt details
  const navSubRegex = /<div class="nav-sub">[\s\S]*?<\/div>\s*<\/details>\s*<\/li>\s*<li class="nav-item">\s*<details>/;
  
  let customizedSidebar = sidebarTemplate;
  
  const mapping = catMap[file];
  if (mapping) {
    customizedSidebar = customizedSidebar.replace(new RegExp('<details id="' + mapping.cat + '">'), '<details id="' + mapping.cat + '" open>');
    customizedSidebar = customizedSidebar.replace(new RegExp('id="' + mapping.link + '"'), 'id="' + mapping.link + '" class="nav-link-sub-sub active"');
  }
  
  // Remove IDs and clean up
  customizedSidebar = customizedSidebar.replace(/id="cat-[a-z]+" /g, '');
  customizedSidebar = customizedSidebar.replace(/id="cat-[a-z]+"/g, '');
  customizedSidebar = customizedSidebar.replace(/id="link-[a-z]+"/g, '');
  customizedSidebar = customizedSidebar.replace(/class="nav-link-sub-sub" class="nav-link-sub-sub active"/g, 'class="nav-link-sub-sub active"');
  
  content = content.replace(navSubRegex, customizedSidebar + '\\n                </details>\\n            </li>\\n            \\n            <li class="nav-item">\\n                <details>');
  
  fs.writeFileSync(filePath, content);
});

console.log('Successfully generated remaining pages and fixed active states.');

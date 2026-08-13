const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const baseHtmlPath = path.join(dir, 'prompt-detail.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const pages = [
  {
    filename: 'prompt-fewshot.html',
    category1: '프롬프트 기본 상식',
    category2: 'Few-Shot 러닝 (예시 기반)',
    title: '고품질 아웃풋을 위한 Few-Shot 예시 프롬프트',
    version: 'v1.5',
    promptText: '다음 <span class="variable">[task_description]</span>을 수행해 줘. 내가 원하는 결과물의 형태와 수준은 아래 예시들과 같아.\n\n예시 1:\n<span class="variable">[example_1]</span>\n\n예시 2:\n<span class="variable">[example_2]</span>\n\n이제 위 예시들의 패턴과 톤앤매너를 분석해서 새로운 결과물을 도출해 줘.',
    variables: [
      { id: '[task_description]', label: '수행할 작업 (예: 블로그 포스팅 제목 짓기)' },
      { id: '[example_1]', label: '긍정적인 예시 1 (예: "퇴사 후 월 100만 원 만든 현실적인 방법")' },
      { id: '[example_2]', label: '긍정적인 예시 2 (예: "30대 직장인이 무조건 해야 할 파이프라인 구축법")' }
    ],
    exampleParams: '블로그 포스팅 제목 짓기 / 퇴사 후 월 100만 원 만든 현실적인 방법 / 30대 직장인이 무조건 해야 할 파이프라인 구축법',
    exampleOutput: '"새로운 결과물 제안: \\n1. 월급쟁이 탈출을 위한 하루 2시간 사이드 프로젝트\\n2. 직장인 투잡, 리스크 0원으로 시작하는 노하우"'
  },
  {
    filename: 'prompt-cot.html',
    category1: '프롬프트 기본 상식',
    category2: '단계별 추론 (CoT)',
    title: '복잡한 문제 해결을 위한 단계별 추론 프롬프트',
    version: 'v2.1',
    promptText: '다음 복잡한 문제 <span class="variable">[complex_problem]</span>을 해결해 줘.\n단, 곧바로 결론을 내리지 말고, 반드시 <span class="variable">[step_guideline]</span> 단계에 따라 논리적으로 천천히 생각하며(Think step by step) 과정을 서술한 뒤 최종 결론을 도출해 줘.',
    variables: [
      { id: '[complex_problem]', label: '복잡한 문제 (예: 월 300만 원 수익화를 위한 6개월 로드맵 짜기)' },
      { id: '[step_guideline]', label: '추론 단계 (예: 현황 분석 -> 목표 분할 -> 주차별 액션 -> 피드백 구조)' }
    ],
    exampleParams: '월 300만 원 수익화를 위한 6개월 로드맵 짜기 / 현황 분석 -> 목표 분할 -> 주차별 액션',
    exampleOutput: '"[단계 1: 현황 분석] 현재 자본금과 가용 시간을 고려할 때...\\n[단계 2: 목표 분할] 1~2개월 차에는 트래픽 확보에 집중...\\n[결론] 따라서 가장 최적의 로드맵은..."'
  },
  {
    filename: 'prompt-simulation.html',
    category1: '프롬프트 기본 상식',
    category2: '역할극 및 시뮬레이션',
    title: '실전 대화 및 롤플레잉 시뮬레이션 프롬프트',
    version: 'v1.0',
    promptText: '지금부터 우리는 <span class="variable">[scenario]</span> 상황에서 역할극을 할 거야.\n나는 <span class="variable">[user_role]</span> 역할을 맡을 테니, 너는 <span class="variable">[ai_role]</span> 역할을 완벽하게 연기해 줘.\n\n절대 내 대사를 미리 쓰지 말고 한 번에 하나의 대사만 출력하며, 내 반응을 기다린 후 대화를 이어가.',
    variables: [
      { id: '[scenario]', label: '상황 (예: 고가의 B2B 솔루션 영업 미팅)' },
      { id: '[user_role]', label: '나의 역할 (예: 솔루션을 판매하려는 세일즈맨)' },
      { id: '[ai_role]', label: 'AI의 역할 (예: 예산이 부족해 회의적인 중소기업 대표)' }
    ],
    exampleParams: 'B2B 솔루션 영업 미팅 / 솔루션을 판매하려는 세일즈맨 / 회의적인 중소기업 대표',
    exampleOutput: '"(AI 중소기업 대표): 솔루션이 좋은 건 알겠는데, 저희 같은 작은 회사에서는 솔직히 그 비용을 감당하기가 쉽지 않네요. 꼭 지금 도입해야 할 이유가 있을까요?"'
  },
  {
    filename: 'prompt-selfrefine.html',
    category1: '프롬프트 기본 상식',
    category2: '프롬프트 자가 개선',
    title: 'AI 스스로 결과물을 피드백하고 개선하는 프롬프트',
    version: 'v3.0',
    promptText: '아래 제공된 초안 <span class="variable">[initial_draft]</span>를 전문가의 시선으로 검토해 줘.\n<span class="variable">[evaluation_criteria]</span> 기준에 따라 스스로 비판적인 피드백을 3가지 이상 작성한 뒤, 그 피드백을 적극 반영하여 완벽하게 수정된 최종 완성본을 다시 작성해 줘.',
    variables: [
      { id: '[initial_draft]', label: '초안 (예: 어제 작성한 인스타그램 피드 텍스트)' },
      { id: '[evaluation_criteria]', label: '평가 기준 (예: 20대 여성의 공감 유발, 후킹 멘트 부족 여부)' }
    ],
    exampleParams: '어제 작성한 다이어트 보조제 피드 글 / 20대 여성 공감 유발 및 후킹 여부',
    exampleOutput: '"[자체 피드백] 1. 서론이 너무 깁니다. 2. 공감대보다는 상품 설명이 치중되어 있습니다.\\n\\n[최종 완성본] 저녁마다 배달앱 켜는 분들? 오늘부터 이 습관 하나만 바꾸세요..."'
  },
  {
    filename: 'prompt-negative.html',
    category1: '프롬프트 기본 상식',
    category2: '부정 프롬프트 (제어)',
    title: '절대 하면 안 되는 금지어/행동 제어 프롬프트',
    version: 'v1.8',
    promptText: '<span class="variable">[task]</span> 작업을 수행하되, 다음 사항을 절대적으로 금지한다.\n\n1. 금지어: <span class="variable">[banned_words]</span>\n2. 금지된 행동/스타일: <span class="variable">[banned_behaviors]</span>\n\n만약 위 사항을 하나라도 어길 경우 실패한 결과물이니 문맥을 해치더라도 반드시 피해서 작성해.',
    variables: [
      { id: '[task]', label: '수행할 작업 (예: 우울증 관련 정보성 포스팅)' },
      { id: '[banned_words]', label: '금지어 (예: 극복합시다, 파이팅, 무조건 나아집니다)' },
      { id: '[banned_behaviors]', label: '금지된 행동 (예: 의학적 진단을 내리거나 과도한 긍정을 강요하는 것)' }
    ],
    exampleParams: '번아웃 관련 정보 포스팅 / 파이팅, 힘내세요 / 과도한 긍정 강요',
    exampleOutput: '"요즘 아무것도 하기 싫고 무기력하신가요? 번아웃은 누구에게나 찾아올 수 있는 자연스러운 감정의 고갈 상태입니다. 무리해서 일어서려 하기보다 잠시 멈추는 법을 알아보겠습니다..."'
  }
];

// Generate the 5 new HTML files
pages.forEach(page => {
  let html = baseHtml;
  
  html = html.replace(/<span>콘텐츠 기획 & 제작<\/span>/, `<span>${page.category1}</span>`);
  html = html.replace(/<span class="current">수익형 블로그 구조화<\/span>/, `<span class="current">${page.category2}</span>`);
  html = html.replace(/수익형 블로그 포스팅 완벽 구조화 프롬프트/, page.title);
  html = html.replace(/<span class="badge">v2\.1<\/span>/, `<span class="badge">${page.version}</span>`);
  
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
  html = html.replace(oldPromptHtml, `<div class="prompt-text">${formattedPromptText}</div>`);
  
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
  
  html = html.replace(/입력 변수: 직장인 부업 \/ 퇴근 후 2시간 \/ 전자책 판매/, `입력 변수: ${page.exampleParams}`);
  
  const oldExampleHtml = `<strong>1. 후킹 서론:</strong><br>
                                "월급날은 어제였는데, 통장 잔고는 왜 벌써 바닥을 보일까요? 매일 야근에 시달리지만 내 집 마련은커녕 전세금 올리기도 벅찬 것이 30대 직장인의 현실입니다. 하지만 퇴근 후 넷플릭스를 보는 2시간만 바꾸면, 매월 100만 원의 파이프라인이 꽂히는 비밀이 있습니다."<br><br>
                                <strong>2. 본론 1:</strong><br>
                                "자본금 0원, 실패 리스크 0%인 무자본 지식 창업의 현실..."`;
                                
  html = html.replace(oldExampleHtml, page.exampleOutput.replace(/\\n/g, '<br>'));
  
  fs.writeFileSync(path.join(dir, page.filename), html);
});

// Sidebar template with expanded base section
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
                                <a href="prompt-fewshot.html" class="nav-link-sub-sub" id="link-fewshot">Few-Shot 러닝 (예시 기반)</a>
                                <a href="prompt-cot.html" class="nav-link-sub-sub" id="link-cot">단계별 추론 (CoT)</a>
                                <a href="prompt-simulation.html" class="nav-link-sub-sub" id="link-simulation">역할극 및 시뮬레이션</a>
                                <a href="prompt-selfrefine.html" class="nav-link-sub-sub" id="link-selfrefine">프롬프트 자가 개선</a>
                                <a href="prompt-negative.html" class="nav-link-sub-sub" id="link-negative">부정 프롬프트 (제어)</a>
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
  'prompt-fewshot.html': { cat: 'cat-base', link: 'link-fewshot' },
  'prompt-cot.html': { cat: 'cat-base', link: 'link-cot' },
  'prompt-simulation.html': { cat: 'cat-base', link: 'link-simulation' },
  'prompt-selfrefine.html': { cat: 'cat-base', link: 'link-selfrefine' },
  'prompt-negative.html': { cat: 'cat-base', link: 'link-negative' },
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

const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

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
  
  // Clean up
  customizedSidebar = customizedSidebar.replace(/id="cat-[a-z]+" /g, '');
  customizedSidebar = customizedSidebar.replace(/id="cat-[a-z]+"/g, '');
  customizedSidebar = customizedSidebar.replace(/id="link-[a-z]+"/g, '');
  customizedSidebar = customizedSidebar.replace(/class="nav-link-sub-sub"\s*class="nav-link-sub-sub active"/g, 'class="nav-link-sub-sub active"');
  
  content = content.replace(navSubRegex, customizedSidebar + '\\n                </details>\\n            </li>\\n            \\n            <li class="nav-item">\\n                <details>');
  
  fs.writeFileSync(filePath, content);
});

console.log('Successfully added 5 more base prompts and updated 15 files.');

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const baseHtmlPath = path.join(dir, 'prompt-detail.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const pages = [
  {
    filename: 'prompt-adtitle.html',
    category1: '콘텐츠 기획 & 제작',
    category2: '클릭 터지는 광고 카피라이팅',
    title: '클릭율(CTR) 폭발하는 5가지 앵글의 광고 제목 프롬프트',
    version: 'v1.5',
    promptText: '너는 메타(페이스북/인스타)와 구글에서 수억 원의 퍼포먼스 마케팅 예산을 집행하며 압도적인 클릭율(CTR)을 달성해 온 탑티어 퍼포먼스 마케터야.\\n\\n지금 내가 판매하려는 제품/서비스의 광고 제목(Headline) 10개를 작성해 줘.\\n\\n[입력 정보]\\n- 상품/서비스명: <span class="variable">[product_name]</span>\\n- 타겟 독자: <span class="variable">[target_audience]</span>\\n- 핵심 소구점(USP): <span class="variable">[usp]</span>\\n\\n[출력 조건]\\n반드시 아래 5가지 심리학적 앵글(Angle)을 적용하여 앵글당 2개씩 총 10개를 뽑아줘.\\n1. 결핍 소구: <span class="variable">[target_audience]</span>가 현재 겪고 있는 고통과 결핍을 건드려 불안감을 조성할 것\\n2. 직관적 이득: 이것을 썼을 때 얻게 되는 가장 확실한 이득(<span class="variable">[usp]</span>)을 구체적인 숫자로 표현할 것\\n3. 대조 효과: 기존 방식의 문제점을 짚고 새로운 대안임을 강조할 것\\n4. 타겟 한정: 특정 대상만 부르는 듯한 뉘앙스를 주어 "내 얘기네?"라고 느끼게 할 것\\n5. 호기심 자극: 클릭하지 않고는 못 배기게 만드는 의외성의 조합을 사용할 것\\n\\n카피는 SNS 스폰서드 광고 또는 검색광고 제목으로 쓰일 예정이니, 너무 길지 않게 직관적이고 자극적으로 작성해.',
    variables: [
      { id: '[product_name]', label: '상품/서비스명 (예: AI 원데이 클래스)' },
      { id: '[target_audience]', label: '타겟 독자 (예: 퇴근 후 투잡을 찾는 직장인)' },
      { id: '[usp]', label: '핵심 소구점 (예: 코딩 몰라도 3시간 만에 자동화 블로그 세팅)' }
    ],
    exampleParams: 'AI 원데이 클래스 / 퇴근 후 투잡을 찾는 직장인 / 코딩 몰라도 3시간 만에 자동화 블로그 세팅',
    exampleOutput: '<strong>[앵글 1: 결핍 소구]</strong><br>- "야근하고 월급 300만 원, 언제까지 남의 배만 불려주실 건가요?"<br>- "이번 달도 카드값 걱정? 퇴근 후 2시간을 버린 당신의 진짜 손실액"<br><br><strong>[앵글 2: 직관적 이득]</strong><br>- "단 3시간 만에 완성되는 나만의 월 100만 원 수익 파이프라인"<br>- "코딩 지식 0%라도 가능! AI가 대신 일하는 자동화 블로그의 비밀"<br><br><strong>[앵글 3: 대조 효과]</strong><br>- "아직도 손가락 아프게 직접 타이핑하세요? AI로 대체하면 10배 빠릅니다"<br>- "재고 쌓아두는 쇼핑몰 말고, 무자본으로 시작하는 확실한 부업"'
  }
];

// Generate the new file
pages.forEach(page => {
  let html = baseHtml;
  html = html.replace(/<span class="current">.*?<\/span>/, `<span class="current">${page.category2}</span>`);
  html = html.replace(/<h1 class="detail-title">[\s\S]*?<\/h1>/, `<h1 class="detail-title">\n                        ${page.title}\n                        <span class="badge">${page.version}</span>\n                    </h1>`);
  
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
  
  const oldVarHtmlRegex = /<div class="var-group">[\s\S]*?<\/div>\s*<div class="var-group">[\s\S]*?<\/div>\s*<div class="var-group">[\s\S]*?<\/div>/;
  html = html.replace(oldVarHtmlRegex, varHtml);
  
  html = html.replace(/입력 변수: 직장인 부업 \/ 퇴근 후 2시간 \/ 전자책 판매/, `입력 변수: ${page.exampleParams}`);
  
  const oldExampleHtml = `<strong>1. 후킹 서론:</strong><br>
                                "월급날은 어제였는데, 통장 잔고는 왜 벌써 바닥을 보일까요? 매일 야근에 시달리지만 내 집 마련은커녕 전세금 올리기도 벅찬 것이 30대 직장인의 현실입니다. 하지만 퇴근 후 넷플릭스를 보는 2시간만 바꾸면, 매월 100만 원의 파이프라인이 꽂히는 비밀이 있습니다."<br><br>
                                <strong>2. 본론 1:</strong><br>
                                "자본금 0원, 실패 리스크 0%인 무자본 지식 창업의 현실..."`;
                                
  html = html.replace(oldExampleHtml, page.exampleOutput);
  
  // Save the new ad title file
  fs.writeFileSync(path.join(dir, page.filename), html);
});

// Update the sidebar navigation across all files
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
                                <a href="prompt-reverse.html" class="nav-link-sub-sub" id="link-reverse">역추론 (리버스 엔지니어링)</a>
                                <a href="prompt-audit.html" class="nav-link-sub-sub" id="link-audit">감시 프롬프트 (품질 QA)</a>
                                <a href="prompt-mindset.html" class="nav-link-sub-sub" id="link-mindset">프롬프트 사고회로</a>
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
                                <a href="prompt-adtitle.html" class="nav-link-sub-sub" id="link-adtitle">광고 카피라이팅</a>
                            </div>
                        </details>
                        
                        <details id="cat-affiliate">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-currency-circle-dollar"></i> 제휴 마케팅 셀링</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="prompt-review.html" class="nav-link-sub-sub" id="link-review">구매 유도 상품 리뷰</a>
                                <a href="prompt-painpoint.html" class="nav-link-sub-sub" id="link-painpoint">타겟 페인포인트 분석</a>
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
  'prompt-reverse.html': { cat: 'cat-base', link: 'link-reverse' },
  'prompt-audit.html': { cat: 'cat-base', link: 'link-audit' },
  'prompt-mindset.html': { cat: 'cat-base', link: 'link-mindset' },
  'prompt-detail.html': { cat: 'cat-content', link: 'link-detail' },
  'prompt-shorts.html': { cat: 'cat-content', link: 'link-shorts' },
  'prompt-hook.html': { cat: 'cat-content', link: 'link-hook' },
  'prompt-adtitle.html': { cat: 'cat-content', link: 'link-adtitle' },
  'prompt-review.html': { cat: 'cat-affiliate', link: 'link-review' },
  'prompt-painpoint.html': { cat: 'cat-affiliate', link: 'link-painpoint' },
  'prompt-email.html': { cat: 'cat-affiliate', link: 'link-email' },
  'prompt-keyword.html': { cat: 'cat-seo', link: 'link-keyword' },
  'prompt-seo.html': { cat: 'cat-seo', link: 'link-seo' },
  'index.html': null
};

let successCount = 0;
const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const searchStr = '<i class="ph ph-chat-text nav-icon"></i> AI Prompt';
  const startIdx = content.indexOf(searchStr);
  if (startIdx === -1) return;
  
  const divNavSubStart = content.indexOf('<div class="nav-sub">', startIdx);
  if (divNavSubStart === -1) return;
  
  const aiPlatformStr = '<i class="ph ph-robot nav-icon"></i> AI Platform';
  const platformIdx = content.indexOf(aiPlatformStr, divNavSubStart);
  if (platformIdx === -1) return;
  
  const liIdx = content.lastIndexOf('<li class="nav-item">', platformIdx);
  const endDetailsIdx = content.lastIndexOf('</details>', liIdx);
  
  let customizedSidebar = sidebarTemplate;
  const mapping = catMap[file];
  if (mapping) {
    customizedSidebar = customizedSidebar.replace(new RegExp('<details id="' + mapping.cat + '">'), '<details id="' + mapping.cat + '" open>');
    customizedSidebar = customizedSidebar.replace(new RegExp('class="nav-link-sub-sub" id="' + mapping.link + '"'), 'class="nav-link-sub-sub active"');
  }
  
  customizedSidebar = customizedSidebar.replace(/id="cat-[a-z]+"/g, '');
  customizedSidebar = customizedSidebar.replace(/id="link-[a-z]+"/g, '');
  
  const pre = content.slice(0, divNavSubStart);
  const post = content.slice(endDetailsIdx);
  
  content = pre + customizedSidebar + '\n                    ' + post;
  fs.writeFileSync(filePath, content);
  successCount++;
});

console.log('Successfully added ad title prompt. Updated ' + successCount + ' files.');

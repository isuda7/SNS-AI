const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const baseHtmlPath = path.join(dir, 'prompt-detail.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const pages = [
  {
    filename: 'prompt-reverse.html',
    category1: '프롬프트 기본 상식',
    category2: '역추론 (리버스 엔지니어링)',
    title: '성공 사례에서 완벽한 템플릿을 역추적하는 프롬프트',
    version: 'v1.0',
    promptText: '내가 아래에 제공하는 성공적인 예시 데이터 <span class="variable">[reference_content]</span>를 심층 분석해 줘.\n\n이 데이터가 어떤 구조, 어조, 논리적 전개를 가지고 있는지 파악한 후, 앞으로 이와 똑같은 퀄리티의 아웃풋을 자동으로 만들어낼 수 있는 <span class="variable">[target_goal]</span> 목적의 \'완벽한 프롬프트 템플릿\'을 역으로 작성해서 내게 제시해.',
    variables: [
      { id: '[reference_content]', label: '레퍼런스 원본 (예: 경쟁사의 100만 뷰 블로그 원고 내용)' },
      { id: '[target_goal]', label: '역추적 목표 (예: 유사한 스타일의 포스팅 템플릿화)' }
    ],
    exampleParams: '경쟁사의 100만 뷰 터진 블로그 원고 전체 텍스트 / 우리 브랜드에 맞춘 유사 스타일의 포스팅 자동화',
    exampleOutput: '"분석 결과, 해당 원고는 [위협 소구 -> 전문가적 해결책 -> 소셜 프루프] 구조를 따릅니다. 이를 복제하기 위한 프롬프트 템플릿은 다음과 같습니다..."'
  },
  {
    filename: 'prompt-audit.html',
    category1: '프롬프트 기본 상식',
    category2: '감시 프롬프트 (품질 QA)',
    title: '결과물 퀄리티를 100점 만점으로 검수하는 감시자 프롬프트',
    version: 'v2.5',
    promptText: '너는 이제부터 최고 수준의 <span class="variable">[ai_role]</span>이자 매우 엄격한 감시자(QA)야.\n\n내가 제시하는 결과물을 읽고, 아래의 [감시 기준] <span class="variable">[audit_criteria]</span>을 완벽히 통과했는지 100점 만점으로 채점해.\n만약 기준 미달이라면 구체적으로 어디가 부족한지 지적하고 즉시 수정할 대안을 강제로 지시해.',
    variables: [
      { id: '[ai_role]', label: '감시자 역할 (예: 네이버 SEO 최적화 품질 검수 책임자)' },
      { id: '[audit_criteria]', label: '감시 기준 (예: 1. 1,500자 이상 2. 이모티콘 사용 금지)' }
    ],
    exampleParams: '네이버/구글 검색엔진 최적화 품질 검수자 / 1. 분량 1,500자 검수 2. 기계적인 어투 금지 3. 후킹 서론 포함 여부',
    exampleOutput: '"총점: 65점 / 감시 결과 요약: 수정 요망\\n피드백: 서론에서 페인포인트 자극이 부족하며 기계적인 어조("안녕하세요, 오늘은~")가 발견되었습니다. 서론을 다음과 같이 수정하세요..."'
  }
];

// Generate 2 new files
pages.forEach(page => {
  let html = baseHtml;
  html = html.replace(/<span>콘텐츠 기획 & 제작<\/span>/, `<span>${page.category1}</span>`);
  html = html.replace(/<span class="current">수익형 블로그 구조화<\/span>/, `<span class="current">${page.category2}</span>`);
  html = html.replace(/수익형 블로그 포스팅 완벽 구조화 프롬프트/, page.title);
  html = html.replace(/<span class="badge">v2\.1<\/span>/, `<span class="badge">${page.version}</span>`);
  
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

// Now update all sidebars
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
  
  content = pre + customizedSidebar + '\\n                    ' + post;
  fs.writeFileSync(filePath, content);
  successCount++;
});
console.log('Successfully added reverse & audit prompts. Updated ' + successCount + ' files.');

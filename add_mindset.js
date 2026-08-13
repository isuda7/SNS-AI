const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const baseHtmlPath = path.join(dir, 'prompt-detail.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const pages = [
  {
    filename: 'prompt-mindset.html',
    category1: '프롬프트 기본 상식',
    category2: '프롬프트 사고회로',
    title: 'AI를 단순 외주가 아닌 파트너로 만드는 사고회로 프롬프트',
    version: 'v4.0',
    promptText: '나는 지금 <span class="variable">[core_objective]</span>를 달성하기 위해 고민 중이야. 하지만 현재 <span class="variable">[my_bottleneck]</span> 때문에 막혀 있어.\\n\\n나를 대신해서 결과물을 그냥 띡 완성해 주지 마. 나는 너를 외주 직원이 아니라 내 사고를 확장시켜 줄 파트너로 쓰고 싶어.\\n대신, 내가 스스로 이 문제를 돌파할 수 있도록 [1. 문제의 본질 정의 -> 2. 돌파구 아이디에이션 -> 3. 논리적 뼈대 구축 -> 4. 실행 디테일] 순서로 내 \'사고회로\'를 자극하고 이끌어주는 구체적인 역질문과 방향성 가이드만 제시해 줘.',
    variables: [
      { id: '[core_objective]', label: '핵심 목표 (예: 수익형 블로그 월 100만 원 달성)' },
      { id: '[my_bottleneck]', label: '나의 병목/막막한 점 (예: 글쓰기 경험이 전혀 없고 소재를 못 찾겠음)' }
    ],
    exampleParams: '수익형 블로그 월 100만 원 달성 / 글쓰기 경험이 전혀 없고 소재를 못 찾겠음',
    exampleOutput: '"[1단계: 문제 본질 정의] 글쓰기가 막막한 이유는 처음부터 \'잘 팔리는 글\'을 쓰려 하기 때문일 수 있습니다. 혹시 본인이 살면서 가장 깊게 파고들었던 취미나, 남들보다 조금 더 잘 아는 아주 사소한 잡지식이 있나요? 그게 무엇인지 저에게 먼저 3가지만 말씀해 주세요.\\n\\n[가이드] 3가지를 말씀해 주시면, 제가 그것을 돈이 되는 키워드로 연결하는 방법을 질문으로 다시 던져드리겠습니다."'
  }
];

// Generate 1 new file
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

// Sidebar update
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
  
  // Use actual newline characters this time!
  content = pre + customizedSidebar + '\n                    ' + post;
  fs.writeFileSync(filePath, content);
  successCount++;
});
console.log('Successfully added mindset prompt. Updated ' + successCount + ' files.');

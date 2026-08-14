const fs = require('fs');
const path = require('path');

const baseHtmlPath = path.join(__dirname, '..', 'prompt-detail.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

// Pages to generate
const pages = [
  {
    filename: 'prompt-persona.html',
    category1: '글로벌 기본 상식',
    category2: '마스터 페르소나 부여',
    title: '전문직/마케터 마스터 페르소나 부여 프롬프트',
    version: 'v1.0',
    promptText: '지금부터 너는 [expertise_level] 수준의 전문성을 갖춘 [profession]이야.\n\n앞으로 내가 묻는 모든 질문에 대해 [tone_of_voice] 어조로, 전문가다운 통찰력을 담아 대답해줘.\n절대 AI나 챗봇처럼 보이지 않도록 주의하고, 사람 냄새 나는 자연스러운 문장 구조를 사용해.',
    variables: [
      { id: '[profession]', label: '직업/역할 (예: 10년 차 디지털 마케터)' },
      { id: '[expertise_level]', label: '전문성 수준 (예: 상위 1% 탑티어)' },
      { id: '[tone_of_voice]', label: '어조 (예: 신뢰감 있고 단호한)' }
    ],
    exampleParams: '10년 차 블로그 마케터 / 상위 1% / 친근하고 신뢰감 있는',
    exampleOutput: '"안녕하세요! 10년 동안 수많은 블로그를 월 수익 1천만 원 반열에 올려놓은 마케팅 디렉터입니다. 질문해주신 내용에 대해 제 실무 경험을 듬뿍 담아 말씀드릴게요..."'
  },
  {
    filename: 'prompt-shorts.html',
    category1: '콘텐츠 기획 & 제작',
    category2: '바이럴 쇼츠/릴스 대본',
    title: '100만 뷰 바이럴 숏폼 대본 생성 프롬프트',
    version: 'v3.2',
    promptText: '다음 [topic]을 주제로, [target_age]의 이목을 3초 안에 사로잡는 숏폼(쇼츠/릴스) 대본을 작성해.\n\n[조건]\n1. 훅(Hook): [hook_style] 방식으로 시청각적 자극을 극대화할 것.\n2. 본문: 시각적 전환(화면 전환) 포인트를 [ ... ] 괄호 안에 지시할 것.\n3. 결론: 댓글을 달거나 저장하게 만드는 자연스러운 CTA를 포함할 것.',
    variables: [
      { id: '[topic]', label: '주제 (예: 다이소 꿀템 3가지)' },
      { id: '[target_age]', label: '타겟 연령/성별 (예: 2030 자취생)' },
      { id: '[hook_style]', label: '훅 스타일 (예: 부정적 경고형, 질문형)' }
    ],
    exampleParams: '다이소 욕실 꿀템 / 2030 자취생 / 부정적 경고형',
    exampleOutput: '화면: [샤워기에 물때가 낀 클로즈업 화면]\n나레이션: "다이소 가서 이거 안 사면 여러분만 손해 보는 겁니다. 제발 헛돈 쓰지 마세요."\n화면: [다이소 꿀템 3가지가 탁탁탁 놓이는 화면]...'
  },
  {
    filename: 'prompt-review.html',
    category1: '제휴 마케팅 셀링',
    category2: '구매 유도 상품 리뷰',
    title: '전환율 극대화 제휴 마케팅 상품 리뷰 프롬프트',
    version: 'v2.0',
    promptText: '네이버 블로그에 작성할 [product_name]에 대한 \'내돈내산\' 스타일의 진솔한 리뷰를 작성해.\n\n핵심 장점인 [key_benefit]을 강조하되, 신뢰성을 위해 [drawback]이라는 단점도 1~2줄 살짝 언급해 줘.\n최종적으로는 이 단점에도 불구하고 왜 구매하는 것이 무조건 이득인지 설득하여 링크 클릭을 유도해.',
    variables: [
      { id: '[product_name]', label: '상품명 (예: 로지텍 MX Master 3S)' },
      { id: '[key_benefit]', label: '핵심 장점 (예: 미친듯한 생산성 향상과 편안한 그립감)' },
      { id: '[drawback]', label: '단점 (예: 다소 부담스러운 가격)' }
    ],
    exampleParams: '샤오미 로봇청소기 / 퇴근 후 여가시간 2시간 확보 / 걸레 세척 시 소음',
    exampleOutput: '"솔직히 처음에 걸레 세척할 때 나는 윙~ 하는 소음 때문에 \'아 반품할까?\' 잠깐 고민했습니다.\n하지만 퇴근하고 집에 왔을 때 바닥에 머리카락 하나 없이 뽀송뽀송한 거실을 보니 그깟 소음은 아무것도 아니더군요..."'
  },
  {
    filename: 'prompt-keyword.html',
    category1: '트래픽 & SEO 최적화',
    category2: '롱테일 키워드 대량 발굴',
    title: '황금 롱테일 키워드 50개 대량 추출 프롬프트',
    version: 'v1.5',
    promptText: '[seed_keyword]와 관련된 롱테일 키워드 50개를 마인드맵 방식으로 확장하여 찾아 표로 정리해 줘.\n\n검색 의도는 [search_intent]에 맞추고, 검색량은 중간 이상이면서 문서 수가 적어 [platform] 노출에 유리한 연관 검색어 위주로 뽑아줘.',
    variables: [
      { id: '[seed_keyword]', label: '씨앗 키워드 (예: 다이어트 식단)' },
      { id: '[search_intent]', label: '검색 의도 (예: 정보 탐색, 구매 결정)' },
      { id: '[platform]', label: '노출 플랫폼 (예: 네이버 블로그, 구글 SEO)' }
    ],
    exampleParams: '직장인 도시락 / 구매 결정 / 네이버 블로그',
    exampleOutput: '| 키워드 | 검색 의도 | 예상 난이도 |\n|---|---|---|\n| 전자레인지 직장인 도시락통 | 구매 | 낮음 |\n| 냄새 안나는 보온 도시락 | 구매/정보 | 중간 |\n| 다이어트 도시락 1주일 세트 | 구매 | 높음 |'
  }
];

let updatedBaseHtml = baseHtml;
// Update the sidebar in base html to have the correct links
updatedBaseHtml = updatedBaseHtml.replace(/<a href="#" class="nav-link-sub-sub">마스터 페르소나 부여<\/a>/g, '<a href="prompt-persona.html" class="nav-link-sub-sub">마스터 페르소나 부여</a>');
updatedBaseHtml = updatedBaseHtml.replace(/<a href="#" class="nav-link-sub-sub">바이럴 쇼츠\/릴스 대본<\/a>/g, '<a href="prompt-shorts.html" class="nav-link-sub-sub">바이럴 쇼츠/릴스 대본</a>');
updatedBaseHtml = updatedBaseHtml.replace(/<a href="#" class="nav-link-sub-sub">구매 유도 상품 리뷰<\/a>/g, '<a href="prompt-review.html" class="nav-link-sub-sub">구매 유도 상품 리뷰</a>');
updatedBaseHtml = updatedBaseHtml.replace(/<a href="#" class="nav-link-sub-sub">롱테일 키워드 대량 발굴<\/a>/g, '<a href="prompt-keyword.html" class="nav-link-sub-sub">롱테일 키워드 대량 발굴</a>');

// Write the updated index.html for resource
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
indexHtml = indexHtml.replace(/<a href="#" class="nav-link-sub-sub">마스터 페르소나 부여<\/a>/g, '<a href="prompt-persona.html" class="nav-link-sub-sub">마스터 페르소나 부여</a>');
indexHtml = indexHtml.replace(/<a href="#" class="nav-link-sub-sub">바이럴 쇼츠\/릴스 대본<\/a>/g, '<a href="prompt-shorts.html" class="nav-link-sub-sub">바이럴 쇼츠/릴스 대본</a>');
indexHtml = indexHtml.replace(/<a href="#" class="nav-link-sub-sub">구매 유도 상품 리뷰<\/a>/g, '<a href="prompt-review.html" class="nav-link-sub-sub">구매 유도 상품 리뷰</a>');
indexHtml = indexHtml.replace(/<a href="#" class="nav-link-sub-sub">롱테일 키워드 대량 발굴<\/a>/g, '<a href="prompt-keyword.html" class="nav-link-sub-sub">롱테일 키워드 대량 발굴</a>');
fs.writeFileSync(indexHtmlPath, indexHtml);

// Remove active class from base template before generating others
updatedBaseHtml = updatedBaseHtml.replace('href="prompt-detail.html" class="nav-link-sub-sub active"', 'href="prompt-detail.html" class="nav-link-sub-sub"');

fs.writeFileSync(baseHtmlPath, updatedBaseHtml.replace('href="prompt-detail.html" class="nav-link-sub-sub"', 'href="prompt-detail.html" class="nav-link-sub-sub active"'));

pages.forEach(page => {
  let html = updatedBaseHtml;
  
  // Update sidebar active link
  let linkRegex = new RegExp(`href="${page.filename}" class="nav-link-sub-sub"`, 'g');
  html = html.replace(linkRegex, `href="${page.filename}" class="nav-link-sub-sub active"`);
  
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
  
  fs.writeFileSync(path.join(__dirname, '..', page.filename), html);
});

console.log('Successfully generated 4 prompt detail pages and updated links.');

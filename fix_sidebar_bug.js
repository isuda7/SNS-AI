const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

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

files.forEach(file => {
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
console.log('Fixed sidebar navigation in ' + successCount + ' files.');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'prompt-mindset.html');
let content = fs.readFileSync(filePath, 'utf8');

const newUI = `
            <style>
                .mindset-flow {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                    padding: 2rem 0;
                    position: relative;
                }
                .mindset-flow::before {
                    content: '';
                    position: absolute;
                    left: 2rem;
                    top: 2rem;
                    bottom: 2rem;
                    width: 2px;
                    background: rgba(99, 102, 241, 0.3); /* Primary color line */
                    z-index: 1;
                }
                .mindset-step {
                    display: flex;
                    gap: 2rem;
                    position: relative;
                }
                .mindset-icon-wrapper {
                    width: 4rem;
                    height: 4rem;
                    background: var(--surface);
                    border: 2px solid var(--primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.75rem;
                    color: var(--primary);
                    z-index: 2;
                    flex-shrink: 0;
                    box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
                }
                .mindset-card {
                    background: var(--surface);
                    border-radius: 12px;
                    padding: 1.8rem;
                    flex: 1;
                    border: 1px solid rgba(255,255,255,0.05);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease, border-color 0.2s ease;
                }
                .mindset-card:hover {
                    transform: translateY(-2px);
                    border-color: rgba(99, 102, 241, 0.5);
                }
                .mindset-card h3 {
                    color: var(--text-main);
                    margin-bottom: 0.8rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.25rem;
                }
                .mindset-card h3 .step-num {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary);
                    font-size: 0.85rem;
                    padding: 0.2rem 0.6rem;
                    border-radius: 20px;
                    font-weight: 600;
                }
                .mindset-card p {
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin-bottom: 1.2rem;
                }
                .mindset-example {
                    background: rgba(0,0,0,0.2);
                    padding: 1rem 1.2rem;
                    border-radius: 8px;
                    border-left: 3px solid var(--primary);
                    color: #e2e8f0;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }
                .mindset-example strong {
                    color: var(--primary);
                    margin-right: 0.5rem;
                }
                
                .partner-quote {
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.02) 100%);
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    text-align: center;
                    font-size: 1.1rem;
                    color: var(--text-main);
                    font-weight: 500;
                }
                .partner-quote i {
                    color: var(--primary);
                    font-size: 1.5rem;
                    vertical-align: middle;
                    margin-right: 0.5rem;
                }
            </style>
            
            <div class="partner-quote">
                <i class="ph-fill ph-quotes"></i> AI에게 답을 내놓으라고 '명령'하지 마세요. 내 사고를 확장시켜줄 질문을 던지라고 '요청'하세요.
            </div>

            <div class="mindset-flow">
                
                <!-- Step 1 -->
                <div class="mindset-step">
                    <div class="mindset-icon-wrapper"><i class="ph-fill ph-target"></i></div>
                    <div class="mindset-card">
                        <h3><span class="step-num">Step 1</span> 문제 본질 정의 (Define)</h3>
                        <p>AI에게 막연하게 "블로그 글 써줘"라고 지시하는 것은 최악의 접근입니다. 현재 내가 달성하고자 하는 핵심 목표와 처한 구체적인 병목(Bottleneck) 현상을 투명하게 공유하여 진짜 풀어야 할 문제가 무엇인지부터 함께 정의해야 합니다.</p>
                        <div class="mindset-example">
                            <strong>[나의 첫 프롬프트]</strong> "수익형 블로그를 키우고 싶은데, 글쓰기 경험이 전혀 없어서 1문단 쓰기도 막막한 상황이야. 내가 당장 오늘 실천할 수 있는 가장 작은 첫 번째 스텝이 뭘까? 3가지로 나눠서 내게 역질문을 던져줘."
                        </div>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="mindset-step">
                    <div class="mindset-icon-wrapper"><i class="ph-fill ph-lightbulb"></i></div>
                    <div class="mindset-card">
                        <h3><span class="step-num">Step 2</span> 돌파구 아이디에이션 (Ideate)</h3>
                        <p>AI에게 단 하나의 정답을 강요하지 마세요. 내 역량과 현실적인 제약을 기반으로 시도해 볼 수 있는 3~4가지의 '옵션'과 방향성을 먼저 제시해 달라고 요구하세요. 그중에서 내가 가장 잘할 수 있는 것을 '선택'하는 것이 인간의 역할입니다.</p>
                        <div class="mindset-example">
                            <strong>[AI와의 핑퐁]</strong> "네가 던진 질문에 대한 내 답변은 OOO이야. 이걸 바탕으로 내가 당장 시작할 수 있는 블로그 주제 옵션을 3가지만 제안해 주고, 각각의 장단점과 예상 소요시간을 표로 비교해 줘."
                        </div>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="mindset-step">
                    <div class="mindset-icon-wrapper"><i class="ph-fill ph-tree-structure"></i></div>
                    <div class="mindset-card">
                        <h3><span class="step-num">Step 3</span> 논리적 뼈대 구축 (Structure)</h3>
                        <p>옵션 중 하나를 선택한 후, 내용 전체를 한 번에 써달라고 방치하지 마세요. 반드시 전체적인 '뼈대(목차)'만 먼저 잡아달라고 지시하여 논리적 구조를 통제해야 합니다. 이 뼈대가 마음에 들 때까지 수정하고 보완하는 것이 퀄리티를 결정짓습니다.</p>
                        <div class="mindset-example">
                            <strong>[구조화 지시]</strong> "2번 옵션이 가장 내 상황에 맞아. 그럼 이 주제로 체류시간을 극대화할 수 있는 완벽한 [서론-본론-결론] 목차와 각 문단별 핵심 소구점(Point) 뼈대만 기획해서 보여줘."
                        </div>
                    </div>
                </div>

                <!-- Step 4 -->
                <div class="mindset-step">
                    <div class="mindset-icon-wrapper"><i class="ph-fill ph-pencil-line"></i></div>
                    <div class="mindset-card">
                        <h3><span class="step-num">Step 4</span> 섹션별 디테일 확장 및 검수 (Execute)</h3>
                        <p>뼈대가 확정되면, 처음부터 끝까지 한 번에 쓰게 하지 말고 '한 번에 한 문단씩만' 작성하도록 지시하여 디테일을 극도로 끌어올립니다. 작성된 문단은 '감시 프롬프트' 기준을 적용해 스스로 피드백하고 고치게 만드세요.</p>
                        <div class="mindset-example">
                            <strong>[디테일 통제]</strong> "좋아, 목차 구조가 완벽해. 이제 확정된 목차의 '서론' 부분만 먼저 500자 분량으로 작성해. 단, 첫 문장에 독자의 페인포인트를 강하게 찌르는 후킹 요소가 반드시 들어가야 해. 작성 후 100점 만점으로 스스로 채점해 봐."
                        </div>
                    </div>
                </div>

            </div>
`;

// Replace <div class="detail-grid">...</div> with newUI
const startGrid = content.indexOf('<div class="detail-grid">');
// Since it's right before </div>\n        </div>\n    </main>, we can just find </main> and backtrack.
const mainEnd = content.indexOf('</main>');
const containerEnd = content.lastIndexOf('</div>', mainEnd - 5); // closes content
const gridEnd = content.lastIndexOf('</div>', containerEnd - 5); // closes detail-grid, wait, detail-grid is just before container ends?
// Wait, detail-grid is a div inside <div class="content">.
// <div class="content">
//    <div class="detail-header">...</div>
//    <div class="detail-grid">...</div>
// </div>

const headerEnd = content.indexOf('</div>', content.indexOf('header-actions')) + 6;
// Actually, it's safer to use regex to replace detail-grid
const regex = /<div class="detail-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/main>/;
content = content.replace(regex, newUI + '\n        </div>\n    </main>');

// Also update the title
content = content.replace(/AI를 단순 외주가 아닌 파트너로 만드는 사고회로 프롬프트/, 'AI 파트너링 사고회로 (Thinking Circuit)');

fs.writeFileSync(filePath, content);
console.log('Updated prompt-mindset.html layout.');

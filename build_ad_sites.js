const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const baseHtmlPath = path.join(dir, 'prompt-persona.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// 1. New Ad Site Sidebar String
const newAdSidebar = `
            <!-- Level 1: 광고 사이트 -->
            <li class="nav-item">
                <details>
                    <summary class="nav-link">
                        <i class="ph ph-megaphone nav-icon"></i> 광고 사이트
                        <i class="ph ph-caret-down toggle-icon"></i>
                    </summary>
                    <div class="nav-sub">
                        <details>
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-shopping-cart"></i> 제휴 마케팅 (Affiliate)</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="ad-coupang.html" class="nav-link-sub-sub">쿠팡 파트너스</a>
                                <a href="ad-clickbank.html" class="nav-link-sub-sub">클릭뱅크 (ClickBank)</a>
                            </div>
                        </details>
                        
                        <details>
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-hand-coins"></i> CPA / CPI 네트워크</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="ad-tenping.html" class="nav-link-sub-sub">텐핑 (Tenping) 노하우</a>
                            </div>
                        </details>
                    </div>
                </details>
            </li>
`;

// 2. Update all sidebars
let count = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the existing "광고 사이트" block
    const searchStart = '<!-- Level 1: 광고 사이트 -->';
    const startIdx = content.indexOf(searchStart);
    if (startIdx !== -1) {
        // Find the end of this li
        const endIdx = content.indexOf('</li>', startIdx) + 5;
        if (endIdx > 5) {
            content = content.substring(0, startIdx) + newAdSidebar.trim() + content.substring(endIdx);
            fs.writeFileSync(filePath, content);
            count++;
        }
    }
});
console.log('Updated sidebar in ' + count + ' files.');

// 3. Define the 3 Ad Pages
const adPages = [
    {
        filename: 'ad-coupang.html',
        cat1: '광고 사이트',
        cat2: '쿠팡 파트너스 실전 가이드',
        title: '쿠팡 파트너스 현실적인 수익화 가이드',
        desc: '블로그 저품질을 피하고 클릭률(CTR)을 극대화하는 쿠팡 파트너스 운영 노하우입니다.',
        content: `
            <div class="guide-container">
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
                
                <h2 class="guide-h2"><i class="ph ph-shield-warning" style="color:#ef4444;"></i> 1. 네이버 블로그 저품질 주의보</h2>
                <p class="guide-p">쿠팡 파트너스 링크(coupang.com)를 네이버 블로그에 직접 삽입하면 봇이 이를 감지하여 해당 글이나 블로그 전체를 <strong>저품질(누락)</strong> 처리할 확률이 매우 높습니다. 이를 우회하기 위해 반드시 <strong>'우회 링크'</strong>를 사용해야 합니다.</p>
                
                <div class="guide-alert warning">
                    <div class="guide-alert-title">절대 하면 안 되는 행동</div>
                    <ul class="guide-ul">
                        <li>생성된 단축 링크(coupang.com/a/xxxx)를 그대로 본문에 복사 붙여넣기</li>
                        <li>의미 없는 이미지 1장에 쿠팡 링크만 덜렁 남기는 글 (스팸 처리됨)</li>
                    </ul>
                </div>

                <h2 class="guide-h2"><i class="ph ph-link-break" style="color:#3b82f6;"></i> 2. 안전한 우회 링크 만들기 (리디렉션)</h2>
                <p class="guide-p">네이버 봇이 쿠팡 링크를 읽지 못하게 하려면, 나만의 개인 도메인이나 서브 블로그(티스토리, 워드프레스)를 거쳐서 쿠팡으로 넘어가도록 <strong>리디렉션(Redirection)</strong> 세팅을 해야 합니다.</p>
                <ul class="guide-ul">
                    <li><strong>방법 A:</strong> 티스토리 블로그에 자바스크립트 리디렉션 코드를 심고, 네이버 블로그에서는 티스토리 링크를 건다.</li>
                    <li><strong>방법 B:</strong> Bitly 같은 단축 URL 서비스나 Linktree를 활용하여 중간 기착지를 만든다.</li>
                </ul>

                <h2 class="guide-h2"><i class="ph ph-cursor-click" style="color:#10b981;"></i> 3. 구매 전환율(CVR) 300% 높이는 팁</h2>
                <p class="guide-p">사람들은 광고라는 것을 아는 순간 클릭하지 않습니다. 글의 맥락에 자연스럽게 녹여내는 것이 핵심입니다.</p>
                <div class="guide-alert">
                    <div class="guide-alert-title">현실적인 적용 예시</div>
                    <ul class="guide-ul">
                        <li><strong>단순 배너 (X):</strong> "최저가 구매하기" 배너 남발</li>
                        <li><strong>맥락형 텍스트 (O):</strong> "제가 이번 여행에서 썼던 <a href='#' style='color:#3b82f6; text-decoration:underline;'>2만원대 초경량 보조배터리</a>인데, 기내 반입도 돼서 정말 유용했어요."</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        filename: 'ad-clickbank.html',
        cat1: '광고 사이트',
        cat2: '클릭뱅크 (ClickBank) 실전 가이드',
        title: '클릭뱅크(ClickBank) 글로벌 달러 수익 창출',
        desc: '전 세계 최대의 디지털 상품 제휴 마케팅 플랫폼, 클릭뱅크를 활용한 해외 트래픽 공략법입니다.',
        content: `
            <div class="guide-container">
                <style>
                    .guide-container { background: #fff; padding: 2.5rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
                    .guide-h2 { font-size: 1.4rem; color: #1e293b; margin: 2rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.5rem; }
                    .guide-p { font-size: 1.05rem; color: #475569; line-height: 1.7; margin-bottom: 1rem; }
                    .guide-alert { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.2rem; border-radius: 0 8px 8px 0; margin: 1.5rem 0; }
                    .guide-alert-title { font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; font-size: 1.1rem; }
                    .guide-ul { margin: 1rem 0 1rem 1.5rem; color: #475569; line-height: 1.6; }
                    .guide-ul li { margin-bottom: 0.5rem; }
                </style>
                
                <h2 class="guide-h2"><i class="ph ph-globe" style="color:#3b82f6;"></i> 1. 왜 클릭뱅크인가?</h2>
                <p class="guide-p">클릭뱅크는 E-book, 온라인 강의, 소프트웨어 같은 '디지털 상품'을 주로 판매합니다. 실물 배송이 없기 때문에 <strong>커미션 마진율이 50% ~ 75%</strong>에 달할 정도로 압도적으로 높으며, 달러($)로 정산받는다는 강력한 장점이 있습니다.</p>
                
                <h2 class="guide-h2"><i class="ph ph-target" style="color:#ef4444;"></i> 2. 잘 팔리는 "에버그린(Evergreen)" 3대 니치(Niche)</h2>
                <p class="guide-p">해외에서 클릭뱅크로 수익을 내기 위해서는 영원히 수요가 마르지 않는 3가지 카테고리를 공략해야 합니다.</p>
                <ul class="guide-ul">
                    <li><strong>Health & Fitness (건강/다이어트):</strong> 다이어트 보조제, 당뇨 관리법, 피트니스 프로그램 (수익금 1위)</li>
                    <li><strong>Wealth & Money (돈/수익화):</strong> 온라인으로 돈 버는 법, 투자, 비트코인 가이드</li>
                    <li><strong>Relationships (관계/연애):</strong> 연애 상담, 심리 조언, 부부 관계 개선 프로그램</li>
                </ul>

                <h2 class="guide-h2"><i class="ph ph-funnel" style="color:#10b981;"></i> 3. 세일즈 퍼널(Sales Funnel) 필수 구축</h2>
                <p class="guide-p">페이스북이나 핀터레스트에 냅다 클릭뱅크 링크만 올리면 계정이 정지당합니다. 반드시 <strong>랜딩 페이지(Landing Page)</strong>와 <strong>이메일 마케팅(Email Marketing)</strong>을 거쳐야 합니다.</p>
                <div class="guide-alert">
                    <div class="guide-alert-title">클래식한 클릭뱅크 수익화 공식</div>
                    <ul class="guide-ul">
                        <li>1단계: Pinterest/TikTok으로 <strong>무료 트래픽</strong> 확보</li>
                        <li>2단계: 무료 E-book을 미끼로 이메일 주소 수집 (Opt-in Page)</li>
                        <li>3단계: 자동화된 이메일(Autoresponder)을 통해 매일 클릭뱅크 상품 세일즈</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        filename: 'ad-tenping.html',
        cat1: '광고 사이트',
        cat2: 'CPA/CPI 네트워크 (텐핑)',
        title: '행동 유도형(CPA) 광고 실전 노하우',
        desc: '사용자가 상담 신청이나 앱 설치만 해도 나에게 수익이 발생하는 CPA/CPI 완벽 공략법입니다.',
        content: `
            <div class="guide-container">
                <style>
                    .guide-container { background: #fff; padding: 2.5rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
                    .guide-h2 { font-size: 1.4rem; color: #1e293b; margin: 2rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 0.5rem; }
                    .guide-p { font-size: 1.05rem; color: #475569; line-height: 1.7; margin-bottom: 1rem; }
                    .guide-alert { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 1.2rem; border-radius: 0 8px 8px 0; margin: 1.5rem 0; }
                    .guide-alert-title { font-weight: 700; color: #1e293b; margin-bottom: 0.5rem; font-size: 1.1rem; }
                    .guide-ul { margin: 1rem 0 1rem 1.5rem; color: #475569; line-height: 1.6; }
                    .guide-ul li { margin-bottom: 0.5rem; }
                </style>
                
                <h2 class="guide-h2"><i class="ph ph-hand-coins" style="color:#3b82f6;"></i> 1. CPA (Cost Per Action) 란?</h2>
                <p class="guide-p">방문자가 물건을 구매하지 않아도, <strong>"무료 상담 신청", "앱 설치", "회원 가입"</strong> 등의 특정 행동만 완료하면 1건당 1~5만 원에 달하는 고단가의 수수료를 받는 광고 방식입니다. 국내 대표 플랫폼으로는 텐핑(Tenping), 디비디비딥 등이 있습니다.</p>
                
                <h2 class="guide-h2"><i class="ph ph-users" style="color:#ef4444;"></i> 2. CPA 고단가 타겟팅: 4050 세대 공략</h2>
                <p class="guide-p">CPA 광고 중 단가가 가장 높은 것은 <strong>'보험 상담', '개인 회생', '다이어트', '건강기능식품'</strong>입니다. 이 카테고리의 주 소비층은 40~50대 이상이므로, 콘텐츠의 어투와 정보 전달 방식이 이들에게 맞춰져야 합니다.</p>
                <ul class="guide-ul">
                    <li>글씨 크기를 키우고 직관적인 핵심만 전달할 것</li>
                    <li>공포 마케팅(Pain Point) 건드리기: "이 증상 방치하면 큰일 납니다"</li>
                </ul>

                <h2 class="guide-h2"><i class="ph ph-magnet" style="color:#10b981;"></i> 3. 네이버 지식iN(지식인) 게릴라 마케팅</h2>
                <p class="guide-p">초보자가 내 블로그 트래픽 없이 가장 빠르게 CPA 수익을 내는 방법은 지식인을 활용하는 것입니다.</p>
                <div class="guide-alert">
                    <div class="guide-alert-title">지식인 마케팅 꿀팁</div>
                    <ul class="guide-ul">
                        <li>질문자가 묻는 말에 진정성 있게 80%의 정보를 먼저 제공합니다.</li>
                        <li>나머지 20%의 핵심 해결책(무료 전문가 상담 링크 등)으로 CPA 링크를 삽입합니다.</li>
                        <li><strong>주의:</strong> 도배성 댓글이나 무작위 링크 삽입은 계정 영구 정지를 당합니다.</li>
                    </ul>
                </div>
            </div>
        `
    }
];

adPages.forEach(page => {
    let html = baseHtml;
    
    // Replace Breadcrumb
    html = html.replace(/<span>AI Prompt<\/span>[\s\S]*?<span class="current">.*?<\/span>/, `<span>\${page.cat1}</span>
                <i class="ph ph-caret-right"></i>
                <span class="current">\${page.cat2}</span>`);
                
    // Remove old content and inject new guide content
    const contentStart = html.indexOf('<div class="content">');
    const contentEnd = html.lastIndexOf('</div>', html.lastIndexOf('</main>')); 
    
    const newContent = `
        <div class="content">
            <div style="margin-bottom: 2rem;">
                <h1 style="font-size: 1.8rem; color: #1e293b; margin-bottom: 0.5rem;">\${page.title}</h1>
                <p style="color: #64748b; font-size: 1.05rem;">\${page.desc}</p>
            </div>
            \${page.content}
        </div>
    `;
    
    html = html.substring(0, contentStart) + newContent + html.substring(contentEnd + 6);
    
    // Fix active state using the new sidebar (we already replaced the sidebar HTML above, but wait, baseHtml is read from disk so it has the OLD sidebar)
    // Actually, baseHtml has the OLD sidebar! We must replace its sidebar with the new one.
    // To do this simply, we can just run the dynamic sidebar regex on it.
    
    const searchStart = '<!-- Level 1: 광고 사이트 -->';
    const startIdx = html.indexOf(searchStart);
    if (startIdx !== -1) {
        const endIdx = html.indexOf('</li>', startIdx) + 5;
        html = html.substring(0, startIdx) + newAdSidebar.trim() + html.substring(endIdx);
    }
    
    // Also remove the "Overview" menu from this new page!
    const overviewRegex = /<li class="nav-item">\s*<a href="index\.html" class="nav-link(?:\s+active)?">\s*<i class="ph ph-squares-four nav-icon"><\/i>\s*오버뷰\s*<\/a>\s*<\/li>/;
    html = html.replace(overviewRegex, '');

    fs.writeFileSync(path.join(dir, page.filename), html);
});

console.log('Created 3 new Ad Site tutorial pages.');


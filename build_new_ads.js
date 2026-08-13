const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const baseHtmlPath = path.join(dir, 'prompt-persona.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

// 1. Delete old overlapping files
['ad-coupang.html', 'ad-clickbank.html', 'ad-tenping.html'].forEach(f => {
    try { fs.unlinkSync(path.join(dir, f)); } catch(e) {}
});

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// 2. The New Sidebar HTML
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
                                <span style="flex:1;"><i class="ph ph-hand-coins"></i> 광고(수익) 제공 플랫폼</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="ad-db.html" class="nav-link-sub-sub">디비센스 / 텐핑 (CPA)</a>
                                <a href="ad-sponsor.html" class="nav-link-sub-sub">브랜드커넥트 / 레뷰</a>
                                <a href="ad-banner.html" class="nav-link-sub-sub">애드포스트 / 애드센스</a>
                                <a href="ad-affiliate.html" class="nav-link-sub-sub">쿠팡 / 클릭뱅크 (제휴)</a>
                            </div>
                        </details>
                        
                        <details>
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-users-three"></i> 광고 배포/트래픽 채널</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="traffic-blog.html" class="nav-link-sub-sub">네이버 블로그</a>
                                <a href="traffic-seo.html" class="nav-link-sub-sub">티스토리 / 워드프레스</a>
                                <a href="traffic-shorts.html" class="nav-link-sub-sub">인스타그램 / 유튜브 쇼츠</a>
                                <a href="traffic-community.html" class="nav-link-sub-sub">네이버 지식iN / 카페</a>
                            </div>
                        </details>
                    </div>
                </details>
            </li>
`;

// 3. Update all sidebars
let count = 0;
files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const searchStart = '<!-- Level 1: 광고 사이트 -->';
    const startIdx = content.indexOf(searchStart);
    if (startIdx !== -1) {
        const endIdx = content.indexOf('</li>', startIdx) + 5;
        content = content.substring(0, startIdx) + newAdSidebar.trim() + content.substring(endIdx);
        fs.writeFileSync(filePath, content);
        count++;
    }
});
console.log('Replaced sidebar in ' + count + ' files.');

// 4. Data for the 8 new pages
const pagesData = [
    {
        filename: 'ad-db.html', cat1: '광고 제공 플랫폼', cat2: '디비센스/텐핑 (CPA)', title: '고단가 CPA / DB생성 수익화', desc: '고객의 상담 신청이나 앱 설치만으로 큰 수익을 창출하는 플랫폼 가이드입니다.',
        content: `
            <div class="guide-container">
                <h2 class="guide-h2"><i class="ph ph-phone-call" style="color:#3b82f6;"></i> 1. CPA 수익 구조 이해하기</h2>
                <p class="guide-p">CPA(Cost Per Action)는 물건을 팔지 않아도 됩니다. 고객이 내 링크를 통해 <strong>무료 상담 신청, 앱 설치, 회원가입</strong>만 완료하면 건당 1~5만 원의 높은 수수료를 받습니다.</p>
                <div class="guide-alert"><div class="guide-alert-title">대표 플랫폼</div><ul class="guide-ul"><li><strong>디비센스(DBsense):</strong> 보험, 대출, 개인회생 등 고단가 DB 특화</li><li><strong>텐핑(Tenping):</strong> 모바일 앱 설치 및 다이어트/미용 특화</li></ul></div>
            </div>`
    },
    {
        filename: 'ad-sponsor.html', cat1: '광고 제공 플랫폼', cat2: '브랜드커넥트/레뷰', title: '체험단 및 원고료 수익화', desc: '내 채널의 영향력을 바탕으로 제품 협찬과 현금 원고료를 받는 플랫폼입니다.',
        content: `
            <div class="guide-container">
                <h2 class="guide-h2"><i class="ph ph-gift" style="color:#10b981;"></i> 1. 협찬 플랫폼의 양대 산맥</h2>
                <p class="guide-p">블로그나 인스타 방문자가 500명만 넘어도 충분히 수익을 낼 수 있습니다.</p>
                <ul class="guide-ul">
                    <li><strong>네이버 브랜드커넥트:</strong> 네이버가 공식 지원하는 인플루언서 전용 매칭 플랫폼. 현금 단가가 매우 높음.</li>
                    <li><strong>레뷰(REVU):</strong> 국내 최대 체험단. 식당 방문, 뷰티 제품 등 일상적인 협찬이 가장 활발함.</li>
                </ul>
            </div>`
    },
    {
        filename: 'ad-banner.html', cat1: '광고 제공 플랫폼', cat2: '애드포스트/애드센스', title: '클릭/노출 기반 배너 수익', desc: '글을 읽는 방문자 수(트래픽)에 비례하여 자동으로 발생되는 패시브 인컴입니다.',
        content: `
            <div class="guide-container">
                <h2 class="guide-h2"><i class="ph ph-mouse" style="color:#f59e0b;"></i> 1. 애드포스트 vs 애드센스 비교</h2>
                <p class="guide-p">트래픽 채널에 따라 달 수 있는 배너의 종류와 단가가 다릅니다.</p>
                <div class="guide-alert"><div class="guide-alert-title">단가 차이</div><ul class="guide-ul"><li><strong>네이버 애드포스트:</strong> 단가가 낮음(1클릭 50~100원 수준). 하지만 네이버 검색 유입으로 트래픽 모으기가 압도적으로 쉬움.</li><li><strong>구글 애드센스(티스토리/워드프레스):</strong> 단가가 높음(1클릭 달러 정산). 이른바 '고시'라 불릴 만큼 승인이 까다롭지만, 월 천만 원 이상 수익자 대다수가 애드센스를 사용.</li></ul></div>
            </div>`
    },
    {
        filename: 'ad-affiliate.html', cat1: '광고 제공 플랫폼', cat2: '쿠팡/클릭뱅크 (제휴)', title: '상품 판매 커미션 (제휴 마케팅)', desc: '국내외 쇼핑몰의 상품을 대신 팔아주고 판매액의 일정 %를 수수료로 받습니다.',
        content: `
            <div class="guide-container">
                <h2 class="guide-h2"><i class="ph ph-shopping-cart" style="color:#ef4444;"></i> 1. 플랫폼별 공략법</h2>
                <ul class="guide-ul">
                    <li><strong>쿠팡 파트너스:</strong> 수익률 3%. 단가가 낮지만 한국인 특성상 전환율(구매율)이 미친듯이 높습니다. 링크 클릭 후 24시간 내 다른 물건을 사도 내 수익이 됩니다.</li>
                    <li><strong>클릭뱅크(ClickBank):</strong> 수익률 50~75%. 전자책, 소프트웨어 등 디지털 상품을 판매합니다. 마진율이 엄청나 해외 트래픽(핀터레스트/틱톡)을 뚫으면 수익 단위가 달라집니다.</li>
                </ul>
            </div>`
    },
    {
        filename: 'traffic-blog.html', cat1: '광고 배포 채널', cat2: '네이버 블로그', title: '국내 1위 검색 트래픽 채널', desc: '한국 시장에서 가장 빠르고 확실하게 방문자를 모을 수 있는 베이스캠프입니다.',
        content: `
            <div class="guide-container">
                <h2 class="guide-h2"><i class="ph ph-magnifying-glass" style="color:#10b981;"></i> 1. 네이버 블로그의 역할</h2>
                <p class="guide-p"><strong>체험단(레뷰), 애드포스트, CPA 광고</strong>를 뿌리기 가장 좋은 국내 최적화 플랫폼입니다.</p>
                <div class="guide-alert warning"><div class="guide-alert-title">주의점 (저품질)</div><ul class="guide-ul"><li>쿠팡 파트너스 링크나 과도한 CPA 외부 링크를 삽입하면 '저품질(검색 누락)' 대상이 됩니다.</li><li>우회 링크(리디렉션) 기술을 사용하거나, 10개 중 2개 글에만 링크를 다는 등의 관리가 필수입니다.</li></ul></div>
            </div>`
    },
    {
        filename: 'traffic-seo.html', cat1: '광고 배포 채널', cat2: '티스토리/워드프레스', title: '구글 SEO 기반 트래픽', desc: '한 번 상위 노출되면 연금처럼 방문자가 들어오는 구글 생태계 공략 채널입니다.',
        content: `
            <div class="guide-container">
                <h2 class="guide-h2"><i class="ph ph-google-logo" style="color:#3b82f6;"></i> 1. 애드센스 전용 수익화 채널</h2>
                <p class="guide-p">티스토리와 워드프레스는 오직 <strong>구글 애드센스 달러 수익</strong>과 <strong>외부 링크 제약이 없는 특징</strong>을 활용해 제휴 마케팅 링크를 뿌리는 데 특화되어 있습니다.</p>
                <ul class="guide-ul">
                    <li>워드프레스는 서버비가 들지만, 카카오 대형 화재처럼 플랫폼이 날아갈 위험이 없는 완벽한 내 자산입니다.</li>
                    <li>글 하나를 써도 구글 SEO(검색엔진 최적화) 양식에 맞춰 길고 전문적으로 쓰는 것이 핵심입니다.</li>
                </ul>
            </div>`
    },
    {
        filename: 'traffic-shorts.html', cat1: '광고 배포 채널', cat2: '인스타/유튜브 쇼츠', title: '숏폼 알고리즘 바이럴', desc: '검색이 아닌 알고리즘 추천을 통해 단기간에 수십만 트래픽을 폭발시키는 채널입니다.',
        content: `
            <div class="guide-container">
                <h2 class="guide-h2"><i class="ph ph-video-camera" style="color:#ef4444;"></i> 1. 폭발적인 트래픽과 외부 링크</h2>
                <p class="guide-p">숏폼은 현재 인류가 가장 많은 시간을 소비하는 포맷입니다. 영상 하나가 터지면 블로그 한 달 치 방문자가 하루 만에 들어옵니다.</p>
                <div class="guide-alert"><div class="guide-alert-title">링크 연동 노하우</div><ul class="guide-ul"><li>인스타그램: 프로필에 Linktree(링크트리)를 달고, 영상 내에서 "프로필 링크를 확인하세요"라고 유도합니다.</li><li>유튜브 쇼츠: 현재 쇼츠 댓글에 외부 링크 클릭이 막혀 있으므로, 관련 동영상 링크로 롱폼을 연결하거나 프로필 링크를 활용해야 합니다.</li></ul></div>
            </div>`
    },
    {
        filename: 'traffic-community.html', cat1: '광고 배포 채널', cat2: '지식iN/카페 (게릴라)', title: '타겟 맞춤형 게릴라 마케팅', desc: '내 블로그가 없어도 당장 트래픽을 끌어올 수 있는 실전 노하우입니다.',
        content: `
            <div class="guide-container">
                <h2 class="guide-h2"><i class="ph ph-users" style="color:#8b5cf6;"></i> 1. 지식인/카페 게릴라 트래픽</h2>
                <p class="guide-p">질문을 올린 사람이나 카페 회원은 이미 '니즈'가 100% 차오른 상태입니다. 이들에게 정확한 솔루션과 함께 내 광고 링크(CPA, 쿠팡 등)를 전달하면 전환율이 압도적입니다.</p>
                <div class="guide-alert warning"><div class="guide-alert-title">어뷰징 주의</div><ul class="guide-ul"><li>카페에서 홍보성 링크를 바로 달면 30초 만에 강퇴당합니다. 쪽지를 활용하거나 자연스러운 정보성 글에 교묘하게 링크를 숨겨야 합니다.</li><li>지식인 답변 시 80%의 진정성 있는 답변 후 20%의 링크를 달아야 네이버 제재를 피할 수 있습니다.</li></ul></div>
            </div>`
    }
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

pagesData.forEach(page => {
    let html = baseHtml;
    
    // Replace Breadcrumb
    html = html.replace(/<span>AI Prompt<\/span>[\s\S]*?<span class="current">.*?<\/span>/, `<span>광고 사이트</span>
                <i class="ph ph-caret-right"></i>
                <span>\${page.cat1}</span>
                <i class="ph ph-caret-right"></i>
                <span class="current">\${page.cat2}</span>`);
                
    // Remove old content and inject new guide content
    const contentStart = html.indexOf('<div class="content">');
    const contentEnd = html.lastIndexOf('</div>', html.lastIndexOf('</main>')); 
    
    const newContent = `
        <div class="content">
            \${styleBlock}
            <div style="margin-bottom: 2rem;">
                <h1 style="font-size: 1.8rem; color: #1e293b; margin-bottom: 0.5rem;">\${page.title}</h1>
                <p style="color: #64748b; font-size: 1.05rem;">\${page.desc}</p>
            </div>
            \${page.content}
        </div>
    `;
    
    html = html.substring(0, contentStart) + newContent + html.substring(contentEnd + 6);
    
    // Replace sidebar
    const searchStart = '<!-- Level 1: 광고 사이트 -->';
    const startIdx = html.indexOf(searchStart);
    if (startIdx !== -1) {
        const endIdx = html.indexOf('</li>', startIdx) + 5;
        html = html.substring(0, startIdx) + newAdSidebar.trim() + html.substring(endIdx);
    }
    
    // Remove Overview nav-item from this page too
    const overviewRegex = /<li class="nav-item">\s*<a href="index\.html" class="nav-link(?:\s+active)?">\s*<i class="ph ph-squares-four nav-icon"><\/i>\s*오버뷰\s*<\/a>\s*<\/li>/;
    html = html.replace(overviewRegex, '');

    fs.writeFileSync(path.join(dir, page.filename), html);
});

console.log('Created 8 new ad/traffic tutorial pages.');

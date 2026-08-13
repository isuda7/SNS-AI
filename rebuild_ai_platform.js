const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const baseHtmlPath = path.join(dir, 'prompt-persona.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

// 1. Define the new pages and data
const pages = [
  {
    filename: 'platform-image.html',
    cat1: '콘텐츠 미디어 제작',
    cat2: 'AI 이미지/디자인',
    title: 'AI 썸네일 & 이미지 디자인 툴',
    desc: '블로그 썸네일, 인스타 피드, 쇼핑몰 상세페이지에 필요한 고품질 이미지를 생성하는 핵심 툴입니다.',
    cards: [
      { name: 'Midjourney', url: 'https://www.midjourney.com/', icon: 'ph-palette', tag: 'High-End', desc: '실사부터 일러스트까지 상업적으로 즉시 쓸 수 있는 압도적 퀄리티의 이미지 생성 AI입니다.' },
      { name: 'Canva AI', url: 'https://www.canva.com/', icon: 'ph-paint-brush-broad', tag: 'Design', desc: '초보자도 클릭 몇 번에 썸네일과 카드뉴스를 뚝딱 만들 수 있는 클라우드 디자인 플랫폼입니다.' },
      { name: 'DALL-E 3', url: 'https://chat.openai.com/', icon: 'ph-image-square', tag: 'Easy', desc: 'ChatGPT 내에서 대화하듯 쉽게 원하는 이미지를 정확하게 뽑아낼 수 있습니다.' },
      { name: 'Stable Diffusion', url: 'https://stability.ai/', icon: 'ph-faders', tag: 'Pro', desc: '캐릭터 일관성 유지, 구도 완벽 통제 등 디테일한 조정이 가능한 전문가용 오픈소스 AI입니다.' }
    ]
  },
  {
    filename: 'platform-audio.html',
    cat1: '콘텐츠 미디어 제작',
    cat2: 'AI 오디오/더빙',
    title: 'AI 성우 더빙 & BGM 제작 툴',
    desc: '유튜브 쇼츠, 인스타 릴스 등에 내 목소리를 대신할 자연스러운 AI 성우와 음악을 만듭니다.',
    cards: [
      { name: 'ElevenLabs', url: 'https://elevenlabs.io/', icon: 'ph-microphone-stage', tag: 'Voice AI', desc: '감정 표현과 억양이 인간과 가장 흡사한 전 세계 1위 텍스트-투-스피치(TTS) 서비스입니다.' },
      { name: 'Vrew (브루)', url: 'https://vrew.voyagerx.com/', icon: 'ph-subtitles', tag: 'Auto TTS', desc: '대본만 입력하면 자동으로 AI 성우 목소리와 자막, 이미지까지 입혀주는 필수 툴입니다.' },
      { name: 'Suno AI', url: 'https://suno.com/', icon: 'ph-music-notes-simple', tag: 'Music AI', desc: '프롬프트 한 줄로 영상의 BGM이나 가사가 있는 보컬 곡을 스튜디오급으로 작곡해 줍니다.' },
      { name: 'Typecast', url: 'https://typecast.ai/', icon: 'ph-users-three', tag: 'Local TTS', desc: '한국어 특화 AI 성우가 수백 명 준비되어 있어 쇼츠/릴스 제작 시 가장 많이 쓰이는 국내 툴입니다.' }
    ]
  },
  {
    filename: 'platform-video.html',
    cat1: '콘텐츠 미디어 제작',
    cat2: 'AI 비디오/영상',
    title: 'AI 비디오 생성 & 편집 툴',
    desc: '촬영 장비 없이도 텍스트나 이미지만으로 완벽한 고화질 영상을 만들어내는 툴입니다.',
    cards: [
      { name: 'Sora', url: 'https://openai.com/sora', icon: 'ph-video-camera', tag: 'OpenAI', desc: '텍스트만으로 현실과 구분이 불가능한 퀄리티의 최대 1분짜리 영상을 생성하는 혁명적인 모델입니다.' },
      { name: 'Runway Gen-3', url: 'https://runwayml.com/', icon: 'ph-film-strip', tag: 'Pro Editor', desc: '상업용 영상 제작자들에게 가장 사랑받는 최고 수준의 AI 영상 편집 및 생성 툴셋입니다.' },
      { name: 'Pika Labs', url: 'https://pika.art/', icon: 'ph-magic-wand', tag: 'Animation', desc: '이미지 일부분만 애니메이션화 하거나 텍스트로 3D/애니 영상을 아주 쉽게 만들어 줍니다.' },
      { name: 'CapCut', url: 'https://www.capcut.com/', icon: 'ph-scissors', tag: 'Shorts', desc: '오토 캡션, AI 필터 등 숏폼 제작에 필요한 모든 AI 기능을 갖춘 무료 모바일/PC 편집기입니다.' }
    ]
  },
  {
    filename: 'platform-planning.html',
    cat1: '기획 및 마케팅 카피',
    cat2: '블로그/콘텐츠 기획',
    title: '무한 아이디어 & 콘텐츠 기획 AI',
    desc: '키워드 발굴, 목차 구성, 대본 초안 등 부업러의 뇌를 대신해 기획을 담당하는 언어모델들입니다.',
    cards: [
      { name: 'Claude 3.5 Sonnet', url: 'https://claude.ai/', icon: 'ph-brain', tag: 'Best Writer', desc: '가장 사람다운 자연스러운 한국어 문장력을 구사하여 블로그 원고 작성에 1순위로 추천합니다.' },
      { name: 'ChatGPT (GPT-4o)', url: 'https://chat.openai.com/', icon: 'ph-chat-circle-dots', tag: 'All-rounder', desc: '논리적 추론, 데이터 분석, 표 작성 등 기획 구조를 잡고 자료를 정리하는 데 탁월합니다.' },
      { name: 'Gemini 1.5 Pro', url: 'https://gemini.google.com/', icon: 'ph-google-logo', tag: 'Research', desc: '방대한 구글 검색 데이터를 실시간으로 연동하여 최신 트렌드를 조사할 때 가장 빠릅니다.' }
    ]
  },
  {
    filename: 'platform-marketing.html',
    cat1: '기획 및 마케팅 카피',
    cat2: '마케팅/세일즈 카피',
    title: '클릭을 유발하는 카피라이팅 툴',
    desc: '제품의 판매(전환율)를 높이는 랜딩페이지, 이메일, 후킹 카피를 전담하는 마케팅 특화 AI입니다.',
    cards: [
      { name: '뤼튼 (Wrtn)', url: 'https://wrtn.ai/', icon: 'ph-pen-nib', tag: 'Domestic', desc: '국내 실정에 맞는 상세페이지, 광고 카피, 블로그 포스팅 템플릿을 무제한 무료로 제공합니다.' },
      { name: 'Copy.ai', url: 'https://www.copy.ai/', icon: 'ph-copy', tag: 'Global', desc: '소셜 미디어 게시물부터 세일즈 이메일 템플릿까지 수백 개의 검증된 마케팅 프레임워크를 지원합니다.' },
      { name: 'Jasper', url: 'https://www.jasper.ai/', icon: 'ph-rocket', tag: 'Enterprise', desc: '기업 수준의 브랜드 보이스를 학습시켜 일관된 마케팅 메시지를 대량 생산하는 프리미엄 툴입니다.' }
    ]
  },
  {
    filename: 'platform-automation.html',
    cat1: '수익화 업무 자동화',
    cat2: '노코드/리서치 자동화',
    title: '수익화 파이프라인 자동화 툴',
    desc: '데이터 수집, 포스팅 발행 등 단순 반복 업무를 대신해 주어 부업 시간을 아껴주는 툴입니다.',
    cards: [
      { name: 'Zapier', url: 'https://zapier.com/', icon: 'ph-lightning', tag: 'No-Code', desc: '인스타 업로드 시 블로그에 자동 발행하는 등 7천 개 앱을 연동해 나만의 자동화 봇을 만듭니다.' },
      { name: 'Make (Integromat)', url: 'https://www.make.com/', icon: 'ph-infinity', tag: 'Workflow', desc: '시각적인 워크플로우 빌더를 통해 복잡한 다중 조건의 데이터 자동화 처리를 가능하게 합니다.' },
      { name: 'Perplexity AI', url: 'https://www.perplexity.ai/', icon: 'ph-magnifying-glass-plus', tag: 'Search', desc: '블로그 글을 쓸 때 팩트 체크와 레퍼런스 조사를 완벽한 출처 기반으로 순식간에 끝내줍니다.' },
      { name: 'Notion AI', url: 'https://www.notion.so/product/ai', icon: 'ph-notebook', tag: 'Workspace', desc: '노션 데이터베이스를 기반으로 수익 일지, 고객 데이터를 분석하고 관리하는 데 최적화되어 있습니다.' }
    ]
  }
];

// 2. New Sidebar Navigation String
const aiPlatformSidebar = `
            <li class="nav-item">
                <details id="ai-platform-menu" open>
                    <summary class="nav-link">
                        <i class="ph ph-robot nav-icon"></i> AI Platform
                        <i class="ph ph-caret-down toggle-icon"></i>
                    </summary>
                    <div class="nav-sub">
                        <details id="plat-media">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-film-strip"></i> 콘텐츠 미디어 제작</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="platform-image.html" class="nav-link-sub-sub" id="link-image">AI 이미지/디자인</a>
                                <a href="platform-audio.html" class="nav-link-sub-sub" id="link-audio">AI 오디오/더빙</a>
                                <a href="platform-video.html" class="nav-link-sub-sub" id="link-video">AI 비디오/영상</a>
                            </div>
                        </details>

                        <details id="plat-copy">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-pen-nib"></i> 기획 및 마케팅 카피</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="platform-planning.html" class="nav-link-sub-sub" id="link-planning">블로그/콘텐츠 기획</a>
                                <a href="platform-marketing.html" class="nav-link-sub-sub" id="link-marketing">마케팅/세일즈 카피</a>
                            </div>
                        </details>

                        <details id="plat-auto">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-lightning"></i> 수익화 업무 자동화</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="platform-automation.html" class="nav-link-sub-sub" id="link-automation">노코드/리서치 자동화</a>
                            </div>
                        </details>
                    </div>
                </details>
            </li>
`;

function updateSidebarInFile(content, mapping = null) {
  const searchStr = '<i class="ph ph-robot nav-icon"></i> AI Platform';
  const platformIdx = content.indexOf(searchStr);
  if (platformIdx === -1) return content;
  
  const liStart = content.lastIndexOf('<li class="nav-item">', platformIdx);
  const liEnd = content.indexOf('</li>', platformIdx) + 5;
  
  let newSidebar = aiPlatformSidebar;
  
  if (mapping) {
    newSidebar = newSidebar.replace(new RegExp('<details id="' + mapping.cat + '">'), '<details id="' + mapping.cat + '" open>');
    newSidebar = newSidebar.replace(new RegExp('id="' + mapping.link + '"'), 'class="nav-link-sub-sub active"');
  }
  
  newSidebar = newSidebar.replace(/id="plat-[a-z]+" /g, '');
  newSidebar = newSidebar.replace(/id="plat-[a-z]+"/g, '');
  newSidebar = newSidebar.replace(/id="link-[a-zA-Z0-9-]+" /g, '');
  newSidebar = newSidebar.replace(/id="link-[a-zA-Z0-9-]+"/g, '');
  
  if (!mapping) {
      newSidebar = newSidebar.replace(/<details id="ai-platform-menu" open>/, '<details>');
  } else {
      newSidebar = newSidebar.replace(/<details id="ai-platform-menu" open>/, '<details open>');
  }
  
  const pre = content.slice(0, liStart);
  const post = content.slice(liEnd);
  
  return pre + newSidebar + post;
}

// 3. Delete old platform files
const oldFiles = ['platform-portal.html', 'platform-news.html', 'platform-llm-text.html', 'platform-llm-media.html', 'platform-agent-work.html', 'platform-agent-code.html'];
oldFiles.forEach(file => {
    try { fs.unlinkSync(path.join(dir, file)); } catch (e) { }
});

// 4. Generate the 6 new HTML pages
pages.forEach(page => {
  let html = baseHtml;
  
  // Replace Breadcrumb FIRST
  html = html.replace(/<span>AI Prompt<\/span>[\s\S]*?<span class="current">.*?<\/span>/, `<span>AI Platform</span>
                <i class="ph ph-caret-right"></i>
                <span>${page.cat1}</span>
                <i class="ph ph-caret-right"></i>
                <span class="current">${page.cat2}</span>`);
  
  // Now calculate start and end
  const contentStart = html.indexOf('<div class="content">');
  const contentEnd = html.lastIndexOf('</div>', html.lastIndexOf('</main>')); 
  
  let cardsHtml = '';
  page.cards.forEach(card => {
    cardsHtml += `
                    <div class="dir-card">
                        <div class="dir-header">
                            <div class="dir-icon"><i class="ph ${card.icon}"></i></div>
                            <div>
                                <span class="dir-tag">${card.tag}</span>
                                <h3 class="dir-title">${card.name}</h3>
                            </div>
                        </div>
                        <p class="dir-desc">${card.desc}</p>
                        <a href="${card.url}" target="_blank" class="dir-action">
                            <i class="ph ph-arrow-square-out"></i> 사이트 방문하기
                        </a>
                    </div>`;
  });
  
  const newContentUI = `
        <style>
            .directory-header {
                margin-bottom: 2rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #e2e8f0;
            }
            .directory-title {
                font-size: 1.8rem;
                color: #1e293b;
                margin-bottom: 0.5rem;
            }
            .directory-desc {
                color: #64748b;
                font-size: 1.05rem;
            }
            .directory-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 1.5rem;
                padding: 1rem 0 3rem 0;
            }
            .dir-card {
                background: #ffffff;
                border-radius: 12px;
                padding: 1.5rem;
                border: 1px solid #e2e8f0;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                display: flex;
                flex-direction: column;
                transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            }
            .dir-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 20px -5px rgba(99, 102, 241, 0.15);
                border-color: rgba(99, 102, 241, 0.4);
            }
            .dir-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            .dir-icon {
                width: 3.5rem;
                height: 3.5rem;
                background: #f8fafc;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.75rem;
                color: var(--primary);
                border: 1px solid #e2e8f0;
            }
            .dir-title {
                font-size: 1.15rem;
                font-weight: 700;
                color: #1e293b;
                margin: 0;
            }
            .dir-tag {
                display: inline-block;
                background: rgba(99, 102, 241, 0.1);
                color: var(--primary);
                font-size: 0.75rem;
                padding: 0.2rem 0.6rem;
                border-radius: 20px;
                font-weight: 600;
                margin-bottom: 0.2rem;
            }
            .dir-desc {
                color: #475569;
                font-size: 0.95rem;
                line-height: 1.6;
                flex: 1;
                margin-bottom: 1.5rem;
            }
            .dir-action {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                width: 100%;
                padding: 0.85rem;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                color: #334155;
                font-weight: 600;
                font-size: 0.95rem;
                text-decoration: none;
                transition: background 0.2s ease, color 0.2s ease;
            }
            .dir-action:hover {
                background: var(--primary);
                color: #ffffff;
                border-color: var(--primary);
            }
        </style>
        
        <div class="content">
            <div class="directory-header">
                <h1 class="directory-title">${page.title}</h1>
                <p class="directory-desc">${page.desc}</p>
            </div>
            
            <div class="directory-grid">
                ${cardsHtml}
            </div>
        </div>
  `;
  
  const pre = html.slice(0, contentStart);
  const post = html.slice(contentEnd + 6); // Skip the inner </div>
  
  html = pre + newContentUI + post;
  
  const linkId = 'link-' + page.filename.replace('platform-', '').replace('.html', '');
  const catMap = {
    'platform-image.html': 'plat-media',
    'platform-audio.html': 'plat-media',
    'platform-video.html': 'plat-media',
    'platform-planning.html': 'plat-copy',
    'platform-marketing.html': 'plat-copy',
    'platform-automation.html': 'plat-auto'
  };
  
  const mapping = { cat: catMap[page.filename], link: linkId };
  html = updateSidebarInFile(html, mapping);
  
  // Remove the active class from prompt sidebars that carried over from baseHtml
  html = html.replace(/<a [^>]*class="nav-link-sub-sub active"[^>]*>/, match => match.replace('active', ''));
  
  fs.writeFileSync(path.join(dir, page.filename), html);
});

// 5. Update the sidebar in all 21 remaining prompt files
const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('platform-'));
let updateCount = 0;

allFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = updateSidebarInFile(content, null);
  fs.writeFileSync(filePath, content);
  updateCount++;
});

console.log('Successfully deleted old platform files, created 6 new side-hustle pages, and updated ' + updateCount + ' prompt files.');

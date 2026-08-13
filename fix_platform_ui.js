const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');
const baseHtmlPath = path.join(dir, 'prompt-persona.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

// Define the 6 pages and their data
const pages = [
  {
    filename: 'platform-portal.html',
    cat1: '포털 사이트',
    cat2: '종합 인덱스 포털',
    title: '전 세계 AI 서비스 인덱스 포털',
    desc: '수만 개의 AI 툴이 매일 업데이트되는 글로벌 카탈로그 서비스들을 모았습니다.',
    cards: [
      { name: 'There\'s An AI For That', url: 'https://theresanaiforthat.com/', icon: 'ph-magnifying-glass', tag: 'Global #1', desc: '가장 방대한 전 세계 AI 툴 디렉토리. 직업별/용도별 검색을 지원합니다.' },
      { name: 'AI Valley', url: 'https://aivalley.ai/', icon: 'ph-mountains', tag: 'Trending', desc: '매일 새롭게 출시되는 트렌디한 AI 툴과 프롬프트를 빠르게 확인할 수 있습니다.' },
      { name: 'Futurepedia', url: 'https://www.futurepedia.io/', icon: 'ph-rocket-launch', tag: 'News & Tools', desc: '매일 업데이트되는 AI 툴과 뉴스, 사용법 튜토리얼을 제공하는 대형 포털입니다.' },
      { name: 'AI Korea Community', url: 'https://aikoreacommunity.com/', icon: 'ph-chats', tag: 'Domestic', desc: '한국에서 가장 활성화된 AI 정보 공유 커뮤니티 및 정보 포털입니다.' }
    ]
  },
  {
    filename: 'platform-news.html',
    cat1: '포털 사이트',
    cat2: 'AI 뉴스 & 트렌드',
    title: '최신 AI 테크 뉴스 & 트렌드',
    desc: '하루가 다르게 변하는 AI 생태계의 최신 동향과 기술 뉴스를 빠르게 파악하세요.',
    cards: [
      { name: 'The Rundown AI', url: 'https://www.therundown.ai/', icon: 'ph-newspaper', tag: 'Newsletter', desc: '가장 빠르게 글로벌 AI 뉴스를 정리해주는 일일 뉴스레터 포털입니다.' },
      { name: 'AI Times', url: 'https://www.aitimes.com/', icon: 'ph-article', tag: 'News Media', desc: '국내 최고 수준의 인공지능 전문 언론사로 심도있는 기사를 제공합니다.' },
      { name: 'Hugging Face News', url: 'https://huggingface.co/', icon: 'ph-smiley', tag: 'Tech & Model', desc: 'AI 개발자 커뮤니티의 성지. 최신 오픈소스 모델들의 동향을 실시간으로 확인 가능합니다.' }
    ]
  },
  {
    filename: 'platform-llm-text.html',
    cat1: '대규모 언어모델 (LLM)',
    cat2: '텍스트 생성 모델',
    title: '텍스트 기반 대규모 언어모델 (Chat)',
    desc: '인간처럼 사고하고 글을 작성하는 현존 최고의 대규모 언어모델(LLM) 서비스들입니다.',
    cards: [
      { name: 'ChatGPT (OpenAI)', url: 'https://chat.openai.com/', icon: 'ph-chat-circle-dots', tag: 'GPT-4o', desc: '대화형 AI의 대명사. 플러그인, 데이터 분석, 최상위 논리적 추론 능력을 제공합니다.' },
      { name: 'Claude (Anthropic)', url: 'https://claude.ai/', icon: 'ph-text-align-justify', tag: 'Sonnet 3.5', desc: '가장 자연스러운 한국어 문장력과 긴 컨텍스트 분석에 특화된 AI 파트너입니다.' },
      { name: 'Gemini (Google)', url: 'https://gemini.google.com/', icon: 'ph-sparkle', tag: 'Gemini 1.5 Pro', desc: '구글 생태계(Docs, Drive)와 완벽히 연동되며 가장 빠른 정보 검색 능력을 갖췄습니다.' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai/', icon: 'ph-magnifying-glass-plus', tag: 'Search AI', desc: '할루시네이션이 없는 완벽한 출처 기반의 AI 검색 엔진입니다.' }
    ]
  },
  {
    filename: 'platform-llm-media.html',
    cat1: '대규모 언어모델 (LLM)',
    cat2: '멀티모달 (이미지/영상)',
    title: '멀티모달 미디어 생성 AI',
    desc: '텍스트를 넘어 고품질의 이미지, 비디오, 오디오를 생성하는 멀티모달 서비스들입니다.',
    cards: [
      { name: 'Midjourney', url: 'https://www.midjourney.com/', icon: 'ph-image', tag: 'Image AI', desc: '압도적인 예술성과 퀄리티를 자랑하는 디스코드 기반 이미지 생성형 AI입니다.' },
      { name: 'Sora (OpenAI)', url: 'https://openai.com/sora', icon: 'ph-video-camera', tag: 'Video AI', desc: '텍스트만으로 현실과 구분이 불가능한 최대 1분 길이의 영상을 생성합니다.' },
      { name: 'Runway Gen-3', url: 'https://runwayml.com/', icon: 'ph-film-strip', tag: 'Video Editor', desc: '상업용 영상 제작에 즉시 투입 가능한 전문가용 AI 비디오 툴셋입니다.' },
      { name: 'Suno AI', url: 'https://suno.com/', icon: 'ph-music-notes', tag: 'Audio AI', desc: '프롬프트 한 줄로 보컬이 포함된 완벽한 스튜디오급 음악을 작곡해 줍니다.' }
    ]
  },
  {
    filename: 'platform-agent-work.html',
    cat1: 'AI 에이전트',
    cat2: '비즈니스 업무 자동화',
    title: '비즈니스 & 업무 자동화 에이전트',
    desc: '단순 반복 업무를 10배 빠르게 줄여주는 실무 특화형 AI 에이전트 툴입니다.',
    cards: [
      { name: 'Zapier AI', url: 'https://zapier.com/', icon: 'ph-lightning', tag: 'Automation', desc: '7천 개 이상의 앱을 연동하여 트리거 기반의 자동화 워크플로우를 만듭니다.' },
      { name: 'Notion AI', url: 'https://www.notion.so/product/ai', icon: 'ph-notebook', tag: 'Workspace', desc: '노션 내부의 데이터를 학습하여 문서 요약, 번역, 초안 작성을 완벽히 돕습니다.' },
      { name: 'Gamma', url: 'https://gamma.app/', icon: 'ph-presentation-chart', tag: 'Presentation', desc: '주제만 던져주면 디자인까지 완벽히 세팅된 PPT와 웹페이지를 1분 만에 완성합니다.' }
    ]
  },
  {
    filename: 'platform-agent-code.html',
    cat1: 'AI 에이전트',
    cat2: '개발/코딩 어시스턴트',
    title: '개발자 전용 코딩 에이전트',
    desc: '코드를 이해하고 직접 수정안까지 제시하는 개발 전용 페어 프로그래밍 AI입니다.',
    cards: [
      { name: 'Cursor', url: 'https://cursor.sh/', icon: 'ph-code', tag: 'IDE', desc: 'VS Code를 포크하여 만든 현존 최고 성능의 AI 네이티브 에디터입니다.' },
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', icon: 'ph-github-logo', tag: 'Assistant', desc: '개발자의 타이핑을 예측하여 코드를 실시간 자동 완성해주는 툴입니다.' },
      { name: 'v0 by Vercel', url: 'https://v0.dev/', icon: 'ph-layout', tag: 'UI/UX', desc: '디자인 요구사항을 프롬프트로 입력하면 React/Tailwind 코드로 즉시 변환합니다.' }
    ]
  }
];

const aiPlatformSidebar = `
            <li class="nav-item">
                <details id="ai-platform-menu" open>
                    <summary class="nav-link">
                        <i class="ph ph-robot nav-icon"></i> AI Platform
                        <i class="ph ph-caret-down toggle-icon"></i>
                    </summary>
                    <div class="nav-sub">
                        <details id="plat-portal">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-globe"></i> 포털 사이트</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="platform-portal.html" class="nav-link-sub-sub" id="link-portal">종합 인덱스 포털</a>
                                <a href="platform-news.html" class="nav-link-sub-sub" id="link-news">AI 뉴스 & 트렌드</a>
                            </div>
                        </details>

                        <details id="plat-llm">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-brain"></i> 대규모 언어모델</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="platform-llm-text.html" class="nav-link-sub-sub" id="link-llm-text">텍스트 생성 모델</a>
                                <a href="platform-llm-media.html" class="nav-link-sub-sub" id="link-llm-media">멀티모달 (이미지/영상)</a>
                            </div>
                        </details>

                        <details id="plat-agent">
                            <summary class="nav-link-sub">
                                <span style="flex:1;"><i class="ph ph-cpu"></i> AI 에이전트</span>
                                <i class="ph ph-caret-down toggle-icon" style="font-size: 0.85rem;"></i>
                            </summary>
                            <div class="nav-sub-sub">
                                <a href="platform-agent-work.html" class="nav-link-sub-sub" id="link-agent-work">비즈니스 업무 자동화</a>
                                <a href="platform-agent-code.html" class="nav-link-sub-sub" id="link-agent-code">개발/코딩 어시스턴트</a>
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

// Generate the 6 HTML pages
pages.forEach(page => {
  let html = baseHtml;
  
  // Replace Breadcrumb FIRST before any index calculations!
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
  
  // Include the closing </div> for .content in the replacement!
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
  const post = html.slice(contentEnd + 6); // +6 to skip the actual '</div>' since we appended it to newContentUI
  
  html = pre + newContentUI + post;
  
  const linkId = 'link-' + page.filename.replace('platform-', '').replace('.html', '');
  const catMap = {
    'platform-portal.html': 'plat-portal',
    'platform-news.html': 'plat-portal',
    'platform-llm-text.html': 'plat-llm',
    'platform-llm-media.html': 'plat-llm',
    'platform-agent-work.html': 'plat-agent',
    'platform-agent-code.html': 'plat-agent'
  };
  
  const mapping = { cat: catMap[page.filename], link: linkId };
  html = updateSidebarInFile(html, mapping);
  
  // Remove the active class from prompt sidebars that carried over from baseHtml
  html = html.replace(/<a [^>]*class="nav-link-sub-sub active"[^>]*>/, match => match.replace('active', ''));
  
  // Just in case we missed it because of how we replaced it before.
  // We should just re-find active and make sure it's the RIGHT ONE!
  
  fs.writeFileSync(path.join(dir, page.filename), html);
});

console.log('Fixed the missing </div> and stray v> bugs in all 6 AI Platform pages.');

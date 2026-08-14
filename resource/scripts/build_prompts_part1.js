const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

const group1Pages = [
    {
        filename: 'prompt-format.html', breadcrumb: '출력 포맷 및 룰셋', title: '출력 포맷 및 룰셋 프롬프트', 
        prompt: `다음 정보를 바탕으로 글을 작성해 줘. 
단, 출력 시 반드시 아래의 [출력 포맷]과 [절대 규칙]을 100% 준수해야 해.

[출력 포맷]
- 제목: <span class="variable">[title_style]</span>
- 본문 구조: <span class="variable">[content_structure]</span> (예: 마크다운 표, 글머리 기호 등)

[절대 규칙]
1. <span class="variable">[rule_1]</span>
2. <span class="variable">[rule_2]</span>
3. 금지어: <span class="variable">[forbidden_words]</span>`,
        vars: [
            { id: '[title_style]', label: '[title_style] - 제목 스타일', placeholder: '예: H1 태그, 후킹형' },
            { id: '[content_structure]', label: '[content_structure] - 본문 구조', placeholder: '예: 3열 마크다운 테이블' },
            { id: '[rule_1]', label: '[rule_1] - 첫 번째 필수 규칙', placeholder: '예: 모든 문장은 ~다/까로 끝날 것' },
            { id: '[rule_2]', label: '[rule_2] - 두 번째 필수 규칙', placeholder: '예: 문단 사이에 반드시 한 줄 공백 추가' },
            { id: '[forbidden_words]', label: '[forbidden_words] - 금지어', placeholder: '예: 안녕하십니까, 오늘 알아볼' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (대량 자동화)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 마크다운 테이블(표)이나 JSON 포맷으로 출력을 강제하여, 복사-붙여넣기 과정을 혁신적으로 단축합니다.</li>
                <li><strong>2단계:</strong> 출력된 구조화 데이터를 워드프레스나 Notion 데이터베이스에 바로 붙여넣어 수익형 블로그 발행 속도를 5배 이상 높입니다.</li>
                <li><strong>3단계:</strong> 하루 10개 쓰던 글을 포맷팅 프롬프트로 50개씩 찍어내어 구글 애드센스 트래픽을 폭발시킵니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-hallucination.html', breadcrumb: '할루시네이션(환각) 억제', title: '팩트 체크 및 할루시네이션 억제', 
        prompt: `너는 이제부터 철저한 팩트 체크를 담당하는 편집장이야. 
내가 <span class="variable">[topic]</span>에 대해 묻는다면, 대답하기 전에 다음 3가지를 반드시 점검해.

1. 네가 가진 정보가 확실한 사실(Fact)인지 스스로 검증할 것.
2. 정보의 출처가 불분명하거나 100% 확신할 수 없다면, 지어내지 말고 "해당 정보는 알 수 없습니다"라고 대답할 것.
3. 답변을 할 때는 <span class="variable">[reference_type]</span> 기반의 레퍼런스를 함께 제시할 것.`,
        vars: [
            { id: '[topic]', label: '[topic] - 질문 주제', placeholder: '예: 2024년 건강기능식품 트렌드' },
            { id: '[reference_type]', label: '[reference_type] - 요구하는 출처 형태', placeholder: '예: 공식 논문, 뉴스 기사 URL' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (고단가 전문 블로그)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 건강, 금융, 법률과 같은 고단가(YMYL) 키워드는 거짓 정보가 들어가면 블로그가 즉시 저품질을 먹습니다.</li>
                <li><strong>2단계:</strong> 이 프롬프트로 팩트만 남긴 원고 초안을 생성합니다. 모르는 건 모른다고 하게 만들어 치명적인 오류를 막습니다.</li>
                <li><strong>3단계:</strong> 정확성이 검증된 고퀄리티 전문 칼럼을 발행하여, 텐핑이나 디비센스(DBsense)의 고단가 CPA 상담을 유도합니다. (신뢰도가 전환율을 만듭니다)</li>
            </ul>
        `
    },
    {
        filename: 'prompt-fewshot.html', breadcrumb: 'Few-Shot 러닝 (예시 기반)', title: 'Few-Shot 러닝 (예시 학습형)', 
        prompt: `다음 예시들을 보고 패턴을 학습한 뒤, 새로운 인풋에 대해 똑같은 스타일로 결과를 출력해 줘.

[학습 예시 1]
- 입력: <span class="variable">[example_in_1]</span>
- 출력: <span class="variable">[example_out_1]</span>

[학습 예시 2]
- 입력: <span class="variable">[example_in_2]</span>
- 출력: <span class="variable">[example_out_2]</span>

[새로운 미션]
- 입력: <span class="variable">[new_input]</span>
- 출력:`,
        vars: [
            { id: '[example_in_1]', label: '학습 인풋 1', placeholder: '예: 20대 다이어트' },
            { id: '[example_out_1]', label: '학습 아웃풋 1', placeholder: '예: "20대 필수템! 굶지 않고 한 달 5kg 빼는 비밀"' },
            { id: '[example_in_2]', label: '학습 인풋 2', placeholder: '예: 40대 노후자금' },
            { id: '[example_out_2]', label: '학습 아웃풋 2', placeholder: '예: "40대부터 준비하는 월 300만원 연금 파이프라인"' },
            { id: '[new_input]', label: '실제 원하는 인풋', placeholder: '예: 30대 탈모 예방' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (카피라이팅 찍어내기)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 과거에 내가 대박 쳤던(조회수가 높았던) 유튜브 썸네일 제목이나 블로그 제목 2~3개를 예시로 제공합니다.</li>
                <li><strong>2단계:</strong> 새로운 키워드만 던져주면 AI가 과거 대박 제목의 어투와 패턴을 그대로 모방하여 새로운 카피를 무한 생성합니다.</li>
                <li><strong>3단계:</strong> 이를 통해 클릭뱅크나 쿠팡 파트너스 링크 클릭을 유도하는 '후킹형 콘텐츠' 공장 라인을 구축할 수 있습니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-cot.html', breadcrumb: '단계별 추론 (CoT)', title: 'CoT (Chain of Thought) 추론형', 
        prompt: `내가 묻는 <span class="variable">[problem]</span> 문제에 대해 한 번에 결론을 내리지 마.
반드시 아래의 절차에 따라 단계별로(Step-by-step) 깊이 있게 생각 과정을 서술한 뒤에 최종 결론을 도출해 줘.

[추론 단계]
1단계: 현 상황의 문제점 및 원인 분석
2단계: 가능한 해결책 3가지 브레인스토밍
3단계: 각 해결책의 장단점 및 <span class="variable">[target_audience]</span>에게 미칠 영향 평가
4단계: 최종 <span class="variable">[output_goal]</span> (가장 최적의 솔루션 1가지 제안)`,
        vars: [
            { id: '[problem]', label: '[problem] - 해결할 문제', placeholder: '예: 초보 블로거의 방문자 수 정체 현상' },
            { id: '[target_audience]', label: '[target_audience] - 타겟 대상', placeholder: '예: 하루 1~2시간 투자하는 직장인 투잡러' },
            { id: '[output_goal]', label: '[output_goal] - 최종 목표', placeholder: '예: 즉시 실행 가능한 일일 글쓰기 루틴 3단계' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (전자책/강의 기획)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 크몽(Kmong)이나 클래스101에 팔 전자책/온라인 강의의 커리큘럼을 짤 때 이 프롬프트를 씁니다.</li>
                <li><strong>2단계:</strong> 타겟 수강생이 겪는 문제를 단계별로 논리적으로 분석하게 하여, "결론만 던지는 뻔한 글"이 아닌 "전문가가 쓴 통찰력 있는 해결책"을 뽑아냅니다.</li>
                <li><strong>3단계:</strong> 도출된 논리적 구조를 바탕으로 PDF 전자책을 완성하여 월 자동화 수익(패시브 인컴)을 구축합니다.</li>
            </ul>
        `
    },
    {
        filename: 'prompt-audit.html', breadcrumb: '감시 프롬프트 (품질 QA)', title: '발행 원고 품질 감시자 (QA)', 
        prompt: `System Role: 너는 월 수익 1천만 원 이상의 네이버/구글 SEO 품질 검수 책임자야.
내가 전달하는 블로그 원고를 읽고, 아래의 [감시 기준 6가지]를 통과했는지 100점 만점으로 채점하고 보완점을 지시해 줘.

[감시 기준 6가지]
1. 분량 검수 (40점): 본문 텍스트가 <span class="variable">[min_length]</span>자를 넘겼는가? (부족한 단락 지적)
2. 이미지 룰셋 검수 (20점): 본문 최상단에 이미지 태그가 오직 1개만 있는지 확인하라.
3. 검색 의도 검수 (20점): 서론 첫 문단에서 검색자의 <span class="variable">[pain_point]</span>(Pain Point)를 정확히 짚어주었는가?
4. 가독성 검수 (20점): 중간에 '비교 표'나 '체크리스트'가 사용되어 체류시간을 높이도록 설계되었는가?
5. 어투 검수 (발견시 감점 0점): "최종 결론 및 강력한 액션 플랜" 같은 기계적인 소제목이 사용되었는가? 문맥에 맞게 수정 지시.
6. 주제 매력도 검수 (발견시 감점 0점): 평이하고 지루한 내용인가? 자극적이고 어그로가 끌리는 <span class="variable">[hook_style]</span> 테마로 다시 쓰게 지시할 것.

[검수할 원고 내용]: (이곳에 작성된 초안을 붙여넣으세요)`,
        vars: [
            { id: '[min_length]', label: '[min_length] - 최소 요구 글자수', placeholder: '예: 1,500' },
            { id: '[pain_point]', label: '[pain_point] - 타겟의 문제점', placeholder: '예: 보험료 누수, 다이어트 요요' },
            { id: '[hook_style]', label: '[hook_style] - 후킹 스타일', placeholder: '예: 논란형, 정보폭로형, 스토리텔링형' }
        ],
        workflow: `
            <h4 style="font-weight:700; color:#1e293b; font-size:1.05rem;"><i class="ph ph-money" style="color:#10b981;"></i> 수익화 워크플로우 (원고 품질 자동화)</h4>
            <ul style="margin: 0.5rem 0 1rem 1.2rem; color:#475569; font-size:0.95rem; line-height:1.6;">
                <li><strong>1단계:</strong> 직원을 쓰거나 외주를 맡길 필요가 없습니다. Claude 3.5나 GPT-4o에게 이 감시 프롬프트를 입력하여 데스크 역할(편집장)을 맡깁니다.</li>
                <li><strong>2단계:</strong> 내가 대충 쓴 초안이나 다른 AI가 쓴 기계적인 원고를 이 감시자에게 던져주면, 상위 노출에 필요한 SEO 기준을 통과할 때까지 무한 수정을 지시합니다.</li>
                <li><strong>3단계:</strong> 감시를 통과한 '100점짜리' 원고만을 티스토리/블로그에 발행하여 체류시간을 극대화하고 애드센스 수익을 방어합니다.</li>
            </ul>
            <div class="guide-alert warning"><div class="guide-alert-title">유저 커스텀 룰셋 적용됨!</div><p>이 프롬프트는 <code>AGENTS.md</code>에 정의된 유저님의 실전 블로그 발행 룰셋(이미지 1장 제한, 기계적 어투 감점 등)이 완벽히 적용된 실무형 프롬프트입니다.</p></div>
        `
    }
];

group1Pages.forEach(page => {
    let html = fs.readFileSync(path.join(dir, 'prompt-persona.html'), 'utf8'); // Always read fresh from base
    
    // 1. Breadcrumb and Title
    html = html.replace(/<span class="current">.*?<\/span>/, `<span class="current">\${page.breadcrumb}</span>`);
    html = html.replace(/<h1 class="detail-title">[\s\S]*?<\/h1>/, `<h1 class="detail-title">\${page.title} <span class="badge">v1.0</span></h1>`);
    
    // 2. Prompt Text
    html = html.replace(/<div class="prompt-text">[\s\S]*?<\/div>/, `<div class="prompt-text">\${page.prompt}</div>`);
    
    // 3. Variables
    let varHtml = '';
    page.vars.forEach(v => {
        varHtml += `
            <div class="var-group">
                <label>\${v.label}</label>
                <input type="text" class="var-input" placeholder="\${v.placeholder}" data-var="\${v.id}">
            </div>`;
    });
    // Replace all existing var-groups
    html = html.replace(/<div class="var-group">[\s\S]*?<\/div>(?=\s*<div class="var-group">|\s*<button)/g, ''); // Removes existing
    // Insert new vars right before the button
    html = html.replace(/(<button class="btn btn-primary" style="width: 100%;)/, varHtml + '\n$1');
    
    // 4. Update the JS Logic to match data-var attributes dynamically
    // Wait, the base html JS logic relies on label text matching. Let's fix the JS block for this file to use data-var.
    const newJsLogic = `
            const applyBtns = Array.from(document.querySelectorAll('.btn-primary')).filter(btn => btn.textContent.includes('적용하여 프롬프트 완성하기'));
            const applyBtn = applyBtns.length > 0 ? applyBtns[0] : null;
            const varGroups = document.querySelectorAll('.var-group');
            const promptTextContainer = document.querySelector('.prompt-text');
            
            if (promptTextContainer && applyBtn) {
                const originalPromptHTML = promptTextContainer.innerHTML;
                applyBtn.addEventListener('click', () => {
                    let currentHTML = originalPromptHTML;
                    varGroups.forEach(group => {
                        const input = group.querySelector('input');
                        const varId = input.getAttribute('data-var');
                        const val = input.value.trim();
                        if (val && varId) {
                            const regex = new RegExp('<span class="variable">\\\\s*' + varId.replace(/\\[/g,'\\\\[').replace(/\\]/g,'\\\\]') + '\\\\s*<\\\\/span>', 'g');
                            currentHTML = currentHTML.replace(regex, '<span class="variable filled">' + val + '</span>');
                        }
                    });
                    promptTextContainer.innerHTML = currentHTML;
                });
            }
    `;
    // Replace JS block
    html = html.replace(/const applyBtns = [\s\S]*?(?=\/\/ 2\. Clipboard)/, newJsLogic);

    // 5. Replace Right Column Workflow (활용 가이드)
    // Find the right-col div and replace its content
    const rightColStart = html.indexOf('<div class="right-col">');
    const rightColEnd = html.indexOf('</div>', html.lastIndexOf('</div>', html.indexOf('<!-- Main Content END -->'))); // roughly... it's safer to just replace the inner panels
    
    const panelStart = html.indexOf('<div class="panel">', rightColStart);
    const rightColClose = html.indexOf('</div>', html.lastIndexOf('<div class="example-box">')) + 15; // approximate
    
    // Let's use regex to replace the panels inside right-col
    html = html.replace(/<div class="right-col">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, 
    `<div class="right-col">
        <div class="panel">
            <div class="panel-header"><h2 class="panel-title"><i class="ph ph-rocket-launch"></i> 실전 수익화 워크플로우</h2></div>
            \${page.workflow}
        </div>
        <div class="panel">
            <div class="panel-header"><h2 class="panel-title"><i class="ph ph-lightbulb"></i> 프롬프트 활용 꿀팁</h2></div>
            <p style="font-size:0.95rem; color:#475569; line-height:1.6;">좌측의 변수 입력칸을 모두 채운 뒤 <strong>[적용하여 프롬프트 완성하기]</strong> 버튼을 누르세요. 이후 복사 버튼을 눌러 ChatGPT나 Claude에 그대로 붙여넣기 하시면 됩니다.</p>
        </div>
    </div></div></div>`);

    fs.writeFileSync(path.join(dir, page.filename), html);
});

console.log('Group 1 Prompts built: ' + group1Pages.length);

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'resource');

const platformWorkflows = {
    'platform-image.html': `
        <div class="guide-container" style="margin-bottom: 2rem; background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
            <h2 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;"><i class="ph ph-money" style="color:#10b981;"></i> 디자인 수익화 자동화 워크플로우</h2>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>1단계:</strong> ChatGPT/Claude를 통해 뽑아낸 강력한 후킹 카피를 준비합니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>2단계:</strong> Midjourney로 시선을 끄는 초고화질 이미지를 생성합니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>3단계:</strong> Canva(캔바)의 대량 제작 기능을 활용해 카피와 이미지를 결합, 인스타 카드뉴스 30일 치를 1시간 만에 생산합니다.</p>
        </div>
    `,
    'platform-audio.html': `
        <div class="guide-container" style="margin-bottom: 2rem; background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
            <h2 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;"><i class="ph ph-money" style="color:#10b981;"></i> 얼굴 없는 유튜버 수익화 워크플로우</h2>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>1단계:</strong> '쇼츠/릴스 대본 작성' 프롬프트를 통해 대본을 완성합니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>2단계:</strong> ElevenLabs에 대본을 넣어 감정이 실린 인간다운 더빙(음성) 파일로 추출합니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>3단계:</strong> 유튜브에 업로드하고 본문에 텐핑(CPA) 앱 설치 링크를 남겨 자동 수익을 창출합니다.</p>
        </div>
    `,
    'platform-video.html': `
        <div class="guide-container" style="margin-bottom: 2rem; background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
            <h2 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;"><i class="ph ph-money" style="color:#10b981;"></i> 숏폼 공장장 수익화 워크플로우</h2>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>1단계:</strong> Midjourney로 생성한 정지된 이미지를 Pika Labs나 Runway에 넣어 움직이는 영상(B롤)으로 만듭니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>2단계:</strong> CapCut PC 버전에 영상과 ElevenLabs 목소리를 올리면 자막까지 원클릭으로 완성됩니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>3단계:</strong> 유튜브 파트너 프로그램(조회수 수익) 및 쿠팡 파트너스 링크 클릭을 유도하여 듀얼 수입 파이프라인을 엽니다.</p>
        </div>
    `,
    'platform-planning.html': `
        <div class="guide-container" style="margin-bottom: 2rem; background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
            <h2 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;"><i class="ph ph-money" style="color:#10b981;"></i> 블로그 무한 포스팅 수익화 워크플로우</h2>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>1단계:</strong> Gemini를 이용해 최신 트렌드 키워드를 대량 수집합니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>2단계:</strong> Claude 3.5 Sonnet에게 유저님의 [감시 룰셋 프롬프트]를 먹여 고품질의 원고로 변환시킵니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>3단계:</strong> 기계가 쓴 티가 1도 나지 않는 칼럼을 하루 10개씩 티스토리에 배포하여 구글 애드센스 승인과 트래픽을 선점합니다.</p>
        </div>
    `,
    'platform-marketing.html': `
        <div class="guide-container" style="margin-bottom: 2rem; background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
            <h2 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;"><i class="ph ph-money" style="color:#10b981;"></i> 고단가 CPA/세일즈 폭발 워크플로우</h2>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>1단계:</strong> Copy.ai 나 뤼튼을 사용해 다이어트, 개인회생 등 타겟의 공포심을 자극하는 상세페이지 카피를 짭니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>2단계:</strong> 지식인 마케팅 시 답변 서두에 마케팅 툴이 뽑아준 '공감+해결책' 템플릿을 붙여 신뢰도를 얻습니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>3단계:</strong> 하단에 디비센스나 텐핑의 CPA 무료상담 링크를 남겨 글 한 개로 수십만 원의 수익을 발생시킵니다.</p>
        </div>
    `,
    'platform-automation.html': `
        <div class="guide-container" style="margin-bottom: 2rem; background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid var(--border-color); box-shadow: 0 2px 10px rgba(0,0,0,0.02);">
            <h2 style="font-size: 1.25rem; color: #1e293b; margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem;"><i class="ph ph-money" style="color:#10b981;"></i> 무인 자동화 파이프라인 워크플로우</h2>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>1단계:</strong> Zapier를 통해 인스타그램 새 게시물이 올라오면 자동으로 워드프레스에 포스팅되도록 연동합니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>2단계:</strong> 들어온 수익금 내역을 Make(Integromat)을 통해 노션(Notion) 데이터베이스로 매일 자동 기록합니다.</p>
            <p style="font-size: 1rem; color: #475569; margin-bottom: 0.5rem;"><strong>3단계:</strong> 부업에 들어가는 시간을 하루 30분으로 줄이고, 남는 시간엔 다른 채널(유튜브, 카페) 확장에 집중합니다.</p>
        </div>
    `
};

let count = 0;
for (const [filename, workflowHtml] of Object.entries(platformWorkflows)) {
    const filePath = path.join(dir, filename);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find the directory-grid and insert the workflow BEFORE it
        const gridIdx = content.indexOf('<div class="directory-grid">');
        if (gridIdx !== -1) {
            content = content.substring(0, gridIdx) + workflowHtml + '\n' + content.substring(gridIdx);
            fs.writeFileSync(filePath, content);
            count++;
        }
    }
}

console.log('Injected monetization workflows into ' + count + ' AI Platform pages.');

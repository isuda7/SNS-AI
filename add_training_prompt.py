import os

html_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"
js_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/js/app.js"

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Update Header Actions
old_header = '<div id="header-action-container"></div>'
new_header = """<div style="display:flex; gap:0.5rem; align-items:center;">
                    <button class="btn btn-secondary" onclick="openTrainingModal()" style="border-color:var(--primary); color:var(--primary);">⚙️ AI 학습 프롬프트</button>
                    <div id="header-action-container"></div>
                </div>"""

if old_header in html:
    html = html.replace(old_header, new_header)

# Add Training Modal
old_modal_end = "<!-- Toast -->"

training_prompt_text = """[시스템 초기화 및 학습 프롬프트]
당신은 지금부터 '프리미엄 미니멀리즘' 미학이 적용된 프론트엔드 정적 블로그(대시보드) 시스템의 메인 AI 에이전트입니다.

1. 아키텍처 규칙:
- 본 프로젝트는 DB(백엔드) 없이, `dashboard/data/` 폴더 하위에 있는 `.js` 물리 파일들(카테고리명.js)로 데이터를 관리합니다.
- 대시보드 화면(UI)은 오직 Read-Only 뷰어 역할 및 프롬프트 생성 역할만 수행하며, 실제 원고의 생성/삭제/수정은 사용자가 당신에게 내리는 '채팅 프롬프트(바이브 코딩)'를 통해서만 파일 단위로 처리되어야 합니다.

2. 원고 작성 룰셋 (감시 기준):
- 분량: 모든 원고 본문은 띄어쓰기(공백)를 제외하고 무조건 1,500자를 초과해야 합니다. (SEO 패널티 방지)
- 미디어: 본문 최상단에 관련 이미지(무료 이미지 링크) 딱 1개만 사용합니다.
- 포맷: 텍스트만 지루하게 나열하지 말고, Q&A나 비교 리스트 등을 HTML 태그로 적절히 구성하여 체류시간을 늘리세요.

3. 커스텀 룰 (AGENTS.md 연동):
- 사용자가 새로운 원고 작성 제약(예: 평어체 금지, 특정 단어 금지 등)을 내리면, 그것을 `dashboard/index.html` 파일 내의 '감시(Audit) 프롬프트' 모달 안에도 자동으로 업데이트(기록)해야 합니다.

위의 시스템 규칙을 모두 숙지하고, 앞으로 주어지는 원고 작성/삭제 명령을 완벽하게 수행하십시오."""

training_modal_html = f"""    <!-- Training Modal -->
    <div class="full-modal-overlay" id="training-modal">
        <div class="full-modal-content" style="width: 700px; height: auto; max-height: 90%;">
            <div class="modal-header" style="padding: 1.5rem 2rem;">
                <h2 style="font-size: 1.5rem; display:flex; align-items:center; gap:0.5rem;">⚙️ 환경 셋업용 AI 학습 프롬프트</h2>
                <button class="btn-close" onclick="closeTrainingModal()">&times;</button>
            </div>
            
            <div class="modal-body" style="padding: 1.5rem 2rem; background:#f9fafb;">
                <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.95rem;">
                    다른 노트북이나 새로운 채팅 환경에서 작업할 때, 가장 먼저 이 프롬프트를 복사해서 AI에게 먹이세요(학습시키세요). 프로젝트의 전체 구조와 핵심 룰을 단번에 이해하게 됩니다.
                </p>
                <textarea class="prompt-textarea" id="training-prompt-textarea" style="height: 350px; background:#ffffff; color:#000; font-family:monospace; line-height:1.5;">{training_prompt_text}</textarea>
            </div>
            
            <div class="modal-footer" style="padding: 1.5rem 2rem;">
                <button class="btn btn-secondary" onclick="closeTrainingModal()">닫기</button>
                <button class="btn btn-primary" onclick="copyModalContent('training-prompt-textarea', this, true)">프롬프트 복사하기</button>
            </div>
        </div>
    </div>

    <!-- Toast -->"""

html = html.replace(old_modal_end, training_modal_html)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

# Update JS
with open(js_path, "r", encoding="utf-8") as f:
    js_content = f.read()

# Add logic for training modal
js_add = """
const trainingModal = document.getElementById('training-modal');
window.openTrainingModal = function() { if(trainingModal) trainingModal.classList.add('show'); };
window.closeTrainingModal = function() { if(trainingModal) trainingModal.classList.remove('show'); };
if(trainingModal) trainingModal.addEventListener('click', (e) => { if (e.target === trainingModal) closeTrainingModal(); });
"""

js_content += js_add

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print("Training prompt added.")

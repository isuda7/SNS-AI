import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/css/style.css"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace root variables
old_root = """:root {
    --bg-dark: #0f172a;
    --sidebar-bg: #1e293b;
    --card-bg: #1e293b;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --primary: #6366f1;
    --primary-hover: #4f46e5;
    --success: #10b981;
    --border: rgba(255, 255, 255, 0.1);
    --font-main: 'Pretendard', -apple-system, sans-serif;
    
    /* Table specific */
    --row-hover: rgba(255, 255, 255, 0.05);
}"""

new_root = """:root {
    --bg-dark: #f1f5f9;
    --sidebar-bg: #ffffff;
    --card-bg: #ffffff;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --primary: #4f46e5;
    --primary-hover: #4338ca;
    --success: #059669;
    --border: #e2e8f0;
    --font-main: 'Pretendard', -apple-system, sans-serif;
    
    /* Table specific */
    --row-hover: #f8fafc;
}"""

content = content.replace(old_root, new_root)

# Replace other hardcoded dark/transparent colors
replacements = {
    'rgba(255,255,255,0.1)': 'rgba(0,0,0,0.05)',
    'rgba(255,255,255,0.05)': 'rgba(0,0,0,0.03)',
    'rgba(255,255,255,0.03)': 'rgba(0,0,0,0.02)',
    'background: rgba(0,0,0,0.2)': 'background: #f8fafc',
    'color: white;': 'color: #ffffff;',
    'color: #cbd5e1;': 'color: #94a3b8;',
    'background: #0b1120;': 'background: #ffffff;',
    'color: #e2e8f0;': 'color: #1e293b;',
    'border: 1px solid rgba(255,255,255,0.1);': 'border: 1px solid var(--border);',
    '.btn-close:hover {\n    color: white;\n}': '.btn-close:hover {\n    color: var(--text-main);\n}',
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Light theme applied.")

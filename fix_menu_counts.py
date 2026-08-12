import re

html_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/index.html"
css_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/css/style.css"

# 1. Update index.html
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Match: <li><a href="#" data-filter="..."><span>...</span></a></li>
# Replace with: <li><a href="#" data-filter="..."><span>...</span> <span class="cat-count">0</span></a></li>

new_html = re.sub(
    r'(<li><a href="#" data-filter="[^"]+"><span>[^<]+</span>)(</a></li>)',
    r'\1 <span class="cat-count">0</span>\2',
    html
)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(new_html)
print("Updated index.html with cat-count spans.")

# 2. Update css/style.css
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

if ".cat-count" not in css:
    cat_count_css = """
.cat-count {
    background-color: var(--bg-color);
    padding: 0.15rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 600;
}
"""
    # Insert right after .category-tree li a { ... } block
    new_css = re.sub(
        r'(\.category-tree li a \{[^}]+\})',
        r'\1\n' + cat_count_css,
        css
    )
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(new_css)
    print("Updated style.css with .cat-count styling.")
else:
    print(".cat-count styling already exists in style.css.")


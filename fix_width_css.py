import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/css/style.css"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace main-wrapper to allow horizontal scroll
old_wrapper = """.main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 64px;
    height: calc(100vh - 64px);
    overflow: hidden; 
    background: var(--bg-dark);
}"""

new_wrapper = """.main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 64px;
    height: calc(100vh - 64px);
    overflow-y: hidden;
    overflow-x: auto; /* Allow horizontal scroll */
    background: var(--bg-dark);
}"""

# Replace dashboard-content to remove max-width and add min-width
old_content = """.dashboard-content {
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}"""

new_content = """.dashboard-content {
    padding: 3rem 4rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 1200px; /* Force minimum width to trigger scroll */
    width: 100%;
}"""

content = content.replace(old_wrapper, new_wrapper)
content = content.replace(old_content, new_content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Width restrictions removed, min-width applied.")

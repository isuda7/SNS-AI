import os

file_path = "/Users/jochangi/Desktop/Workspaces/My/SNS-AI/dashboard/css/style.css"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace table-container
old_container = """.table-container {
    flex: 1;
    background: var(--card-bg);
    border: 1px solid var(--border-light);
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}"""

new_container = """.table-container {
    flex: 1;
    background: var(--card-bg);
    border: 1px solid var(--border-light);
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    overflow-y: auto;
    display: block;
}"""

# Replace table styles
old_table = """.data-table thead {
    background: #ffffff;
    border-bottom: 1px solid var(--border-light);
}

.data-table th {
    padding: 1.2rem 1.5rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.data-table tbody {
    display: block; 
    max-height: calc(100vh - 280px);
    overflow-y: auto;
}

.data-table thead, .data-table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}"""

new_table = """.data-table thead {
    background: #ffffff;
    position: sticky;
    top: 0;
    z-index: 10;
}

.data-table thead::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid var(--border-light);
}

.data-table th {
    padding: 1.2rem 1.5rem;
    font-size: 0.75rem;
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: #ffffff;
}"""

content = content.replace(old_container, new_container)
content = content.replace(old_table, new_table)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Table CSS fixed.")

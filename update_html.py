import re
import glob

# Add 'reveal' class to specific elements in HTML files
files = glob.glob("/Users/jochangi/Desktop/Workspaces/My/SNS-AI/marketing/*.html")

for filepath in files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Add reveal to section-title and section-desc
    content = re.sub(r'class="section-title([^"]*)"', r'class="section-title reveal\1"', content)
    content = re.sub(r'class="section-desc([^"]*)"', r'class="section-desc reveal\1"', content)

    # Add reveal to model-cards
    content = re.sub(r'class="model-card([^"]*)"', r'class="model-card reveal\1"', content)

    # Add reveal to timeline-items
    content = re.sub(r'class="timeline-item([^"]*)"', r'class="timeline-item reveal\1"', content)

    # Add reveal to channel sections
    content = re.sub(r'class="channel-content([^"]*)"', r'class="channel-content reveal\1"', content)
    content = re.sub(r'class="channel-visual([^"]*)"', r'class="channel-visual reveal\1"', content)
    
    # Add reveal to accordion items
    content = re.sub(r'class="accordion-item([^"]*)"', r'class="accordion-item reveal\1"', content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Added reveal animations to HTML files.")

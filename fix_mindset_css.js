const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'resource', 'prompt-mindset.html');
let content = fs.readFileSync(filePath, 'utf8');

// Regex to find the <style> block and replace it
const styleRegex = /<style>[\s\S]*?<\/style>/;

const newStyle = `<style>
                .mindset-flow {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                    padding: 2rem 0;
                    position: relative;
                }
                .mindset-flow::before {
                    content: '';
                    position: absolute;
                    left: calc(2rem - 1px); /* Perfectly centered behind 4rem icon */
                    top: 2rem;
                    bottom: 2rem;
                    width: 2px;
                    background: rgba(99, 102, 241, 0.3);
                    z-index: 1;
                }
                .mindset-step {
                    display: flex;
                    gap: 2rem;
                    position: relative;
                }
                .mindset-icon-wrapper {
                    width: 4rem;
                    height: 4rem;
                    background: #ffffff;
                    border: 2px solid var(--primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.75rem;
                    color: var(--primary);
                    z-index: 2;
                    flex-shrink: 0;
                    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.15);
                }
                .mindset-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 1.8rem;
                    flex: 1;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
                }
                .mindset-card:hover {
                    transform: translateY(-2px);
                    border-color: rgba(99, 102, 241, 0.5);
                    box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.1);
                }
                .mindset-card h3 {
                    color: #1e293b;
                    margin-bottom: 0.8rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.25rem;
                }
                .mindset-card h3 .step-num {
                    background: rgba(99, 102, 241, 0.1);
                    color: var(--primary);
                    font-size: 0.85rem;
                    padding: 0.2rem 0.6rem;
                    border-radius: 20px;
                    font-weight: 600;
                }
                .mindset-card p {
                    color: #475569;
                    line-height: 1.6;
                    margin-bottom: 1.2rem;
                }
                .mindset-example {
                    background: #f8fafc;
                    padding: 1.2rem;
                    border-radius: 8px;
                    border-left: 4px solid var(--primary);
                    color: #334155;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    border-right: 1px solid #e2e8f0;
                    border-top: 1px solid #e2e8f0;
                    border-bottom: 1px solid #e2e8f0;
                }
                .mindset-example strong {
                    color: var(--primary);
                    margin-right: 0.5rem;
                    font-weight: 600;
                }
                
                .partner-quote {
                    background: #f8fafc;
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    border-radius: 12px;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    text-align: center;
                    font-size: 1.1rem;
                    color: #1e293b;
                    font-weight: 600;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                }
                .partner-quote i {
                    color: var(--primary);
                    font-size: 1.5rem;
                    vertical-align: middle;
                    margin-right: 0.5rem;
                }
            </style>`;

content = content.replace(styleRegex, newStyle);
fs.writeFileSync(filePath, content);
console.log('Fixed CSS for light theme readability in prompt-mindset.html');

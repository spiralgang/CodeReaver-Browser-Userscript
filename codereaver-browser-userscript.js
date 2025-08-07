// ==UserScript==
// @name         CodeReaver-Browser-Userscript
// @namespace    https://github.com/spiralgang/CodeReaver-Browser-Userscript
// @version      1.1.0
// @description  Enhances web development on code-hosting platforms with AI-powered tooltips for code terms and calculations, plus visual code block enhancements, optimized for Chromium-based browsers on Android and desktop
// @author       CodeReaver
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @match        https://gitlab.com/*
// @match        https://bitbucket.org/*
// @match        https://codepen.io/*
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    // Configuration: Replace with your xAI API key (get it from https://x.ai/api)
    const XAI_API_URL = 'https://x.ai/api/chat'; // Hypothetical xAI API endpoint
    const API_KEY = 'YOUR_XAI_API_KEY'; // Replace with your actual key

    // Inject styles for tooltips and code block enhancements
    GM_addStyle(`
        .cr-tooltip {
            position: absolute;
            background: #24292e;
            color: #fff;
            padding: 6px 10px;
            border-radius: 3px;
            font-size: 12px;
            line-height: 1.5;
            z-index: 1000000;
            max-width: 250px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
            transform: translateX(-50%);
        }
        .cr-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border: 5px solid transparent;
            border-top-color: #24292e;
        }
        .cr-tooltip.visible {
            opacity: 1;
        }
        .cr-code-block {
            transition: background-color 0.2s ease;
        }
        .cr-code-block:hover {
            background-color: rgba(200, 200, 200, 0.1);
        }
        @media (max-width: 600px) {
            .cr-tooltip {
                font-size: 11px;
                padding: 5px 8px;
                max-width: 80vw;
            }
            .cr-code-block {
                padding: 5px;
            }
        }
    `);

    // Fetch AI-powered tooltip text for code terms or calculations
    async function getAITooltipText(content) {
        // Check if content is a calculation (e.g., "2 + 2") or code-related term
        const isMath = content.match(/^\s*\d+\s*[\+\-\*\/]\s*\d+\s*$/);
        const isCodeTerm = content.match(/^(function|class|const|let|var|if|for|while|return|display|flex|grid|margin|padding)\b/i);
        if (!isMath && !isCodeTerm || API_KEY === 'YOUR_XAI_API_KEY') return content; // Fallback to original content

        const prompt = isMath
            ? `Solve: ${content}`
            : `Provide a brief explanation of the programming term "${content}" in the context of web development. Keep it under 50 words.`;

        return new Promise((resolve) => {
            GM_xmlhttpRequest({
                method: 'POST',
                url: XAI_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                data: JSON.stringify({
                    model: 'grok-3',
                    temperature: 0,
                    messages: [
                        { role: 'system', content: 'You are an expert in web development and mathematics.' },
                        { role: 'user', content: prompt }
                    ]
                }),
                onload: (response) => {
                    try {
                        let result = JSON.parse(response.responseText);
                        resolve(result.content || content);
                    } catch (e) {
                        resolve(content); // Fallback on parse error
                    }
                },
                onerror: () => resolve(content) // Fallback on network error
            });
        });
    }

    // Show tooltip at element position
    function showTooltip(element, text) {
        let tooltip = document.createElement('div');
        tooltip.className = 'cr-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        let rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
        tooltip.classList.add('visible');
        return tooltip;
    }

    // Hide and remove tooltip
    function hideTooltip(tooltip) {
        if (tooltip) tooltip.remove();
    }

    // Process elements with title attributes or code-related text
    async function processElements() {
        // Handle elements with title attributes
        document.querySelectorAll('[title]:not([data-cr-tooltip])').forEach(async (element) => {
            let title = element.getAttribute('title');
            element.setAttribute('data-cr-tooltip', title);
            element.removeAttribute('title');

            let aiText = await getAITooltipText(title);
            let tooltip = null;

            // Desktop: Mouse events
            element.addEventListener('mouseover', async () => {
                tooltip = showTooltip(element, aiText);
            });
            element.addEventListener('mouseout', () => {
                hideTooltip(tooltip);
                tooltip = null;
            });
            element.addEventListener('mousemove', () => {
                if (tooltip) {
                    let rect = element.getBoundingClientRect();
                    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
                }
            });

            // Mobile: Touch events
            element.addEventListener('touchstart', async (e) => {
                e.preventDefault();
                if (!tooltip) tooltip = showTooltip(element, aiText);
                setTimeout(() => hideTooltip(tooltip), 3000);
            }, { passive: false });
            element.addEventListener('contextmenu', (e) => e.preventDefault());
        });

        // Enhance code blocks
        document.querySelectorAll('pre, code').forEach((element) => {
            if (element.hasAttribute('data-cr-enhanced')) return;
            element.setAttribute('data-cr-enhanced', 'true');
            element.classList.add('cr-code-block');
        });
    }

    // Observe DOM for dynamic content
    const observer = new MutationObserver(processElements);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial processing
    processElements();
})();

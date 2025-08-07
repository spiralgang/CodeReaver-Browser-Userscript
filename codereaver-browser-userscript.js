// ==UserScript==
// @name         CodeReaver-Browser-Userscript
// @namespace    https://github.com/spiralgang/CodeReaver-Browser-Userscript
// @version      1.2.0
// @description  Supercharges webdev on code-hosting platforms with AI-powered tooltips for code terms and calculations, dynamic code block enhancements, and context-aware triggers, optimized for Chromium-based browsers on Android and desktop
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

    // Configuration
    const XAI_API_URL = 'https://x.ai/api/chat'; // Hypothetical xAI API endpoint
    const API_KEY = 'YOUR_XAI_API_KEY'; // Replace with your actual key

    // Local dictionary for offline tooltips (expanded for webdev terms)
    const TERM_DICTIONARY = {
        'function': 'A JavaScript block of code designed to perform a task, e.g., `function add(a, b) { return a + b; }`.',
        'flex': 'A CSS layout model for flexible box arrangements, e.g., `display: flex` aligns items dynamically.',
        'grid': 'A CSS layout system for two-dimensional designs, e.g., `display: grid` creates rows and columns.',
        'const': 'A JavaScript keyword for declaring immutable variables, e.g., `const x = 10`.',
        'async': 'A JavaScript keyword for asynchronous functions, e.g., `async function fetchData() { await ... }`.'
        // Add more terms as needed
    };

    // Inject styles for tooltips and code blocks
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
        .cr-code-block, .cr-term {
            transition: background-color 0.2s ease;
            cursor: help;
        }
        .cr-code-block:hover, .cr-term:hover {
            background-color: rgba(200, 200, 200, 0.1);
        }
        @media (max-width: 600px) {
            .cr-tooltip {
                font-size: 11px;
                padding: 5px 8px;
                max-width: 80vw;
            }
            .cr-code-block, .cr-term {
                padding: 5px;
            }
        }
    `);

    // Secure local evaluation for math expressions
    function evaluateMath(expr) {
        try {
            // Strict regex to allow only simple math operations
            if (!expr.match(/^\s*[\d\s+\-*/().]+\s*$/)) return null;
            // Use Function constructor to avoid eval risks
            const fn = new Function(`return ${expr};`);
            return fn().toString();
        } catch (e) {
            return null;
        }
    }

    // Fetch AI-powered or local tooltip text
    async function getTooltipText(content) {
        // Check if content is a calculation or code term
        const isMath = content.match(/^\s*[\d\s+\-*/()]+\s*$/);
        const isCodeTerm = content.match(/^(function|class|const|let|var|if|for|while|return|display|flex|grid|margin|padding|async|await)\b/i);

        // Local fallback if no API key or not a recognized term
        if (!isMath && !isCodeTerm || API_KEY === 'YOUR_XAI_API_KEY') {
            if (isMath) {
                const result = evaluateMath(content);
                return result || content;
            }
            return TERM_DICTIONARY[content.toLowerCase()] || content;
        }

        const prompt = isMath
            ? `Solve: ${content}`
            : `Explain the webdev term "${content}" in under 50 words.`;

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
                        resolve(TERM_DICTIONARY[content.toLowerCase()] || content);
                    }
                },
                onerror: () => resolve(TERM_DICTIONARY[content.toLowerCase()] || content)
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

    // Process elements for tooltips
    async function processElements() {
        // Handle title and data-tooltip attributes
        document.querySelectorAll('[title]:not([data-cr-tooltip]), [data-tooltip]:not([data-cr-tooltip])').forEach(async (element) => {
            let content = element.getAttribute('title') || element.getAttribute('data-tooltip');
            element.setAttribute('data-cr-tooltip', content);
            if (element.hasAttribute('title')) element.removeAttribute('title');

            let aiText = await getTooltipText(content);
            let tooltip = null;

            const showHandler = async () => {
                tooltip = showTooltip(element, aiText);
            };
            const hideHandler = () => {
                hideTooltip(tooltip);
                tooltip = null;
            };
            const moveHandler = () => {
                if (tooltip) {
                    let rect = element.getBoundingClientRect();
                    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
                }
            };

            element.addEventListener('mouseover', showHandler);
            element.addEventListener('mouseout', hideHandler);
            element.addEventListener('mousemove', moveHandler);
            element.addEventListener('touchstart', async (e) => {
                e.preventDefault();
                if (!tooltip) showHandler();
                setTimeout(() => hideHandler(), 3000);
            }, { passive: false });
            element.addEventListener('contextmenu', (e) => e.preventDefault());
        });

        // Handle code blocks and terms
        document.querySelectorAll('pre, code, a[href*="docs"], a[href*="developer"]').forEach((element) => {
            if (element.hasAttribute('data-cr-enhanced')) return;
            element.setAttribute('data-cr-enhanced', 'true');
            element.classList.add('cr-code-block');

            // Wrap terms in spans for tooltip triggers
            if (element.tagName === 'CODE' || element.tagName === 'PRE') {
                const terms = Object.keys(TERM_DICTIONARY).join('|');
                const termRegex = new RegExp(`\\b(${terms})\\b`, 'gi');
                element.innerHTML = element.innerHTML.replace(termRegex, '<span class="cr-term" data-tooltip="$1">$1</span>');
            }
        });
    }

    // Observe DOM for dynamic content
    const observer = new MutationObserver(() => {
        requestIdleCallback(processElements, { timeout: 1000 });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial processing
    processElements();
})();

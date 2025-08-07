javascript:(function(){
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
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
        .cr-term {
            cursor: help;
            background-color: rgba(200, 200, 200, 0.1);
        }
        @media (max-width: 600px) {
            .cr-tooltip {
                font-size: 11px;
                padding: 5px 8px;
                max-width: 80vw;
            }
        }
    `;
    document.head.appendChild(style);

    // Local dictionary (subset for bookmarklet)
    const TERM_DICTIONARY = {
        'function': 'JavaScript code block for tasks, e.g., `function add(a, b) { return a + b; }`.',
        'flex': 'CSS layout for flexible boxes, e.g., `display: flex`.'
    };

    // Secure math evaluation
    function evaluateMath(expr) {
        try {
            if (!expr.match(/^\s*[\d\s+\-*/().]+\s*$/)) return null;
            const fn = new Function(`return ${expr};`);
            return fn().toString();
        } catch (e) {
            return null;
        }
    }

    // Get tooltip text (local only)
    function getTooltipText(content) {
        const isMath = content.match(/^\s*[\d\s+\-*/()]+\s*$/);
        if (isMath) {
            const result = evaluateMath(content);
            return result || content;
        }
        return TERM_DICTIONARY[content.toLowerCase()] || content;
    }

    // Show tooltip
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

    // Hide tooltip
    function hideTooltip(tooltip) {
        if (tooltip) tooltip.remove();
    }

    // Process elements
    function processElements() {
        document.querySelectorAll('[title], [data-tooltip], .cr-term').forEach((element) => {
            if (element.hasAttribute('data-cr-processed')) return;
            element.setAttribute('data-cr-processed', 'true');
            let content = element.getAttribute('title') || element.getAttribute('data-tooltip') || element.textContent;
            let tooltip = null;

            const showHandler = () => {
                tooltip = showTooltip(element, getTooltipText(content));
            };
            const hideHandler = () => {
                hideTooltip(tooltip);
                tooltip = null;
            };
            element.addEventListener('mouseover', showHandler);
            element.addEventListener('mouseout', hideHandler);
            element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (!tooltip) showHandler();
                setTimeout(() => hideHandler(), 3000);
            }, { passive: false });
        });

        // Add terms in code blocks
        document.querySelectorAll('code, pre').forEach((element) => {
            const terms = Object.keys(TERM_DICTIONARY).join('|');
            const termRegex = new RegExp(`\\b(${terms})\\b`, 'gi');
            element.innerHTML = element.innerHTML.replace(termRegex, '<span class="cr-term">$1</span>');
        });
    }

    processElements();
})();

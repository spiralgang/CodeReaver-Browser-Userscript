// ==UserScript==
// @name         CodeReaver-Webdev-Tools
// @namespace    https://github.com/spiralgang/CodeReaver-Browser-Userscript
// @version      1.1.0
// @description  Boosts web development with responsive navigation, code block interactions, and contextual tools on code-hosting platforms, optimized for Chromium-based browsers on Android and desktop
// @author       CodeReaver
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @match        https://gitlab.com/*
// @match        https://bitbucket.org/*
// @match        https://codepen.io/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // Inject styles for navigation, code blocks, and context menus
    GM_addStyle(`
        .cr-menu-item {
            cursor: pointer !important;
            touch-action: manipulation;
            transition: background-color 0.1s ease, outline 0.1s ease;
        }
        .cr-menu-item:hover, .cr-menu-item:active, .cr-menu-item:focus {
            background-color: rgba(0, 0, 0, 0.1);
            outline: 2px solid #00D4FF; /* Neon blue for cyberpunk vibe */
        }
        .cr-code-block {
            transition: background-color 0.2s ease;
            position: relative;
        }
        .cr-code-block:hover {
            background-color: rgba(200, 200, 200, 0.1);
        }
        .cr-context-menu {
            position: absolute;
            background: #24292e;
            color: #fff;
            border-radius: 3px;
            padding: 8px;
            z-index: 1000000;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            font-size: 12px;
        }
        .cr-context-menu div {
            padding: 4px 8px;
            cursor: pointer;
        }
        .cr-context-menu div:hover {
            background: #00D4FF;
        }
        @media (max-width: 600px) {
            .cr-menu-item {
                padding: 8px;
            }
            .cr-code-block {
                padding: 5px;
            }
            .cr-context-menu {
                font-size: 11px;
                max-width: 80vw;
            }
        }
    `);

    // Debounce function for click handling
    function debounce(fn, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    }

    // Show context menu for code blocks
    function showContextMenu(element, event) {
        const menu = document.createElement('div');
        menu.className = 'cr-context-menu';
        menu.innerHTML = `
            <div class="cr-copy-code">Copy Code</div>
            <div class="cr-open-docs">Search Docs</div>
        `;
        document.body.appendChild(menu);
        menu.style.top = `${event.pageY}px`;
        menu.style.left = `${event.pageX}px`;

        menu.querySelector('.cr-copy-code').addEventListener('click', () => {
            navigator.clipboard.writeText(element.textContent);
            menu.remove();
        });
        menu.querySelector('.cr-open-docs').addEventListener('click', () => {
            const term = element.textContent.split(/\s+/)[0] || 'javascript';
            window.open(`https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(term)}`, '_blank');
            menu.remove();
        });

        return menu;
    }

    // Hide context menu
    function hideContextMenu(menu) {
        if (menu) menu.remove();
    }

    // Enhance navigation and code interactions
    function enhanceInteractions() {
        const selectors = [
            '[id*="nav"], [id*="menu"], [class*="nav"], [class*="menu"]',
            '[aria-label*="navigation"], [aria-label*="menu"]',
            '[role="navigation"], button:not([type="submit"]), [role="button"], [aria-expanded]',
            'pre, code'
        ].join(', ');
        document.querySelectorAll(selectors).forEach(item => {
            if (item.hasAttribute('data-cr-enhanced')) return;
            item.setAttribute('data-cr-enhanced', 'true');

            if (item.matches('pre, code')) {
                item.classList.add('cr-code-block');
                let contextMenu = null;
                item.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    hideContextMenu(contextMenu);
                    contextMenu = showContextMenu(item, e);
                });
                document.addEventListener('click', () => hideContextMenu(contextMenu));
            } else {
                item.classList.add('cr-menu-item');
                item.setAttribute('tabindex', '0'); // Enable keyboard focus
                const originalClick = item.onclick || (() => {});
                item.onclick = debounce((event) => {
                    console.log('Enhanced click on:', item);
                    originalClick.call(item, event);
                    setTimeout(() => {
                        if (!item.classList.contains('active') && !item.getAttribute('aria-expanded')) {
                            console.log('Retrying click on:', item);
                            item.click();
                        }
                    }, 300);
                }, 150);

                // Keyboard navigation
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.click();
                    }
                });
            }
        });
    }

    // Observe DOM for dynamic content (SPA support)
    const observer = new MutationObserver(() => {
        requestIdleCallback(enhanceInteractions, { timeout: 1000 });
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'aria-expanded'] });

    // Android touch optimization
    if (/Android/.test(navigator.userAgent)) {
        document.addEventListener('touchstart', (e) => {
            const target = e.target.closest('[id*="nav"], [id*="menu"], [class*="nav"], [class*="menu"], [aria-label*="navigation"], [aria-label*="menu"], [role="navigation"], button:not([type="submit"]), [role="button"], [aria-expanded]');
            if (target) target.click();
        }, { passive: true });
    }

    // Initial setup
    window.addEventListener('load', enhanceInteractions);
})();

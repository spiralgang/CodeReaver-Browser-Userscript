// ==UserScript==
// @name         CodeReaver-Webdev-Tools
// @namespace    https://github.com/spiralgang/CodeReaver-Browser-Userscript
// @version      1.0.0
// @description  Boosts web development with responsive navigation and code block interactions on code-hosting platforms, optimized for Chromium-based browsers on Android and desktop
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

    // Inject styles for responsive menus and code blocks
    GM_addStyle(`
        .cr-menu-item {
            cursor: pointer !important;
            touch-action: manipulation;
            transition: background-color 0.1s ease;
        }
        .cr-menu-item:hover, .cr-menu-item:active {
            background-color: rgba(0, 0, 0, 0.1);
        }
        .cr-code-block {
            transition: background-color 0.2s ease;
        }
        .cr-code-block:hover {
            background-color: rgba(200, 200, 200, 0.1);
        }
        @media (max-width: 600px) {
            .cr-menu-item {
                padding: 8px;
            }
            .cr-code-block {
                padding: 5px;
            }
        }
    `);

    // Debounce function to prevent double-clicks
    function debounce(fn, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    }

    // Enhance navigation and code interaction
    function enhanceInteractions() {
        const selectors = [
            '[id*="nav"], [id*="menu"], [class*="nav"], [class*="menu"]',
            '[aria-label*="navigation"], [aria-label*="menu"]',
            'pre, code'
        ].join(', ');
        document.querySelectorAll(selectors).forEach(item => {
            if (item.hasAttribute('data-cr-enhanced')) return;
            item.setAttribute('data-cr-enhanced', 'true');

            if (item.matches('pre, code')) {
                item.classList.add('cr-code-block');
            } else {
                item.classList.add('cr-menu-item');
                const originalClick = item.onclick || (() => {});
                item.onclick = debounce((event) => {
                    console.log('Enhanced click on:', item);
                    originalClick.call(item, event);
                    setTimeout(() => {
                        if (!item.classList.contains('active')) {
                            console.log('Retrying click on:', item);
                            item.click();
                        }
                    }, 300);
                }, 150);
            }
        });
    }

    // Observe DOM for dynamic content
    const observer = new MutationObserver(() => {
        requestIdleCallback(enhanceInteractions, { timeout: 1000 });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Android touch optimization
    if (/Android/.test(navigator.userAgent)) {
        document.addEventListener('touchstart', (e) => {
            const target = e.target.closest('[id*="nav"], [id*="menu"], [class*="nav"], [class*="menu"], [aria-label*="navigation"], [aria-label*="menu"]');
            if (target) target.click();
        }, { passive: true });
    }

    // Initial setup
    window.addEventListener('load', enhanceInteractions);
})();

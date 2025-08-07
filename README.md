# CodeReaver-Browser-Userscript

A collection of userscripts to supercharge web development on code-hosting platforms like GitHub, GitLab, Bitbucket, and CodePen, with AI-enhanced tooltips, responsive navigation, and code block interactions, optimized for Chromium-based browsers on Android and desktop.

## Meet the Code-Reaver
The Code-Reaver is the fierce spirit behind these scripts, a webdev master forging tools to amplify your coding workflow. Its icon—a neon blade slicing through code—embodies its mission to cut through browser inefficiencies. Channel its expertise with the AI persona prompt in [CODE_REAVER_PROMPT.md](CODE_REAVER_PROMPT.md).

## Scripts
1. **CodeReaver-Browser-Userscript** (`codereaver-browser-userscript.js`)
   - AI-powered tooltips for code terms and calculations in `title` or `data-tooltip` attributes, with local fallback for offline use.
   - Dynamic tooltips for code terms in `pre`/`code` elements.
   - Hover effects for code blocks to enhance readability.
2. **CodeReaver-Webdev-Tools** (`codereaver-webdev-tools.js`)
   - Responsive navigation menus with debounced clicks, keyboard support, and touch optimization.
   - Code block interactions with hover effects and context menus (copy code, search docs).
3. **Bookmarklets**
   - **Tooltip Bookmarklet** (`codereaver-bookmarklet.js`): Basic tooltips without Tampermonkey.
   - **Webdev Bookmarklet** (`codereaver-webdev-bookmarklet.js`): Navigation and code block enhancements without extensions.

## Features
- **AI Tooltips**: Explains code terms and calculations using xAI’s Grok 3 API or a local dictionary/math evaluator.
- **Dynamic Triggers**: Tooltips activate on `title`, `data-tooltip`, or code terms in `pre`/`code` elements.
- **Code Block Enhancements**: Hover effects and context menus for copying code or searching documentation.
- **Responsive Navigation**: Smooth menu interactions with debounced clicks, keyboard support, and touch events.
- **Mobile-Friendly**: Optimized for Android Chromium browsers with adaptive styling.
- **Bookmarklet Option**: Run basic features without Tampermonkey for accessibility.

## Installation
### Tampermonkey (Recommended)
1. Install [Tampermonkey](https://www.tampermonkey.net/) on your browser.
2. Copy the script from `codereaver-browser-userscript.js` or `codereaver-webdev-tools.js`.
3. Create a new script in Tampermonkey and paste the code.
4. For `CodeReaver-Browser-Userscript`, replace `YOUR_XAI_API_KEY` with your xAI API key from [xAI API](https://x.ai/api).
5. Save and enable the script.

### Bookmarklets (No Extension)
1. Copy the code from `codereaver-bookmarklet.js` or `codereaver-webdev-bookmarklet.js`.
2. Create a new bookmark in your browser and paste the code as the URL (prepend `javascript:`).
3. Click the bookmark on a supported site (GitHub, GitLab, etc.) to activate tooltips or navigation enhancements.
4. Note: Bookmarklets support local features only (no xAI API or context menus).

## Requirements
- Chromium-based browser (e.g., Chrome, Samsung Internet) on Android or desktop.
- Tampermonkey for full functionality (`GM_addStyle`, `GM_xmlhttpRequest`) in main scripts.
- xAI API key for AI tooltips (optional; local fallback available). 

## Configuration
- **API Key**: Replace `YOUR_XAI_API_KEY` in `codereaver-browser-userscript.js` with your xAI API key. Without it, tooltips use local processing.
- **Supported Sites**: Works on GitHub, GitLab, Bitbucket, and CodePen. Add more `@match` directives for other platforms.
- **Custom Tooltips**: Use `data-tooltip` attributes to define custom tooltip content.
- **Mobile**: Tooltips auto-hide after 3 seconds on Android for a clean experience. 

## Limitations
- AI tooltips with xAI API are limited to supported terms and expressions; local mode handles basic cases.
- Bookmarklet lacks advanced features (e.g., dynamic DOM observation).
- Performance may vary on heavy pages; optimize by limiting observed elements. 

## License
MIT License. See [LICENSE](LICENSE) for details. 

## Contributing
Fork the repo, make changes, and submit a pull request. Ensure compatibility with Android and desktop Chromium browsers. 

## Issues
Report bugs or suggest features in the [Issues](https://github.com/spiralgang/CodeReaver-Browser-Userscript/issues) section.

# CodeReaver-Browser-Userscript

A collection of userscripts to supercharge web development on code-hosting platforms like GitHub, GitLab, Bitbucket, and CodePen, with AI-enhanced tooltips, responsive navigation, and code block interactions, optimized for Chromium-based browsers on Android and desktop.

## Scripts
1. **CodeReaver-Browser-Userscript** (`codereaver-browser-userscript.js`)
   - Adds AI-powered tooltips for code terms and calculations in `title` attributes.
   - Enhances code blocks with hover effects for better readability.
   - Ideal for code reviews, documentation, and live coding.

2. **CodeReaver-Webdev-Tools** (`codereaver-webdev-tools.js`)
   - Boosts responsiveness of navigation menus and code blocks.
   - Ensures smooth interactions for webdev tasks like browsing repositories or editing code.

## Features
- **AI Tooltips**: Provides quick explanations for programming terms (e.g., "function", "flex") and calculations (e.g., "2 + 2") using xAI's Grok 3 API.
- **Code Block Enhancements**: Adds hover effects to `pre` and `code` elements for better focus during code reviews.
- **Responsive Navigation**: Improves menu interactions with debounced clicks and touch support.
- **Mobile-Friendly**: Optimized for Android Chromium browsers (e.g., Chrome, Samsung Internet) with touch events and adaptive styling.
- **Lightweight**: Designed for minimal resource usage on code-hosting platforms.

## Installation
1. Install [Tampermonkey](https://www.tampermonkey.net/) on your browser.
2. Copy the script from `codereaver-browser-userscript.js` or `codereaver-webdev-tools.js`.
3. Create a new script in Tampermonkey and paste the code.
4. For `CodeReaver-Browser-Userscript`, replace `YOUR_XAI_API_KEY` with your xAI API key from [xAI API](https://x.ai/api).
5. Save and enable the script.

## Requirements
- Chromium-based browser (e.g., Chrome, Samsung Internet) on Android or desktop.
- Tampermonkey for `GM_addStyle` and `GM_xmlhttpRequest` support (used in `CodeReaver-Browser-Userscript`).
- xAI API key for AI tooltips (optional; falls back to raw `title` text without a key).

## Configuration
- **API Key** (for `CodeReaver-Browser-Userscript`): Replace `YOUR_XAI_API_KEY` with your xAI API key. Without it, tooltips show raw `title` text.
- **Supported Sites**: Works on GitHub, GitLab, Bitbucket, and CodePen. Add more `@match` directives to include other platforms.
- **Mobile**: Tooltips auto-hide after 3 seconds on Android for a clean experience.

## Limitations
- AI tooltips require a valid xAI API key and are limited to simple calculations (e.g., "2 + 2") or predefined code terms.
- Requires Tampermonkey for full functionality.
- Tooltips depend on elements having `title` attributes.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Contributing
Fork the repo, make changes, and submit a pull request. Ensure compatibility with Android and desktop Chromium browsers.

## Issues
Report bugs or suggest features in the [Issues](https://github.com/spiralgang/CodeReaver-Browser-Userscript/issues) section.

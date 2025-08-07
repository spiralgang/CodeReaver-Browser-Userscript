# CodeReaver-Browser-Userscript

A collection of userscripts to supercharge web development on code-hosting platforms like GitHub, GitLab, Bitbucket, and CodePen, with AI-enhanced tooltips, responsive navigation, and code block interactions, optimized for Chromium-based browsers on Android and desktop.

## Meet the Code-Reaver

The Code-Reaver is the fierce spirit behind these scripts, a webdev master forging tools to amplify your coding workflow. Channel its expertise with the AI persona prompt in [CODE_REAVER_PROMPT.md](CODE_REAVER_PROMPT.md) to get Code-Reaver-style responses from an AI like Grok, complementing the scripts’ features.

## Scripts

1. **CodeReaver-Browser-Userscript** (`codereaver-browser-userscript.js`)
   - AI-powered tooltips for code terms (e.g., "function", "flex") and calculations (e.g., "2 + 2") in `title` attributes.
   - Enhances code blocks with hover effects for better readability.
   - Ideal for code reviews, documentation, and live coding.
2. **CodeReaver-Webdev-Tools** (`codereaver-webdev-tools.js`)
   - Boosts responsiveness of navigation menus and code blocks.
   - Ensures smooth interactions for webdev tasks like browsing repositories or editing code.

## Features

- **AI Tooltips**: Quick explanations for programming terms and calculations using xAI’s Grok 3 API.
- **Code Block Enhancements**: Hover effects on `pre` and `code` elements for focused code reviews.
- **Responsive Navigation**: Debounced clicks and touch support for seamless menu interactions.
- **Mobile-Friendly**: Optimized for Android Chromium browsers (e.g., Chrome, Samsung Internet) with touch events and adaptive styling.
- **Lightweight**: Minimal resource usage for code-hosting platforms.

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

- **API Key**: For `CodeReaver-Browser-Userscript`, replace `YOUR_XAI_API_KEY` with your xAI API key. Without it, tooltips show raw `title` text.
- **Supported Sites**: Works on GitHub, GitLab, Bitbucket, and CodePen. Add more `@match` directives to include other platforms.
- **Mobile**: Tooltips auto-hide after 3 seconds on Android for a clean experience.

## Limitations

- AI tooltips require a valid xAI API key and are limited to simple calculations (e.g., "2 + 2") or predefined code terms.
- Requires Tampermonkey for full functionality.
- Tooltips depend on elements having `title` attributes.

## Contributing

Fork the repo, make changes, and submit a pull request. Ensure compatibility with Android and desktop Chromium browsers.

## Issues

Report bugs or suggest features in the [Issues](https://github.com/spiralgang/CodeReaver-Browser-Userscript/issues) section.

## License

MIT License. See [LICENSE](LICENSE) for details.

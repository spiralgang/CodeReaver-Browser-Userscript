# CodeReaver-Browser-Userscript

A userscript that enhances code-hosting platforms like GitHub, GitLab, Bitbucket, and CodePen with AI-powered tooltips for math expressions, optimized for Chromium-based browsers on Android and desktop.

## Features
- Displays tooltips for elements with `title` attributes containing math expressions (e.g., "2 + 2").
- Uses xAI's Grok 3 API (hypothetical endpoint) to solve math expressions.
- Mobile-friendly with touch support for Android Chromium-based browsers (e.g., Chrome, Samsung Internet).
- Lightweight and optimized for low-resource devices.
- Supports GitHub, GitLab, Bitbucket, and CodePen.

## Installation
1. Install a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) on your browser.
2. Copy the script from `codereaver-browser-userscript.js`.
3. Create a new script in Tampermonkey and paste the code.
4. Replace `YOUR_XAI_API_KEY` in the script with your xAI API key (obtain from [xAI API](https://x.ai/api)).
5. Save and enable the script.

## Requirements
- Chromium-based browser (e.g., Chrome, Samsung Internet) on Android or desktop.
- xAI API key for math expression processing (optional; falls back to raw title if not provided).
- Userscript manager (e.g., Tampermonkey).

## Configuration
- **API Key**: Set `API_KEY` to your xAI API key. Without a valid key, the script displays the original `title` text.
- **Supported Sites**: Works on GitHub, GitLab, Bitbucket, and CodePen. Add more `@match` directives in the script header to support other domains.

## Limitations
- Requires a valid xAI API key for AI-powered math tooltips.
- Math expressions must match the pattern `^\s*\d+\s*[\+\-\*\/]\s*\d+\s*$` (e.g., "2 + 2").
- Touch tooltips auto-hide after 3 seconds on mobile.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Contributing
Fork the repository, make changes, and submit a pull request. Ensure code is mobile-friendly and well-documented.

## Issues
Report bugs or feature requests in the [Issues](https://github.com/spiralgang/CodeReaver-Browser-Userscript/issues) section.

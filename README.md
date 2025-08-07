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
Changes Made
General Webdev Enhancements:
CodeReaver-Browser-Userscript:
Expanded getAITooltipText to handle code-related terms (e.g., "function", "flex") in addition to math expressions, using a regex to detect common programming keywords.
Added hover effects to pre and code elements for better code block visibility, aiding code reviews.
Kept the original title attribute processing but broadened the AI prompt to provide concise explanations for webdev terms.
CodeReaver-Webdev-Tools:
Adapted the Safari scripts’ menu enhancement logic for Chromium browsers, targeting navigation menus and code blocks.
Added responsive click handling with debouncing and touch support for webdev tasks like navigating repositories.
Applied visual feedback to menus and code blocks, inspired by the Safari scripts but generalized for cross-platform use.
Android Compatibility:
Added touch event handlers (touchstart, contextmenu) for both scripts to support Android Chromium browsers. Tooltips and menu clicks work on tap, with tooltips auto-hiding after 3 seconds.
Included mobile-friendly CSS with media queries (@media (max-width: 600px)) to adjust tooltip size (max-width: 80vw, smaller font) and padding for code blocks/menus.
Used touch-action: manipulation in the secondary script to improve touch responsiveness.
Repository Readiness:
Updated metadata: Renamed to CodeReaver-Browser-Userscript and CodeReaver-Webdev-Tools, with @namespace set to https://github.com/spiralgang/CodeReaver-Browser-Userscript.
Replaced broad @match patterns with specific code-hosting platforms (GitHub, GitLab, Bitbucket, CodePen).
Removed placeholder API key and added instructions for users to add their own.
Created a clear, developer-friendly README emphasizing webdev utility, avoiding niche terms like "math expressions."
Preserved Core APIs:
Kept GM_addStyle and GM_xmlhttpRequest for CodeReaver-Browser-Userscript to maintain original functionality.
Used document.createElement('style') in CodeReaver-Webdev-Tools, consistent with the Safari scripts.
Webdev Focus:
Described the scripts as tools to "supercharge web development" with features like AI tooltips, code block enhancements, and responsive navigation.
Emphasized practical use cases (code reviews, documentation, navigation) in the README to align with general webdev needs.
Notes
API Key: CodeReaver-Browser-Userscript requires an xAI API key for AI tooltips. Without it, tooltips show raw title text. The secondary script doesn’t use the API.
Testing: Test on Android Chromium browsers (e.g., Chrome, Samsung Internet) with Tampermonkey. Verify touch events, tooltip display, and menu responsiveness.
License: Create a LICENSE file with standard MIT License text for public sharing.
Extensibility: Add more @match directives or code terms to the regex in getAITooltipText to expand functionality.
Scope: Focused on DevUl-FloWind for the main script, with a secondary script adapting Safari features for Chromium, as the original Safari scripts are iOS-specific.
If you want further tweaks (e.g., additional webdev features like syntax highlighting or specific terminology in the README), please provide details, and I’ll refine the scripts!

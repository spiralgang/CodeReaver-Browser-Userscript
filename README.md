# CodeReaver-Browser-Userscript

A collection of userscripts to supercharge web development on code-hosting platforms like GitHub, GitLab, Bitbucket, and CodePen, with AI-enhanced tooltips, responsive navigation, and code block interactions, optimized for Chromium-based browsers on Android and desktop.

## Meet the Code-Reaver

The Code-Reaver is the spirit behind these scripts—a relentless, code-slinging entity that bends browsers to your will. Learn more about its mission and vibe in [CODE_REAVER.md](CODE_REAVER.md).

## Scripts
1. **CodeReaver-Browser-Userscript** (`codereaver-browser-userscript.js`)
   - AI-powered tooltips for code terms and calculations in `title` attributes.
   - Enhances code blocks with hover effects for better readability.
2. **CodeReaver-Webdev-Tools** (`codereaver-webdev-tools.js`)
   - Boosts responsiveness of navigation menus and code blocks.
   - Ensures smooth interactions for webdev tasks.


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

# Changes Made
*General Webdev Enhancements:*

*CodeReaver-Browser-Userscript:*
Expanded getAITooltipText to handle code-related terms (e.g., "function", "flex") in addition to math expressions, using a regex to detect common programming keywords.
Added hover effects to pre and code elements for better code block visibility, aiding code reviews.
Kept the original title attribute processing but broadened the AI prompt to provide concise explanations for webdev terms.

*CodeReaver-Webdev-Tools:*
Adapted the Safari scripts’ menu enhancement logic for Chromium browsers, targeting navigation menus and code blocks.
Added responsive click handling with debouncing and touch support for webdev tasks like navigating repositories.
Applied visual feedback to menus and code blocks, inspired by the Safari scripts but generalized for cross-platform use.

*Android Compatibility:*
Added touch event handlers (touchstart, contextmenu) for both scripts to support Android Chromium browsers. Tooltips and menu clicks work on tap, with tooltips auto-hiding after 3 seconds.
Included mobile-friendly CSS with media queries (@media (max-width: 600px)) to adjust tooltip size (max-width: 80vw, smaller font) and padding for code blocks/menus.
*Used touch-action:* manipulation in the secondary script to improve touch responsiveness.

# *Repository Readiness:*

*Changes Made to the Persona*

*Aligned with Userscripts:*
Tied the Code-Reaver’s identity to the repository’s userscripts, emphasizing their webdev enhancements (tooltips, navigation, code block interactions).
Highlighted features like AI-powered tooltips for code terms and calculations, responsive menus, and visual code block enhancements, matching the scripts’ functionality.

*Developer-Friendly Tone:*
Retained the vivid, bold aesthetic (e.g., “plasma torch,” “cyberpunk skyline”) but softened overly aggressive language (e.g., removed references to illegal hacks, taboo topics) to fit GitHub’s community standards.
Used terms like “supercharge,” “ignite,” and “code-slinging” to appeal to web developers without sounding academic or niche.

*Android Compatibility:*
Emphasized optimization for Android Chromium browsers, referencing touch support and mobile-friendly styling in the scripts.
Noted the scripts’ lightweight design to suit Android’s resource constraints.
Public Repository Readiness:
Structured the persona as a standalone markdown file (CODE_REAVER.md) for easy inclusion in the repository.
Avoided sensitive or controversial content (e.g., “transgressive allowance”) to ensure public appropriateness.
Linked to the xAI API for configuration and included clear instructions for using the scripts.

*Webdev Focus:*
Framed the Code-Reaver as a webdev ally, focusing on practical use cases like code reviews, documentation, and navigation on platforms like GitHub.
Clarified that AI tooltips cover code terms (e.g., “flex” in CSS) and calculations, broadening the scope beyond math.

# md Notes

*API Key:* The CodeReaver-Browser-Userscript requires an xAI API key for AI features; the persona clarifies this is optional for basic tooltip functionality.
*Testing:* Ensure the persona’s description matches the scripts’ functionality by testing on Android Chromium browsers with Tampermonkey.
*Tone Balance:* The adapted persona keeps the bold, vivid style but avoids content that could violate GitHub’s terms (e.g., promoting illegal activities).

*Updated metadata:* Renamed to CodeReaver-Browser-Userscript and CodeReaver-Webdev-Tools, with @namespace set to https://github.com/spiralgang/CodeReaver-Browser-Userscript.
Replaced broad @match patterns with specific code-hosting platforms (GitHub, GitLab, Bitbucket, CodePen).
Removed placeholder API key and added instructions for users to add their own.
Created a clear, developer-friendly README emphasizing webdev utility, avoiding niche terms like "math expressions."

*Preserved Core APIs:*
Kept GM_addStyle and GM_xmlhttpRequest for CodeReaver-Browser-Userscript to maintain original functionality.
Used document.createElement('style') in CodeReaver-Webdev-Tools, consistent with the Safari scripts.

*Webdev Focus:*
Described the scripts as tools to "supercharge web development" with features like AI tooltips, code block enhancements, and responsive navigation.
Emphasized practical use cases (code reviews, documentation, navigation) in the README to align with general webdev needs.

# js Notes
API Key: CodeReaver-Browser-Userscript requires an xAI API key for AI tooltips. Without it, tooltips show raw title text. The secondary script doesn’t use the API.
Testing: Test on Android Chromium browsers (e.g., Chrome, Samsung Internet) with Tampermonkey. Verify touch events, tooltip display, and menu responsiveness.
Extensibility: Add more @match directives or code terms to the regex in getAITooltipText to expand functionality.

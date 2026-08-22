/* theme-color.js
   Keeps the mobile browser chrome (address bar + nav buttons) in sync
   with this site's actual --bg-color CSS variable defined in style.css.
   Include this on every page that links to style.css:
     <script src="theme-color.js"></script>
   If --bg-color ever changes in style.css (or a theme toggle updates it
   at runtime), the browser chrome color updates automatically — no need
   to touch this file or any meta tags by hand.
*/
(function () {
    function setMeta(name, content) {
        if (!content) return;
        let tag = document.querySelector('meta[name="' + name + '"]');
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('name', name);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    }

    function applyThemeColor() {
        const bg = getComputedStyle(document.documentElement)
            .getPropertyValue('--bg-color')
            .trim();

        if (!bg) return;

        // Chrome / Edge / Firefox / Samsung Internet address bar
        setMeta('theme-color', bg);
        // Legacy Windows Phone / IE mobile navigation buttons
        setMeta('msapplication-navbutton-color', bg);
        // Windows pinned-tile background, kept consistent for the same reason
        setMeta('msapplication-TileColor', bg);
    }

    // Run immediately...
    applyThemeColor();

    // ...and again after full stylesheet load, in case the variable
    // isn't resolvable yet at parse time (e.g. slow stylesheet fetch).
    window.addEventListener('DOMContentLoaded', applyThemeColor);
    window.addEventListener('load', applyThemeColor);
})();

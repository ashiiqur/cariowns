// =========================================================================
// NEW RELEASE POPUP
// This is the ONLY file to touch when a new single/album drops.
// Edit the RELEASE object below — nothing else in this file needs to change.
// =========================================================================
(function () {

    // =====================================================================
    // RELEASE CONFIG — edit these values for each new drop.
    // Swap in the new name/type/date/image/link and it takes effect
    // immediately. The popup shows on every page load/refresh while
    // today's date is inside the window below — closing it only hides
    // it for that page view, nothing is remembered.
    //
    //   name           : track/album title
    //   type           : small red label, e.g. "New Single" / "New Album"
    //   releaseDate    : "YYYY-MM-DD" — the popup shows starting this date
    //   durationMonths : months to stay visible (combine freely with the rest)
    //   durationDays   : + days
    //   durationHours  : + hours
    //   durationMinutes: + minutes
    //   image          : path to the cover art
    //   link           : where the popup should take people when clicked
    //
    //   Example: 1 month + 2 days + 6 hours + 30 minutes ->
    //             durationMonths: 1, durationDays: 2, durationHours: 6, durationMinutes: 30
    //   Leave any of the four at 0 if you don't need it.
    // =====================================================================
    const RELEASE = {
        name: "Nostalgic World",
        type: "New Single",
        releaseDate: "2026-03-25",
        durationMonths: 3,
        durationDays: 0,
        durationHours: 0,
        durationMinutes: 0,
        image: "assets/releases/nostalgic-world.jpg",
        link: "MUSIC"
    };

    // =====================================================================
    // Everything below this line is display/timing logic — no need to edit.
    // =====================================================================

    const popup = document.getElementById('release-popup');
    if (!popup || !RELEASE.releaseDate) return;

    const releaseDate = new Date(RELEASE.releaseDate + 'T00:00:00');
    const expiresDate = new Date(releaseDate);
    // Applied largest unit to smallest; setMonth()/setDate()/etc. handle
    // calendar quirks correctly (e.g. Nov 30 + 3 months -> Feb 28/29).
    expiresDate.setMonth(expiresDate.getMonth() + (RELEASE.durationMonths || 0));
    expiresDate.setDate(expiresDate.getDate() + (RELEASE.durationDays || 0));
    expiresDate.setHours(expiresDate.getHours() + (RELEASE.durationHours || 0));
    expiresDate.setMinutes(expiresDate.getMinutes() + (RELEASE.durationMinutes || 0));
    const now = new Date();

    // Outside the visible window (too early or already expired) -> do nothing.
    if (isNaN(releaseDate.getTime()) || now < releaseDate || now >= expiresDate) {
        return;
    }

    // Small inline placeholder so a missing cover image never leaves a broken icon.
    function artPlaceholder() {
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
                <rect width="72" height="72" rx="8" fill="#0a0a0a"/>
                <path d="M46 20v20.5a6.5 6.5 0 1 1-3-5.48V24h-14v16.5a6.5 6.5 0 1 1-3-5.48V20z" fill="#3a3a3a"/>
            </svg>`;
        return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    }

    // Fill in the content from RELEASE.
    const artEl = popup.querySelector('.release-popup-art');
    artEl.src = RELEASE.image;
    artEl.alt = RELEASE.name + ' cover art';
    artEl.onerror = function () { this.onerror = null; this.src = artPlaceholder(); };

    popup.querySelector('.release-popup-tag').textContent = RELEASE.type;
    popup.querySelector('.release-popup-title').textContent = RELEASE.name;
    popup.querySelector('.release-popup-date').textContent =
        'Released ' + releaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    popup.querySelector('.release-popup-link').href = RELEASE.link;

    // Reveal with a short delay + fade/slide-in.
    popup.classList.add('show');
    setTimeout(() => {
        requestAnimationFrame(() => popup.classList.add('visible'));
    }, 600);

    // Close button: hides it for this page view only — nothing is remembered,
    // so refreshing (or visiting again) brings it back as long as it's still
    // inside the release window above.
    popup.querySelector('.release-popup-close').addEventListener('click', () => {
        popup.classList.remove('visible');
        setTimeout(() => popup.classList.remove('show'), 400);
    });
})();
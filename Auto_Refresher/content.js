function isErrorPage() {
    const errorTexts = [
        /\b500\b/i,
        /\b502\b/i,
        /\b503\b/i,
        /\b504\bn/i,
        /internal server error/i,
        /bad gateway/i,
        /service unavailable/i,
        /gateway timeout/i,
        /site can’t be reached/i,
        /page isn’t working/i,
        /this site can’t be reached/i
    ];

    const isMedia = /\.(pdf|jpg|jpeg|png|gif|svg|webp)(\?.*)?$/.test(window.location.href.toLowerCase());
    if (isMedia || !document.body) return false;

    const bodyText = document.body.innerText.toLowerCase();
    const titleText = document.title.toLowerCase();
    const combinedText = bodyText + " " + titleText;

    const isAlmostEmpty = bodyText.trim().length < 50;
    const hasNoLinks = document.querySelectorAll("a, button, input, form").length === 0;

    for (const regex of errorTexts) {
        const match = combinedText.match(regex);
        if (match && (isAlmostEmpty || hasNoLinks)) {
            console.log(`[AutoRefresher] Matched error phrase: "${match[0]}"`);
            return true;
        }
    }

    return false;
}

function autoRefreshOnError() {
    chrome.storage.sync.get("enabled", data => {
        if (data.enabled === false) {
            console.log("[AutoRefresher] Disabled.");
            return;
        }
        
        if (isErrorPage()) {
        console.log("[AutoRefresher] Error page detected! Refreshing in 2 seconds...");
        setTimeout(() => {
            location.reload();
        }, 2000);
    } else {
        console.log("[AutoRefresher] Normal page detected. No refresh needed.");
    }
    });
}

window.addEventListener('load', autoRefreshOnError);


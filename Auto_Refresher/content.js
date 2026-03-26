// const api = typeof browser !== "undefined" ? browser : chrome;

// function isErrorPage() {
//     const errorTexts = [
//         /\b500\b/i,
//         /\b502\b/i,
//         /\b503\b/i,
//         /\b504\b/i,
//         /internal server error/i,
//         /bad gateway/i,
//         /service unavailable/i,
//         /gateway timeout/i,
//         /site can’t be reached/i,
//         /page isn’t working/i,
//         /this site can’t be reached/i
//     ];

//     const exactErrorTitles = [
//         "500 internal server error",
//         "502 bad gateway",
//         "503 service unavailable",
//         "504 gateway time-out",
//         "this site can’t be reached",
//         "page isn’t working"
//     ];

//     const isMedia = /\.(pdf|jpg|jpeg|png|gif|svg|webp)(\?.*)?$/.test(
//         window.location.href.toLowerCase()
//     );
//     if (isMedia || !document.body) return false;

//     const bodyText = document.body.innerText.toLowerCase();
//     const titleText = document.title.toLowerCase().trim();
//     const combinedText = bodyText + " " + titleText;

//     const isAlmostEmpty = bodyText.trim().length < 200;
//     const hasVeryFewElements = document.querySelectorAll("a, img, button, form, input").length < 5;

//     if (exactErrorTitles.includes(titleText) && (isAlmostEmpty || hasVeryFewElements)) {
//         return true;
//     }

//     for (const regex of errorTexts) {
//         const match = combinedText.match(regex);
//         if (match && (isAlmostEmpty || hasVeryFewElements)) {
//             return true;
//         }
//     }

//     return false;
// }


// function autoRefreshOnError() {
//     api.storage.sync.get("enabled", data => {
//         if (data.enabled === false) {
//             console.log("[AutoRefresher] Disabled.");
//             return;
//         }

//         if (isErrorPage()) {
//             console.log("[AutoRefresher] Error page detected! Refreshing in 2 seconds...");
//             setTimeout(() => {
//                 location.reload();
//             }, 2000);
//         } else {
//             console.log("[AutoRefresher] Normal page detected. No refresh needed.");
//         }
//     });
// }

// window.addEventListener("load", autoRefreshOnError);


// Universal WebExtension API (Chrome, Edge, Brave, Opera, Firefox)
const api = typeof browser !== "undefined" ? browser : chrome;

let refreshTimer = null;

/* =========================
   AUTO REFRESH CONTROLLER
========================= */
async function autoRefreshOnError() {
    try {
        const data = await api.storage.sync.get("enabled");

        if (data.enabled === false) {
            console.log("[AutoRefresher] Disabled.");
            stopAutoRefresh();
            return;
        }

        if (isErrorPage()) {
            console.log(
                "[AutoRefresher] Error page detected! Refreshing in 2 seconds..."
            );

            if (!refreshTimer) {
                refreshTimer = setTimeout(() => {
                    console.log("[AutoRefresher] Reloading page now.");
                    location.reload();
                }, 2000);
            }
        } else {
            console.log("[AutoRefresher] Normal page detected. No refresh needed.");
            stopAutoRefresh();
        }
    } catch (err) {
        console.error("[AutoRefresher] Storage read failed:", err);
    }
}

function stopAutoRefresh() {
    if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
        console.log("[AutoRefresher] Refresh timer cleared.");
    }
}

/* =========================
   RUN ON PAGE LOAD
========================= */
window.addEventListener("load", () => {
    autoRefreshOnError();
});

/* =========================
   LISTEN TO TOGGLE CHANGES
========================= */
api.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.enabled) {
        console.log(
            "[AutoRefresher] Toggle changed:",
            changes.enabled.oldValue,
            "→",
            changes.enabled.newValue
        );

        if (changes.enabled.newValue === true) {
            autoRefreshOnError();
        } else {
            stopAutoRefresh();
        }
    }
});

/* =========================
   ERROR PAGE DETECTION
   (UNCHANGED – AS REQUESTED)
========================= */
function isErrorPage() {
    const errorTexts = [
        /\b500\b/i,
        /\b502\b/i,
        /\b503\b/i,
        /\b504\b/i,
        /internal server error/i,
        /bad gateway/i,
        /service unavailable/i,
        /gateway timeout/i,
        /site can’t be reached/i,
        /page isn’t working/i,
        /this site can’t be reached/i
    ];

    const exactErrorTitles = [
        "500 internal server error",
        "502 bad gateway",
        "503 service unavailable",
        "504 gateway time-out",
        "this site can’t be reached",
        "page isn’t working"
    ];

    const isMedia = /\.(pdf|jpg|jpeg|png|gif|svg|webp)(\?.*)?$/.test(
        window.location.href.toLowerCase()
    );
    if (isMedia || !document.body) return false;

    const bodyText = document.body.innerText.toLowerCase();
    const titleText = document.title.toLowerCase().trim();
    const combinedText = bodyText + " " + titleText;

    const isAlmostEmpty = bodyText.trim().length < 200;
    const hasVeryFewElements =
        document.querySelectorAll("a, img, button, form, input").length < 5;

    if (exactErrorTitles.includes(titleText) && (isAlmostEmpty || hasVeryFewElements)) {
        return true;
    }

    for (const regex of errorTexts) {
        const match = combinedText.match(regex);
        if (match && (isAlmostEmpty || hasVeryFewElements)) {
            return true;
        }
    }

    return false;
}

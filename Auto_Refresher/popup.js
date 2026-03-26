const api = typeof browser !== "undefined" ? browser : chrome;

document.addEventListener("DOMContentLoaded", async () => {
    const toggle = document.getElementById("toggleRefresh");

    const data = await api.storage.sync.get("enabled");
    toggle.checked = data.enabled ?? true;

    toggle.addEventListener("change", async () => {
        console.log("[AutoRefresher] Toggle set to:", toggle.checked);
        await api.storage.sync.set({ enabled: toggle.checked });
    });
});

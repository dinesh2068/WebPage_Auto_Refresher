const toggle = document.getElementById("toggleRefresh");

chrome.storage.sync.get("enabled", data => {
  toggle.checked = data.enabled !== false; // default is true
});

toggle.addEventListener("change", () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

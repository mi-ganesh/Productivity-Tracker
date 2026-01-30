let currentSite = null;
let startTime = null;

// classify website
function getCategory(site) {
  const productiveSites = ["leetcode", "github", "geeksforgeeks"];
  return productiveSites.some(p => site.includes(p))
    ? "Productive"
    : "Unproductive";
}

// send data to backend
function sendToBackend(site, timeSpent) {
  fetch("http://localhost:5000/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      website: site,
      timeSpent,
      category: getCategory(site)
    })
  }).catch(err => console.error("Backend error:", err));
}

// handle tab change
async function handleTabChange() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs.length) return;

  const url = tabs[0].url;
  if (!url || !url.startsWith("http")) return;

  const newSite = new URL(url).hostname;
  const now = Date.now();

  if (currentSite && startTime) {
    sendToBackend(currentSite, now - startTime);
  }

  currentSite = newSite;
  startTime = now;
}

// save every 10 seconds
setInterval(() => {
  if (!currentSite || !startTime) return;

  const now = Date.now();
  sendToBackend(currentSite, now - startTime);
  startTime = now;
}, 10000);

// listeners
chrome.tabs.onActivated.addListener(handleTabChange);

// ONLY when page fully loads
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status === "complete" && tab.active) {
    handleTabChange();
  }
});

// initial
handleTabChange();

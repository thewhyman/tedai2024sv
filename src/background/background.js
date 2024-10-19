// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // Check if the tab's URL is valid and starts with http:// or https://
//     if (changeInfo.status === 'complete' && tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
//         const visitTime = new Date().toISOString();
//         const visitInfo = { url: tab.url, time: visitTime };

//         chrome.storage.local.get({visits: []}, (result) => {
//             result.visits.push(visitInfo);
//             chrome.storage.local.set({visits: result.visits});
//         });
//     }
// });

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    // Ensure the tab has a valid URL (filter out chrome:// pages, etc.)
    if (
      tab.url &&
      (tab.url.startsWith("http://") || tab.url.startsWith("https://"))
    ) {
      const startTime = new Date().toISOString();
      const visitInfo = { url: tab.url, time: startTime };

      //   chrome.storage.local.get({ visits: [] }, (result) => {
      //     result.visits.push(visitInfo);
      //     chrome.storage.local.set({ visits: result.visits });
      //   });
    }
  });
});

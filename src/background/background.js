console.log("This is content.js");
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

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   chrome.tabs.get(activeInfo.tabId, (tab) => {
//     // Ensure the tab has a valid URL (filter out chrome:// pages, etc.)
//     if (
//       tab.url &&
//       (tab.url.startsWith("http://") || tab.url.startsWith("https://"))
//     ) {
//       const startTime = new Date().toISOString();
//       const visitInfo = { url: tab.url, time: startTime };
//     }
//   });
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "printSelectedText") {
    const selectedText = window.getSelection().toString();
    window.print(selectedText);
  }
  sendResponse();
});

// chrome.contextMenus.onClicked(() => console.log("onClicked got called"));

chrome.contextMenus.create({
  id: "myContextMenu",
  title: "SV Translate",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Handle the button click event here
  console.log("Hello");
  console.log("Button clicked:", info, tab);
});

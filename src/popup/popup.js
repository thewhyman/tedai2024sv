function extractDomain(url) {
  let domain;
  if (url.indexOf("://") > -1) {
    domain = url.split("/")[2];
  } else {
    domain = url.split("/")[0];
  }
  domain = domain.split(":")[0];
  return domain;
}

// // Fetch and display the last 5 visited sites as a preview
// chrome.storage.local.get({ visits: [] }, (result) => {
//   const previewList = document.getElementById("previewList");
//   const visits = result.visits.slice(-5); // Get the last 5 visits for preview
//   visits.forEach((visit) => {
//     const li = document.createElement("li");
//     li.textContent = extractDomain(visit.url); // Show domain name for brevity
//     previewList.appendChild(li);
//   });
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "printSelectedText") {
//     const selectedText = window.getSelection().toString();
//     window.print(selectedText);
//   }
// });

document.getElementById("openDashboard").addEventListener("click", () => {
  // chrome.sidePanel.open({ windowId: tab.windowId });
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     console.log(tabs);
  //     const selectedText = window.getSelection().toString();
  //     alert(selectedText);
  //     // chrome.runtime.sendMessage("test");
  //     // chrome.tabs.sendMessage(tabs[0].id, { action: "printSelectedText" });
  //   });
  // chrome.tabs.create({ url: "pages/dashboard/dashboard.html" });
});

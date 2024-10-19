console.log("This is content.js");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "printSelectedText") {
    const selectedText = window.getSelection().toString();
    window.print(selectedText);
  }
  sendResponse();
});

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString();
  if (selectedText !== "") {
    highlightedText = selectedText;
    // chrome.runtime.sendMessage({ action: "showButton" });
  } else {
    highlightedText = null;
    // chrome.runtime.sendMessage({ action: "hideButton" });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "highlight") {
    // Implement your highlighting logic here
    console.log("Highlighting:", highlightedText);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "asl-video-respons-from-ai") {
    console.log("Received response:", request.response);
  }
  sendResponse();
});

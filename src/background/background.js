console.log("Silent Voice: background.js");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "printSelectedText") {
    const selectedText = window.getSelection().toString();
    window.print(selectedText);
    return true;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Declare response as a placeholder
  let response = {};

  console.log("Background.js: asl-to-video: input: ", request.data);

  if (request.action === "asl-to-video") {
    sendResponse({ response: callModleAPI(request.data) });
    // Important: Return true to signal asynchronous response
    return true;
  } else {
    sendResponse({ response: "Background.js: asl-to-video listener: No action taken" });
  }
});


function callModleAPI(text) { 
  console.log("Background.js: callModleAPI: input: ", text);
  return "Response from REST API";
}

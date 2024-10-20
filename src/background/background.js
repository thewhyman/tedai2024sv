console.log("Silent Voice: background.js");
const vidoeToTextEvent = "aslvideo-to-text";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Declare response as a placeholder
  let response = {};

  console.log("Background.js: aslvideo-to-text: input: ", request.data);

  if (request.action === vidoeToTextEvent) {
    sendResponse({ response: callVideoToTextModleAPI(request.data) });
    // Important: Return true to signal asynchronous response
    return true;
  } else {
    sendResponse({ response: "Background.js: aslvideo-to-text listener: No action taken" });
  }
});

function callVideoToTextModleAPI(text) { 
  console.log("Background.js: callVideoToTextModleAPI: input: ", text);
  return "API Response TEXT for the video";
}
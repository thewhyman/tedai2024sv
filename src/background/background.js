console.log("Silent Voice: background.js");
const videoToTextEvent = "aslvideo-to-text";
const textToVideoEvent = "asl-to-video";

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

  console.log("Background.js: " + textToVideoEvent + ": input: ", request.data);

  if (request.action === textToVideoEvent) {
    sendResponse({ response: callTextToVideoAPI(request.data) });
    // Important: Return true to signal asynchronous response
    return true;
  } else {
    sendResponse({ response: "Background.js: " + textToVideoEvent + ": listener: No action taken" });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Declare response as a placeholder
  let response = {};

  console.log("Background.js: " + videoToTextEvent + ": input: ", request.data);

  if (request.action === videoToTextEvent) {
    sendResponse({ response: callVideoToTextModleAPI(request.data) });
    // Important: Return true to signal asynchronous response
    return true;
  } else {
    sendResponse({ response: "Background.js: " + videoToTextEvent + ": listener: No action taken" });
  }
});

function callTextToVideoAPI(text) { 
  console.log("Background.js: callTextToVideoAPI: input: ", text);
  return "API Response Text to Video";
}

function callVideoToTextModleAPI(text) { 
  console.log("Background.js: callVideoToTextModleAPI: input: ", text);
  return "API Response Video to Text";
}
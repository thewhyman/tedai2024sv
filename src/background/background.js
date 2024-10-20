console.log("Silent Voice: background.js");
const vidoeToTextEvent = "aslvideo-to-text";

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
    sendResponse({ response: callTextToVideoAPI(request.data) });
    // Important: Return true to signal asynchronous response
    return true;
  } else {
    sendResponse({ response: "Background.js: asl-to-video listener: No action taken" });
  }
});

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

function callTextToVideoAPI(text) { 
  console.log("Background.js: callTextToVideoAPI: input: ", text);
  return "API Response Text to Video";
}

function callVideoToTextModleAPI(text) { 
  console.log("Background.js: callVideoToTextModleAPI: input: ", text);
  return "API Response Video to Text";
}
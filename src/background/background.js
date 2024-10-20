console.log("This is background.js");

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "printSelectedText") {
//     const selectedText = window.getSelection().toString();
//     window.print(selectedText);
//   }
//   sendResponse();
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  response = {};
  if (request.action === "asl-to-video") {
    console.log("Received text:", request.data);
    response = callGemini(request.data, (response) => {
      console.log("Returning response from bg.js: ", response);
      sendResponse(response);
    });
  }
  return true;
});

function callGemini(text, callback) {
  callback({
    text,
    video: "http://localhost:8000/example.mp4",
  });
}

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
  const url =
    "https://sign-translation-app-v3-825232107540.us-central1.run.app/run";
  const data = {
    text: "hello",
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response || !response.ok) {
      throw new Error(`Gemini Request failed.`);
    }
    callback({
      text,
      video: response.body, // "http://localhost:8000/example.mp4",
    });
  });
  return true;
}

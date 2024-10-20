console.log("This is background.js");

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
    "https://sign-translation-app-v7-825232107540.us-central1.run.app/run";
  const data = {
    text: "hello",
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response || !response.ok) {
        throw new Error(`Gemini Request failed.`);
      }
      return response.blob();
    })
    .then((blob) => {
      const videoURL = URL.createObjectURL(blob);
      //const videoPlayer = document.getElementById('videoPlayer');
      // videoPlayer.src = videoURL;
      // videoPlayer.load();
      // videoPlayer.play();
      callback({
        text,
        video: videoURL, // response.body, // "http://localhost:8000/example.mp4",
      });
    });
  return true;
}

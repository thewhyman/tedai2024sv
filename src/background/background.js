console.log("This is background.js");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "printSelectedText") {
    const selectedText = window.getSelection().toString();
    window.print(selectedText);
  }
  sendResponse();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  response = {};
  if (request.action === "asl-to-video") {
    console.log("Received text:", request.data);
    response = callGemini(request.data);
    console.log("Returning response: ", response);
  }
  sendResponse(response);
});

function callGemini(text) {
  // https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?text=I ate an omelet for breakfast today and plan to eat pasta for lunch.&spoken=en&signed=ase
  // const getVideoUrl = "https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?spoken=en&signed=ase&text=" + text;
  return "hello from gemini";
  //   return {
  //     text,
  //     video: "posed video",
  //   };
}

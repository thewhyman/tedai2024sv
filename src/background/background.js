console.log("This is background.js");

async function geminiBridge(request, sender, sendResponse) {
  debugger;
  response = {};
  if (request.action === "asl-to-video") {
    console.log("Received text:", request.data);
    console.log("geminiBridge waiting");
    const response = await callGemini(request.data);
    console.log("geminiBridge wait over", response);
    sendResponse(response);
    return true;
  }
  // console.log("Returning response from bg.js: ", response);
  // sendResponse(response);
  console.log("geminiBridge returned");
  // return true;
}

chrome.runtime.onMessage.addListener(geminiBridge);
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   response = {};
//   if (request.action === "asl-to-video") {
//     sendResponse("This is the gemini response object");
//     return false;
//   }
// });

async function callGemini(text) {
  // for (let i = 0; i < 100; i++) {}
  // https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?text=I ate an omelet for breakfast today and plan to eat pasta for lunch.&spoken=en&signed=ase
  // const getVideoUrl = "https://us-central1-sign-mt.cloudfunctions.net/spoken_text_to_signed_pose?spoken=en&signed=ase&text=" + text;
  // return "hello from gemini";
  /*
  url = 'https://sign-translation-app-v2-825232107540.us-central1.run.app/run'
headers = {'Content-Type': 'application/json'}
data = {
    'text': 'hello'
}
  */
  const url =
    "https://sign-translation-app-v3-825232107540.us-central1.run.app/run";
  const data = {
    text: "hello",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  //  .then((response) => {
  //    debugger;
  if (!response) {
    throw new Error(`Gemini Request failed.`);
  }
  // return response;//.json();
  return {
    text,
    video: response,
  };
  // })
  // .catch((error) => {
  //   console.error("Error:", error);
  //   throw error; // Re-throw the error for further handling
  // });
  //   return {
  //     text,
  //     video: "http://localhost:8000/example.mp4",
  //   };
}

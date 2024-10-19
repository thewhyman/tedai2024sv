console.log("This is content.js");
var highlightedText = null;
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

document.addEventListener("mouseup", () => {
  console.log("This was mouseup");
  const selectedText = window.getSelection().toString();
  if (selectedText !== "") {
    highlightedText = selectedText;
    chrome.runtime.sendMessage(
      { action: "asl-to-video", data: selectedText },
      (response) => {
        console.log("This is in content.js");
        debugger;
        console.log("response received from gemini", response);
      }
    );
  } else {
    highlightedText = null;
    // chrome.runtime.sendMessage({ action: "hideButton" });
  }
});

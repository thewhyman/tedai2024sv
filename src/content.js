chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("3 This will work");
  if (request.action === "printSelectedText") {
    const selectedText = window.getSelection().toString();
    // window.print(selectedText);
    console.log(selectedText);
  }
});

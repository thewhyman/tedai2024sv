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

// document.addEventListener("mouseup", () => {
//   console.log("This was mouseup");
//   const selectedText = window.getSelection().toString();
//   if (selectedText !== "") {
//     highlightedText = selectedText;
//     chrome.runtime.sendMessage(
//       { action: "asl-to-video", data: selectedText },
//       (response) => {
//         console.log("This is in content.js");
//         debugger;
//         console.log("response received from gemini", response);
//       }
//     );
//   } else {
//     highlightedText = null;
//     // chrome.runtime.sendMessage({ action: "hideButton" });
//   }
// });

// Function to handle mouseup event  
function handleMouseUp() {  
  console.log("content.js: handleMouseUp START");
  // Get the selected text  
  const selectedText = window.getSelection().toString().trim();  

  // Check if there is any selected text  
  if (selectedText !== "") {
    // highlightedText = selectedText;
    chrome.runtime.sendMessage(
      { action: "asl-to-video", data: selectedText },
      (response) => {
        debugger;
        console.log("Respone from asl-to-video: ", response);
      }
    );
  } else {
    highlightedText = null;
    // chrome.runtime.sendMessage({ action: "hideButton" });
  }
}  

// Add mouseup event listener to the document  
document.addEventListener('mouseup', handleMouseUp);  
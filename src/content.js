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
  // Get the selected text  
  const selectedText = window.getSelection().toString().trim();  

  // Check if there is any selected text  
  if (selectedText) {  
      console.log("Selected text:", selectedText);  
      
      // You can now use the selectedText variable as needed  
  }  
}  

// Add mouseup event listener to the document  
document.addEventListener('mouseup', handleMouseUp);  
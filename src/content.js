console.log("Silent Voice: content.js");

// Function to handle mouseup event  
function handleMouseUp() {  
  console.log("content.js: handleMouseUp: START");
  
  // Get the selected text  
  const selectedText = window.getSelection().toString().trim();  

  // Check if there is any selected text  
  if (selectedText !== "") {
    // highlightedText = selectedText;
    chrome.runtime.sendMessage(
      { action: "asl-to-video", data: selectedText },
      (response) => {
        console.log("content.js: handleMouseUp: asl-to-video: Respone:", response);
        return 
      }
    );
  } else {
    console.log("content.js: handleMouseUp: No action taken", selectedText);
  }
}  

// Add mouseup event listener to the document  
document.addEventListener('mouseup', handleMouseUp);  
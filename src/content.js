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
        return response;
      }
    );
  } else {
    console.log("content.js: handleMouseUp: No Selected Text");
  }
}  

// Add mouseup event listener to the document  
document.addEventListener('mouseup', handleMouseUp);  

// Function to inject a camera button next to each text input element
const injectCameraButtons = () => {
  const videoConstraints = { video: true };

  const injectCameraButton = (inputElement) => {
    const cameraButton = document.createElement('button');
    cameraButton.innerHTML = "🎥";
    cameraButton.style.backgroundColor = "red";
    cameraButton.style.border = "none";
    cameraButton.style.color = "white";
    cameraButton.style.padding = "5px";
    cameraButton.style.marginLeft = "5px";
    cameraButton.style.cursor = "pointer";

    inputElement.parentNode.insertBefore(cameraButton, inputElement.nextSibling);

    let isRecording = false;
    let mediaStream = null;

    cameraButton.addEventListener("click", () => {
      if (!isRecording) {
        navigator.mediaDevices.getUserMedia(videoConstraints)
          .then(stream => {
            mediaStream = stream;
            cameraButton.style.backgroundColor = "green";
            isRecording = true;

            // Simulate text input for demonstration
            setTimeout(() => {
              stopRecording();
              //Send Message to Background thread and add to input text
              sendMessageVideoToText(mediaStream);
              inputElement.value += "Some text";
            }, 3000);
          })
          .catch(error => {
            console.error("Error accessing the camera: ", error);
          });
      } else {
        stopRecording();
      }
    });

    const stopRecording = () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      cameraButton.style.backgroundColor = "red";
      isRecording = false;
    };

    // Log the input field information to the console
    console.log("Injected camera button next to field:", inputElement.name || inputElement.id || "Unnamed/ID-less input");
  };

  const textInputs = document.querySelectorAll('input[type="text"], textarea');
  textInputs.forEach(injectCameraButton);
};

// Call the function to inject buttons after all setup is done
injectCameraButtons();

//Sends message to the background
function sendMessageVideoToText(mediaStream) {
  if (mediaStream !== "") {
    // highlightedText = selectedText;
    chrome.runtime.sendMessage(
      { action: "aslvideo-to-text", data: mediaStream },
      (response) => {
        console.log("content.js: record: aslvideo-to-text: Respone:", response);
        return response;
      }
    );
  } else {
    console.log("content.js: record: Media stream is empty");
    return "context.js: Media stream is empty";
  }
}

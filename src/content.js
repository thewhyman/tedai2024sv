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

document.addEventListener("mouseup", (event) => {
  const selectedText = window.getSelection().toString();
  if (selectedText !== "") {
    highlightedText = selectedText;
    console.log("This was mouseup");
    showConvertButton(event);
  } else {
    highlightedText = null;
    hideConvertButton();
    // chrome.runtime.sendMessage({ action: "hideButton" });
  }
});

function showConvertButton(event) {
  // below the mouse up location, show a button
  let convertButton = document.querySelector("#convert-button");
  if (!convertButton) {
    convertButton = document.createElement("button");
    convertButton.textContent = "Show ASL!";
    convertButton.style.display = "none";
    document.body.appendChild(convertButton);
  }

  convertButton.setAttribute("id", "convert-button");
  convertButton.setAttribute("style", "background:red");
  convertButton.style.position = "absolute";
  convertButton.style.top = `${event.clientY + 20}px`; // Adjust the offset as needed
  convertButton.style.left = `${event.clientX - 20}px`;
  convertButton.style.display = "block";

  // Add the button to the document body

  convertButton.addEventListener("click", onConvertButtonClick);
}

function hideConvertButton() {
  let convertButton = document.querySelector("#convert-button");
  if (convertButton) {
    convertButton.style.display = "none";
  }
}

function onConvertButtonClick() {
  // callServiceWorkerForTranslation();
  // showLoader();
  chrome.runtime.sendMessage(
    { action: "asl-to-video", data: highlightedText },
    (response) => {
      // hideLoader();
      // playVideo();
      console.log("This is in content.js");
      console.log("response received from gemini", response);
    }
  );
}

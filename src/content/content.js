console.log("This is content.js");
const DEBUG = true;
var highlightedText = null;
var convertButtonVisible = false;
document.addEventListener("mouseup", (event) => {
  const selectedText = window.getSelection().toString();
  if (convertButtonVisible) return;
  if (selectedText !== "") {
    highlightedText = selectedText;
    console.log("This was mouseup");
    showConvertButton(event);
    convertButtonVisible = true;
  } else {
    highlightedText = null;
    hideAllExtraDivs();
  }
});

function hideAllExtraDivs() {
  hideConvertButton();
  hideLoader();
  hideOutputDiv();
  convertButtonVisible = false;
}

function hideOutputDiv() {
  const outputDiv = document.querySelector("#output-div");
  if (outputDiv) {
    outputDiv.remove();
  }
}

function getEventCoordinates(event) {
  return {
    left: event.clientX,
    top: event.clientY,
  };
}
function showConvertButton(event) {
  let convertButton = document.querySelector("#convert-button");
  if (!convertButton) {
    convertButton = document.createElement("button");
    convertButton.innerHTML = `
    <img height="25px" width="25px" style="display:inline-block;" src="https://media.istockphoto.com/id/1311595752/vector/sign-language-interpreting-vector-icon-us-sing-language-hand-symbol-isolated-on-white.jpg?s=612x612&w=0&k=20&c=NxRdHaySIEOpXIQC3se_QJTJR65fCPP8BCMGTUcEkUU="/>
    Show ASL!
    `;
    //convertButton.textContent = "Show ASL!";
    convertButton.style.display = "none";
    document.body.appendChild(convertButton);
  }

  convertButton.setAttribute("id", "convert-button");
  positionItem(convertButton, getEventCoordinates(event), {
    top: 20,
    left: -20,
  });
  convertButton.style.display = "block";

  // Add the button to the document body

  convertButton.addEventListener("click", onConvertButtonClick);
}

function positionItem(item, coords, offset) {
  item.style.position = "absolute";
  item.style.top = `${coords.top + offset?.top}px`;
  item.style.left = `${coords.left + offset?.left}px`;
}

function hideConvertButton() {
  let convertButton = document.querySelector("#convert-button");
  if (convertButton) {
    convertButton.remove();
  }
}

function onConvertButtonClick(event) {
  callServiceWorkerForTranslation();
  showLoader(event);
}

function showLoader(event) {
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.innerHTML = '<div class="loading-spinner"></div>';
  positionItem(loader, getEventCoordinates(event), {
    top: 20,
    left: -20,
  });
  document.body.appendChild(loader);
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
}

async function callServiceWorkerForTranslation() {
  callGemini(highlightedText, (response) => {
    hideLoader();
    showAsl(response);
  });
}

function callGemini(text, callback) {
  const url =
    "https://sign-translation-app-v7-825232107540.us-central1.run.app/run";
  const data = {
    text: text,
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
      callback({
        text,
        video: videoURL, // response.body, // "http://localhost:8000/example.mp4",
      });
    });
  return true;
}

async function callServiceWorkerForTranslation_old() {
  chrome.runtime.sendMessage(
    { action: "asl-to-video", data: highlightedText },
    (response) => {
      hideLoader();
      console.log("This is in content.js");
      console.log("response received from gemini", response);
      if (response && response.video) {
        showAsl(response);
      }
    }
  );
}

function showAsl(response) {
  const outputDiv = document.createElement("div");
  outputDiv.setAttribute("id", "output-div");
  outputDiv.classList.add("output");
  if (DEBUG) {
    outputDiv.innerHTML = `
    <div>
      <div>Highlighted Text: ${response.text}</div>
      <div>Video:
        <video height="100px" width="100px" autoplay src="${response.video}"></video>
      </div>
    </div>`;
  } else {
    outputDiv.innerHTML = `
    <video height="100px" width="100px" autoplay src="${response.video}"></video>
    `;
  }
  document.body.appendChild(outputDiv);
  positionItem(
    outputDiv,
    {
      top: 0,
      left: 0,
    },
    {
      top: 0,
      left: 0,
    }
  );
}

const elSkipButton = document.querySelector("#skip-button");

let numberOfSkips = 3;

function getNumberOfSkips() {
  return numberOfSkips;
}

function initializeNumberOfSkips() {
  numberOfSkips = JSON.parse(localStorage.getItem("skips") || "3");
  updateNumberOfSkipsElement();
}

function setNumberOfSkips(numberOfSkips_) {
  numberOfSkips = numberOfSkips_;
  updateNumberOfSkipsElement();
  
  localStorage.setItem("skips", JSON.stringify(numberOfSkips));
}

function updateNumberOfSkipsElement() {
  elSkipButton.textContent = `Pular | ${numberOfSkips}`;
  if(numberOfSkips === 0) {
    elSkipButton.disabled = true;
  }
}

export { getNumberOfSkips, initializeNumberOfSkips, setNumberOfSkips };

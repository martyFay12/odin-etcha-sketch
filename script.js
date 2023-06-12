// GLobal vars
const mainContainer = document.querySelector(".main-container");
let currentMode = "normal-mode";
let currentGridSize = 10;

//make initial sketchpad
createEtchaSketch(currentGridSize, "normal-mode");

// add event listeners to buttons
const resizeGridButton = document.querySelector("#change-grid");
resizeGridButton.addEventListener("click", newGrid);
const colorModeButton = document.querySelector("#color-draw-mode");
colorModeButton.addEventListener("click", colorMode);
const shadeModeButton = document.querySelector("#shade-draw-mode");
shadeModeButton.addEventListener("click", shadeMode);
const normalModeButton = document.querySelector("#normal-mode");
normalModeButton.addEventListener("click", normalMode);

function createEtchaSketch(gridSize, mode) {
  for (let i = 0; i < gridSize; i++) {
    const horizontalDiv = document.createElement("div");
    horizontalDiv.classList.add("row");
    for (let j = 0; j < gridSize; j++) {
      const boxDiv = document.createElement("div");
      boxDiv.classList.add("box");
      horizontalDiv.appendChild(boxDiv);
    }
    mainContainer.appendChild(horizontalDiv);
  }
  const boxes = document.querySelectorAll(".box");
  if (mode === "normal-mode") {
    boxes.forEach((box) => box.addEventListener("mouseover", addInkClass));
  } else if (mode === "color-mode") {
    boxes.forEach((box) => box.addEventListener("mouseover", weirdInk));
  } else {
    boxes.forEach((box) => box.addEventListener("mouseover", shadeInk));
  }
}

function newGrid() {
  // only change grid size if this call was the result of a 'custom grid size' button push.
  if (this.id === "change-grid") {
    currentGridSize = newGridSize();
  }
  mainContainer.textContent = "";
  createEtchaSketch(currentGridSize, currentMode);
}

function newGridSize() {
  let gridSize = parseInt(prompt("Enter a new grid size between 10 and 100"));
  while (gridSize < 10 || gridSize > 100 || isNaN(gridSize)) {
    gridSize = parseInt(
      prompt(
        "not a valid grid size, please enter a valid one between 10 and 100."
      )
    );
  }
  return gridSize;
}

function normalMode() {
  currentMode = "normal-mode";
  newGrid();
}
function addInkClass() {
  this.classList.add("inked");
}

function colorMode() {
  currentMode = "color-mode";
  newGrid();
}

function weirdInk() {
  // assigns a random rgb color to the div that called function.
  this.style.backgroundColor = `rgb(${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function shadeMode() {
  currentMode = "shade-mode";
  newGrid();
}

function shadeInk() {
  let alpha;
  // if color is already black just return, in this case the length will be 22.
  if (getComputedStyle(this).backgroundColor.length === 22) {
    return;
    // if color has alpha value of 1, getComputedStyle(this) just returns rgb
    // so the length is only 18, in this case just manually set to 0.9
  } else if (getComputedStyle(this).backgroundColor.length === 18) {
    alpha = 0.9;
  } else {
    // the length is 24, and the alpha value is in range 0.1 - 0.9, so set
    // alpha to the 3 characters after the 3rd comma, and then subtract 0.1
    alpha =
      parseFloat(getComputedStyle(this).backgroundColor.split(",")[3]) - 0.1;
  }
  this.style.backgroundColor = `rgba(255,255,255,${alpha})`;
}

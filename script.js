const mainContainer = document.querySelector(".main-container");
createEtchaSketch(10, "normal-mode");
const resizeGridButton = document.querySelector("#change-grid");
resizeGridButton.addEventListener("click", newGrid);
const colorModeButton = document.querySelector("#color-draw-mode");
colorModeButton.addEventListener("click", colorMode);
const shadeModeButton = document.querySelector("#shade-draw-mode");
shadeModeButton.addEventListener("click", shadeMode);
const normalModeButton = document.querySelector("#normal-mode");
normalModeButton.addEventListener("click", normalMode);
let currentMode = "normal-mode";
let currentGridSize = 10;

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
  let gridSize = currentGridSize;
  if (this.id === "change-grid") {
    gridSize = newGridSize();
    currentGridSize = gridSize;
  }
  mainContainer.textContent = "";
  createEtchaSketch(gridSize, currentMode);
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
  this.style.cssText = `background-color: rgb(${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )});flex: 1;width: auto;height: auto;`;
}

function shadeMode() {
  currentMode = "shade-mode";
  newGrid();
}

function shadeInk() {
  if (getComputedStyle(this).backgroundColor.length === 22) {
    return;
  } else if (getComputedStyle(this).backgroundColor.length === 18) {
    this.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    return;
  } else {
    alpha =
      parseFloat(getComputedStyle(this).backgroundColor.split(",")[3]) - 0.1;
    this.style.backgroundColor = `rgba(255,255,255,${alpha})`;
  }
}

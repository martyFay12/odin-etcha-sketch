const mainContainer = document.querySelector(".main-container");
createEtchaSketch(10);
const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => box.addEventListener("mouseover", addInkClass));
const resizeGridButton = document.querySelector("#change-grid");
resizeGridButton.addEventListener("click", newGrid);

function createEtchaSketch(gridSize) {
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
}

function addInkClass(event) {
  this.classList.add("inked");
}

function newGrid(event) {
  const gridSize = newGridSize();
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

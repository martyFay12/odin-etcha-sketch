const mainContainer = document.querySelector(".main-container");
createEtchaSketch(10);
const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => box.addEventListener("mouseover", addInkClass));

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

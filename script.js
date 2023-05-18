const mainContainer = document.querySelector(".main-container");
createEtchaSketch();
function createEtchaSketch() {
  for (let i = 0; i < 16; i++) {
    const horizontalDiv = document.createElement("div");
    horizontalDiv.classList.add("row");
    for (let j = 0; j < 16; j++) {
      const boxDiv = document.createElement("div");
      boxDiv.classList.add("box");
      horizontalDiv.appendChild(boxDiv);
    }
    mainContainer.appendChild(horizontalDiv);
  }
}

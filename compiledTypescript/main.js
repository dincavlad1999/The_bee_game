import { BeeGame } from "./BeeGame.js";
const beeGame = BeeGame.createBeeGame();
const hiveContainerReference = document.getElementById("hive-container");
document.querySelector("button")?.addEventListener("click", attackSwarm);
initializeBeeGame();
function initializeBeeGame() {
    if (hiveContainerReference && hiveContainerReference.hasChildNodes()) {
        while (hiveContainerReference.firstChild) {
            hiveContainerReference.removeChild(hiveContainerReference.firstChild);
        }
    }
    if (hiveContainerReference) {
        beeGame.getInsects().forEach((insect, index) => {
            if (insect.getType() === "Queen") {
                let beeQueenFigure = document.createElement("figure");
                beeQueenFigure.style.textAlign = "center";
                beeQueenFigure.style.display = "inline-block";
                let beeQueenFigcaption = document.createElement("figcaption");
                beeQueenFigcaption.textContent = `Queen (${insect.getHealth()}HP)`;
                let beeQueenImage = document.createElement("img");
                beeQueenImage.setAttribute("src", "./resources/queen_bee.jpg");
                beeQueenImage.setAttribute("beeIndex", `${index}`);
                beeQueenImage.style.cursor = "pointer";
                beeQueenImage.style.width = "100px";
                beeQueenImage.style.height = "100px";
                beeQueenImage.style.margin = "3px";
                beeQueenImage.style.position = "relative";
                const initialZIndexImage = getComputedStyle(beeQueenImage).zIndex;
                const initialZIndexFigcaption = getComputedStyle(beeQueenFigcaption).zIndex;
                beeQueenImage.addEventListener("click", (event) => {
                    beeQueenFigcaption.textContent = "-8 HP";
                    beeQueenFigcaption.style.color = "red";
                    beeQueenFigcaption.style.zIndex = "2";
                    beeQueenFigcaption.style.transform = "translate(20px, 20px)";
                    beeQueenImage.style.zIndex = "2";
                    beeQueenImage.style.transform = "translate(20px, 20px)";
                    beeQueenImage.setAttribute("src", "./resources/hurt_queen_bee.jpg");
                    setTimeout(() => {
                        beeQueenFigcaption.style.color = "inherit";
                        beeQueenFigcaption.style.transform = "translate(0px, 0px)";
                        beeQueenFigcaption.textContent = `Queen (${insect.getHealth()}HP)`;
                        beeQueenImage.style.transform = "translate(0px, 0px)";
                        if (insect.getHealth() > 0) {
                            beeQueenImage.setAttribute("src", "./resources/queen_bee.jpg");
                        }
                        else {
                            beeQueenImage.setAttribute("src", "./resources/dead_bee.jpg");
                        }
                        beeQueenImage.style.zIndex =
                            initialZIndexImage === "auto" ? "1" : initialZIndexImage; // Reset to initial z-index
                    }, 1000);
                });
                beeQueenFigure.appendChild(beeQueenImage);
                beeQueenFigure.appendChild(beeQueenFigcaption);
                hiveContainerReference.appendChild(beeQueenFigure);
            }
            else if (insect.getType() === "Drone") {
                let beeDroneFigure = document.createElement("figure");
                beeDroneFigure.style.textAlign = "center";
                beeDroneFigure.style.display = "inline-block";
                let beeDroneFigcaption = document.createElement("figcaption");
                beeDroneFigcaption.textContent = `Drone (${insect.getHealth()}HP)`;
                let beeDroneImage = document.createElement("img");
                beeDroneImage.setAttribute("src", "./resources/drone_bee.jpg");
                beeDroneImage.setAttribute("beeIndex", `${index}`);
                beeDroneImage.style.cursor = "pointer";
                beeDroneImage.style.width = "100px";
                beeDroneImage.style.height = "100px";
                beeDroneImage.style.margin = "3px";
                beeDroneImage.style.position = "relative"; // Ensure position is not static
                const initialZIndexImage = getComputedStyle(beeDroneImage).zIndex;
                const initialZIndexFigcaption = getComputedStyle(beeDroneFigcaption).zIndex;
                beeDroneImage.addEventListener("click", (event) => {
                    beeDroneFigcaption.textContent = "-12 HP";
                    beeDroneFigcaption.style.color = "red";
                    beeDroneFigcaption.style.zIndex = "2";
                    beeDroneFigcaption.style.transform = "translate(20px, 20px)";
                    beeDroneImage.style.zIndex = "2";
                    beeDroneImage.style.transform = "translate(20px, 20px)";
                    beeDroneImage.setAttribute("src", "./resources/hurt_bee.jpg");
                    setTimeout(() => {
                        beeDroneFigcaption.style.color = "inherit";
                        beeDroneFigcaption.style.transform = "translate(0px, 0px)";
                        beeDroneFigcaption.textContent = `Drone (${insect.getHealth()}HP)`;
                        beeDroneImage.style.transform = "translate(0px, 0px)";
                        if (insect.getHealth() > 0) {
                            beeDroneImage.setAttribute("src", "./resources/drone_bee.jpg");
                        }
                        else {
                            beeDroneImage.setAttribute("src", "./resources/dead_bee.jpg");
                        }
                        beeDroneImage.style.zIndex =
                            initialZIndexImage === "auto" ? "1" : initialZIndexImage; // Reset to initial z-index
                    }, 1000);
                });
                beeDroneFigure.appendChild(beeDroneImage);
                beeDroneFigure.appendChild(beeDroneFigcaption);
                hiveContainerReference.appendChild(beeDroneFigure);
            }
            else if (insect.getType() === "Worker") {
                let beeWorkerFigure = document.createElement("figure");
                beeWorkerFigure.style.textAlign = "center";
                beeWorkerFigure.style.display = "inline-block";
                let beeWorkerFigcaption = document.createElement("figcaption");
                beeWorkerFigcaption.textContent = `Worker (${insect.getHealth()}HP)`;
                let beeWorkerImage = document.createElement("img");
                beeWorkerImage.setAttribute("src", "resources/worker_bee.jpg");
                beeWorkerImage.setAttribute("beeIndex", `${index}`);
                beeWorkerImage.style.cursor = "pointer";
                beeWorkerImage.style.width = "100px";
                beeWorkerImage.style.height = "100px";
                beeWorkerImage.style.margin = "3px";
                beeWorkerImage.style.position = "relative"; // Ensure position is not static
                const initialZIndexImage = getComputedStyle(beeWorkerImage).zIndex;
                const initialZIndexFigcaption = getComputedStyle(beeWorkerFigcaption).zIndex;
                beeWorkerImage.addEventListener("click", (event) => {
                    beeWorkerFigcaption.textContent = "-10 HP";
                    beeWorkerFigcaption.style.color = "red";
                    beeWorkerFigcaption.style.zIndex = "2";
                    beeWorkerFigcaption.style.transform = "translate(20px, 20px)";
                    beeWorkerImage.style.zIndex = "2";
                    beeWorkerImage.style.transform = "translate(20px, 20px)";
                    beeWorkerImage.setAttribute("src", "./resources/hurt_bee.jpg");
                    setTimeout(() => {
                        beeWorkerFigcaption.style.color = "inherit";
                        beeWorkerFigcaption.style.transform = "translate(0px, 0px)";
                        beeWorkerFigcaption.textContent = `Worker (${insect.getHealth()}HP)`;
                        beeWorkerImage.style.transform = "translate(0px, 0px)";
                        if (insect.getHealth() > 0) {
                            beeWorkerImage.setAttribute("src", "resources/worker_bee.jpg");
                        }
                        else {
                            beeWorkerImage.setAttribute("src", "resources/dead_bee.jpg");
                        }
                        beeWorkerImage.style.zIndex =
                            initialZIndexImage === "auto" ? "1" : initialZIndexImage; // Reset to initial z-index
                    }, 1000);
                });
                beeWorkerFigure.appendChild(beeWorkerImage);
                beeWorkerFigure.appendChild(beeWorkerFigcaption);
                hiveContainerReference.appendChild(beeWorkerFigure);
            }
        });
    }
    else {
        throw new Error("The html element has not been found.");
    }
}
function attackSwarm() {
    const randomBeeIndex = beeGame.getRandomBeeIndex();
    beeGame
        .attackBee(randomBeeIndex)
        .then((isAttackedBeeKilled) => {
        const beeReference = document.querySelector(`[beeIndex="${randomBeeIndex}"]`);
        if (beeReference) {
            beeReference.click();
            if (isAttackedBeeKilled) {
                setTimeout(() => {
                    initializeBeeGame();
                }, 5000);
            }
        }
        else {
            console.error(`Bee with index ${randomBeeIndex} not found in the DOM`);
        }
    })
        .catch((error) => {
        console.error("Error in attackBee:", error);
    });
}
//Observatie: De facut o albina sa se incarce cum avem pe shopfloor pentru window.load event
// Ca sa fie foarte smeher

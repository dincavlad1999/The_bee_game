import { Drone } from "./Drone.js";
import { BeeGame } from "./BeeGame.js";
import { Insect } from "./Insect.js";
import { Queen } from "./Queen.js";
import { Worker } from "./Worker.js";

const beeGame: BeeGame = BeeGame.createBeeGame();
const hiveContainerReference: HTMLDivElement | null = document.getElementById(
  "hive-container"
) as HTMLDivElement | null;
document.querySelector("button")?.addEventListener("click", attackSwarm);

initializeBeeGame();

function initializeBeeGame(): void {
  if (hiveContainerReference && hiveContainerReference.hasChildNodes()) {
    while (hiveContainerReference.firstChild) {
      hiveContainerReference.removeChild(hiveContainerReference.firstChild);
    }
  }

  if (hiveContainerReference) {
    beeGame.getInsects().forEach((insect: Insect, index: number) => {
      if (insect instanceof Queen) {
        let beeQueenFigure: HTMLElement = document.createElement("figure");
        beeQueenFigure.style.textAlign = "center";
        beeQueenFigure.style.display = "inline-block";
        let beeQueenFigcaption: HTMLElement =
          document.createElement("figcaption");
        beeQueenFigcaption.textContent = `Queen - ${insect.getHealth()}HP`;
        let beeQueenImage: HTMLImageElement = document.createElement("img");
        beeQueenImage.setAttribute("src", "./resources/queen_bee.jpg");
        beeQueenImage.setAttribute("beeIndex", `${index}`);
        beeQueenImage.style.cursor = "pointer";
        beeQueenImage.style.width = "100px";
        beeQueenImage.style.height = "100px";
        beeQueenImage.style.border = "1px solid black";
        beeQueenImage.style.margin = "3px";
        beeQueenImage.style.position = "relative";
        const initialZIndex = getComputedStyle(beeQueenImage).zIndex;
        beeQueenImage.addEventListener("click", (event: MouseEvent) => {
          beeQueenImage.style.zIndex = "2";
          beeQueenImage.style.transform = "translate(20px, 20px)";
          beeQueenImage.setAttribute("src", "./resources/hurt_queen_bee.jpg");
          setTimeout(() => {
            beeQueenImage.style.transform = "translate(0px, 0px)";
            if (insect.getHealth() > 0) {
              beeQueenImage.setAttribute("src", "./resources/queen_bee.jpg");
            } else {
              beeQueenImage.setAttribute("src", "./resources/dead_bee.jpg");
            }
            beeQueenImage.style.zIndex =
              initialZIndex === "auto" ? "1" : initialZIndex; // Reset to initial z-index
          }, 1000);
        });
        beeQueenFigure.appendChild(beeQueenImage);
        beeQueenFigure.appendChild(beeQueenFigcaption);
        hiveContainerReference.appendChild(beeQueenFigure);
      } else if (insect instanceof Drone) {
        let beeDroneFigure: HTMLElement = document.createElement("figure");
        beeDroneFigure.style.textAlign = "center";
        beeDroneFigure.style.display = "inline-block";
        let beeDroneFigcaption: HTMLElement =
          document.createElement("figcaption");
        beeDroneFigcaption.textContent = `Drone - ${insect.getHealth()}HP`;
        let beeDroneImage: HTMLImageElement = document.createElement("img");
        beeDroneImage.setAttribute("src", "./resources/drone_bee.jpg");
        beeDroneImage.setAttribute("beeIndex", `${index}`);
        beeDroneImage.style.cursor = "pointer";
        beeDroneImage.style.width = "100px";
        beeDroneImage.style.height = "100px";
        beeDroneImage.style.border = "1px solid black";
        beeDroneImage.style.margin = "3px";
        beeDroneImage.style.position = "relative"; // Ensure position is not static
        const initialZIndex = getComputedStyle(beeDroneImage).zIndex;
        beeDroneImage.addEventListener("click", (event: MouseEvent) => {
          beeDroneImage.style.zIndex = "2";
          beeDroneImage.style.transform = "translate(20px, 20px)";
          beeDroneImage.setAttribute("src", "./resources/hurt_bee.jpg");
          setTimeout(() => {
            beeDroneImage.style.transform = "translate(0px, 0px)";
            if (insect.getHealth() > 0) {
              beeDroneImage.setAttribute("src", "./resources/drone_bee.jpg");
            } else {
              beeDroneImage.setAttribute("src", "./resources/dead_bee.jpg");
            }
            beeDroneImage.style.zIndex =
              initialZIndex === "auto" ? "1" : initialZIndex; // Reset to initial z-index
          }, 1000);
        });
        beeDroneFigure.appendChild(beeDroneImage);
        beeDroneFigure.appendChild(beeDroneFigcaption);
        hiveContainerReference.appendChild(beeDroneFigure);
      } else if (insect instanceof Worker) {
        let beeWorkerFigure: HTMLElement = document.createElement("figure");
        beeWorkerFigure.style.textAlign = "center";
        beeWorkerFigure.style.display = "inline-block";
        let beeWorkerFigcaption: HTMLElement =
          document.createElement("figcaption");
        beeWorkerFigcaption.textContent = `Worker - ${insect.getHealth()}HP`;
        let beeWorkerImage: HTMLImageElement = document.createElement("img");
        beeWorkerImage.setAttribute("src", "resources/worker_bee.jpg");
        beeWorkerImage.setAttribute("beeIndex", `${index}`);
        beeWorkerImage.style.cursor = "pointer";
        beeWorkerImage.style.width = "100px";
        beeWorkerImage.style.height = "100px";
        beeWorkerImage.style.border = "1px solid black";
        beeWorkerImage.style.margin = "3px";
        beeWorkerImage.style.position = "relative"; // Ensure position is not static
        const initialZIndex = getComputedStyle(beeWorkerImage).zIndex;
        beeWorkerImage.addEventListener("click", (event: MouseEvent) => {
          beeWorkerImage.style.zIndex = "2";
          beeWorkerImage.style.transform = "translate(20px, 20px)";
          beeWorkerImage.setAttribute("src", "./resources/hurt_bee.jpg");
          setTimeout(() => {
            beeWorkerImage.style.transform = "translate(0px, 0px)";
            if (insect.getHealth() > 0) {
              beeWorkerImage.setAttribute("src", "resources/worker_bee.jpg");
            } else {
              beeWorkerImage.setAttribute("src", "resources/dead_bee.jpg");
            }
            beeWorkerImage.style.zIndex =
              initialZIndex === "auto" ? "1" : initialZIndex; // Reset to initial z-index
          }, 1000);
        });
        beeWorkerFigure.appendChild(beeWorkerImage);
        beeWorkerFigure.appendChild(beeWorkerFigcaption);
        hiveContainerReference.appendChild(beeWorkerFigure);
      }
    });
  } else {
    throw new Error("The html element has not been found.");
  }
}

function attackSwarm(): void {
  const randomBeeIndex: number = beeGame.getRandomBeeIndex();
  beeGame
    .attackBee(randomBeeIndex)
    .then((isAttackedBeeKilled: boolean) => {
      const beeReference: HTMLImageElement | null = document.querySelector(
        `[beeIndex="${randomBeeIndex}"]`
      ) as HTMLImageElement | null;
      if (beeReference) {
        beeReference.click();
        if (isAttackedBeeKilled) {
          setTimeout(() => {
            initializeBeeGame();
          }, 3000);
        }
      } else {
        console.error(`Bee with index ${randomBeeIndex} not found in the DOM`);
      }
    })
    .catch((error) => {
      console.error("Error in attackBee:", error);
    });
}

//Observatie: De facut o albina sa se incarce cum avem pe shopfloor pentru window.load event
// Ca sa fie foarte smeher

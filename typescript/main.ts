import { Drone } from "./Drone.js";
import { BeeGame } from "./BeeGame.js";
import { Insect } from "./Insect.js";
import { Queen } from "./Queen.js";
import { Worker } from "./Worker.js";
import { SessionStorage } from "./SessionStorage.js";

const beeGame: BeeGame = BeeGame.createBeeGame();
const hiveContainerReference: HTMLDivElement | null = document.getElementById(
  "hive-container"
) as HTMLDivElement | null;
document.querySelector("button")?.addEventListener("click", attackSwarm);
var playerName: string | null = null;

window.addEventListener("load", () => {
  const loadingScreen: HTMLDivElement | null = document.getElementById(
    "loadingScreen"
  ) as HTMLDivElement | null;

  if (!SessionStorage.retrieveSessionData("playerName")) {
    playerName = window.prompt("Please enter your nickname: ");
    SessionStorage.updateSession("playerName", playerName);
  } else {
    playerName = SessionStorage.retrieveSessionData("playerName");
  }

  setTimeout(() => {
    loadingScreen!.style.display = "none";
  }, 5000);

  initializeBeeGame();
});

function initializeBeeGame(): void {
  updateStats();

  if (hiveContainerReference && hiveContainerReference.hasChildNodes()) {
    while (hiveContainerReference.firstChild) {
      hiveContainerReference.removeChild(hiveContainerReference.firstChild);
    }
  }

  if (hiveContainerReference) {
    beeGame.getInsects().forEach((insect: Insect, index: number) => {
      if (insect.getType() === "Queen") {
        let beeQueenFigure: HTMLElement = document.createElement("figure");
        beeQueenFigure.style.textAlign = "center";
        beeQueenFigure.style.display = "inline-block";
        let beeQueenFigcaption: HTMLElement =
          document.createElement("figcaption");
        beeQueenFigcaption.textContent = `Queen (${insect.getHealth()}HP)`;
        let beeQueenImage: HTMLImageElement = document.createElement("img");
        beeQueenImage.setAttribute("src", "./resources/queen_bee.jpg");
        beeQueenImage.setAttribute("beeIndex", `${index}`);
        beeQueenImage.style.cursor = "pointer";
        // beeQueenImage.style.width = "100px";
        // beeQueenImage.style.height = "100px";

        beeQueenImage.style.margin = "3px";
        beeQueenImage.style.position = "relative";
        const initialZIndexImage = getComputedStyle(beeQueenImage).zIndex;
        const initialZIndexFigcaption =
          getComputedStyle(beeQueenFigcaption).zIndex;
        beeQueenImage.addEventListener("click", (event: MouseEvent) => {
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
            } else {
              beeQueenImage.setAttribute("src", "./resources/dead_bee.jpg");
            }
            beeQueenImage.style.zIndex =
              initialZIndexImage === "auto" ? "1" : initialZIndexImage; // Reset to initial z-index
          }, 1000);
        });
        beeQueenFigure.appendChild(beeQueenImage);
        beeQueenFigure.appendChild(beeQueenFigcaption);
        hiveContainerReference.appendChild(beeQueenFigure);
      } else if (insect.getType() === "Drone") {
        let beeDroneFigure: HTMLElement = document.createElement("figure");
        beeDroneFigure.style.textAlign = "center";
        beeDroneFigure.style.display = "inline-block";
        let beeDroneFigcaption: HTMLElement =
          document.createElement("figcaption");
        beeDroneFigcaption.textContent = `Drone (${insect.getHealth()}HP)`;
        let beeDroneImage: HTMLImageElement = document.createElement("img");
        beeDroneImage.setAttribute("src", "./resources/drone_bee.jpg");
        beeDroneImage.setAttribute("beeIndex", `${index}`);
        beeDroneImage.style.cursor = "pointer";
        // beeDroneImage.style.width = "100px";
        // beeDroneImage.style.height = "100px";

        beeDroneImage.style.margin = "3px";
        beeDroneImage.style.position = "relative"; // Ensure position is not static
        const initialZIndexImage = getComputedStyle(beeDroneImage).zIndex;
        const initialZIndexFigcaption =
          getComputedStyle(beeDroneFigcaption).zIndex;
        beeDroneImage.addEventListener("click", (event: MouseEvent) => {
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
            } else {
              beeDroneImage.setAttribute("src", "./resources/dead_bee.jpg");
            }
            beeDroneImage.style.zIndex =
              initialZIndexImage === "auto" ? "1" : initialZIndexImage; // Reset to initial z-index
          }, 1000);
        });
        beeDroneFigure.appendChild(beeDroneImage);
        beeDroneFigure.appendChild(beeDroneFigcaption);
        hiveContainerReference.appendChild(beeDroneFigure);
      } else if (insect.getType() === "Worker") {
        let beeWorkerFigure: HTMLElement = document.createElement("figure");
        beeWorkerFigure.style.textAlign = "center";
        beeWorkerFigure.style.display = "inline-block";
        let beeWorkerFigcaption: HTMLElement =
          document.createElement("figcaption");
        beeWorkerFigcaption.textContent = `Worker (${insect.getHealth()}HP)`;
        let beeWorkerImage: HTMLImageElement = document.createElement("img");
        beeWorkerImage.setAttribute("src", "resources/worker_bee.jpg");
        beeWorkerImage.setAttribute("beeIndex", `${index}`);
        beeWorkerImage.style.cursor = "pointer";
        // beeWorkerImage.style.width = "100px";
        // beeWorkerImage.style.height = "100px";

        beeWorkerImage.style.margin = "3px";
        beeWorkerImage.style.position = "relative"; // Ensure position is not static
        const initialZIndexImage = getComputedStyle(beeWorkerImage).zIndex;
        const initialZIndexFigcaption =
          getComputedStyle(beeWorkerFigcaption).zIndex;
        beeWorkerImage.addEventListener("click", (event: MouseEvent) => {
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
            } else {
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
  } else {
    throw new Error("The html element has not been found.");
  }
}

function attackSwarm(): void {
  const randomBeeIndex: number = beeGame.getRandomBeeIndex();
  beeGame
    .attackBee(randomBeeIndex)
    .then((isAttackedBeeKilled: boolean) => {
      updateStats();
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

function updateStats(): void {
  const playerNameHeaderElement: HTMLLIElement = document.getElementById(
    "playerName"
  ) as HTMLLIElement;
  const swarmHealth: HTMLLIElement = document.getElementById(
    "swarmHealth"
  ) as HTMLLIElement;
  const aliveBees: HTMLLIElement = document.getElementById(
    "aliveBees"
  ) as HTMLLIElement;
  const aliveQueen: HTMLLIElement = document.getElementById(
    "aliveQueen"
  ) as HTMLLIElement;
  const aliveBeeWorkers: HTMLLIElement = document.getElementById(
    "aliveBeeWorkers"
  ) as HTMLLIElement;
  const aliveBeeDrones: HTMLLIElement = document.getElementById(
    "aliveBeeDrones"
  ) as HTMLLIElement;

  playerNameHeaderElement.textContent =
    "😃Player name: " + (playerName ? playerName : "player");
  swarmHealth.textContent =
    "❤️Swarm Health: " + beeGame.getSwarmHealth().toString() + " HP";
  aliveBees.textContent =
    "🐝Alive Bees: " + beeGame.getAliveBeesNumber().toString();
  aliveQueen.textContent =
    "👑 Queen Alive: " + (beeGame.isBeeQueenAlive() ? "yes" : "no");
  aliveBeeWorkers.textContent =
    "🛠️ Workers:" + beeGame.getAliveBeeWorkerNumber().toString();
  aliveBeeDrones.textContent =
    "🚁 Drones: " + beeGame.getAliveBeeDroneNumber().toString();
}

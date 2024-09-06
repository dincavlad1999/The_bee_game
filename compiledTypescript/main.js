import { Drone } from "./Drone.js";
import { Hive } from "./Hive.js";
import { Queen } from "./Queen.js";
import { Worker } from "./Worker.js";
const hive = Hive.createHive();
initializeHive();
function initializeHive() {
    console.log("Am inceput sa initializez Hive-ul;");
    let hiveContainerReference = document.getElementById("hive-container");
    if (hiveContainerReference) {
        const hiveInsects = hive.getInsects();
        hiveInsects.forEach((insect, index) => {
            if (insect instanceof Queen) {
                let beeQueen = document.createElement("img");
                beeQueen.setAttribute("src", "./resources/queen_bee.jpg");
                beeQueen.setAttribute("beeIndex", `${index}`);
                beeQueen.style.cursor = "pointer";
                beeQueen.style.width = "200px";
                beeQueen.style.height = "200px";
                beeQueen.style.border = "1px solid black";
                beeQueen.style.margin = "3px";
                beeQueen.style.position = "relative"; // Ensure position is not static
                const initialZIndex = getComputedStyle(beeQueen).zIndex;
                beeQueen.addEventListener("click", (event) => {
                    attackBee(index);
                    beeQueen.style.zIndex = "2";
                    beeQueen.style.transform = "translate(100px, 100px)";
                    beeQueen.setAttribute("src", "./resources/hurt_queen_bee.jpg");
                    setTimeout(() => {
                        beeQueen.style.transform = "translate(0px, 0px)";
                        if (insect.getHealth() > 0) {
                            beeQueen.setAttribute("src", "./resources/queen_bee.jpg");
                        }
                        else {
                            beeQueen.setAttribute("src", "./resources/dead_bee.jpg");
                        }
                        beeQueen.style.zIndex =
                            initialZIndex === "auto" ? "1" : initialZIndex; // Reset to initial z-index
                    }, 1000);
                });
                hiveContainerReference.appendChild(beeQueen);
            }
            else if (insect instanceof Drone) {
                let beeDrone = document.createElement("img");
                beeDrone.setAttribute("src", "./resources/drone_bee.jpg");
                beeDrone.setAttribute("beeIndex", `${index}`);
                beeDrone.style.cursor = "pointer";
                beeDrone.style.width = "200px";
                beeDrone.style.height = "200px";
                beeDrone.style.border = "1px solid black";
                beeDrone.style.margin = "3px";
                beeDrone.style.position = "relative"; // Ensure position is not static
                const initialZIndex = getComputedStyle(beeDrone).zIndex;
                beeDrone.addEventListener("click", (event) => {
                    attackBee(index);
                    beeDrone.style.zIndex = "2";
                    beeDrone.style.transform = "translate(100px, 100px)";
                    beeDrone.setAttribute("src", "./resources/hurt_bee.jpg");
                    setTimeout(() => {
                        beeDrone.style.transform = "translate(0px, 0px)";
                        if (insect.getHealth() > 0) {
                            beeDrone.setAttribute("src", "./resources/drone_bee.jpg");
                        }
                        else {
                            beeDrone.setAttribute("src", "./resources/dead_bee.jpg");
                        }
                        beeDrone.style.zIndex =
                            initialZIndex === "auto" ? "1" : initialZIndex; // Reset to initial z-index
                    }, 1000);
                });
                hiveContainerReference.appendChild(beeDrone);
            }
            else if (insect instanceof Worker) {
                let beeWorker = document.createElement("img");
                beeWorker.setAttribute("src", "resources/worker_bee.jpg");
                beeWorker.setAttribute("beeIndex", `${index}`);
                beeWorker.style.cursor = "pointer";
                beeWorker.style.width = "200px";
                beeWorker.style.height = "200px";
                beeWorker.style.border = "1px solid black";
                beeWorker.style.margin = "3px";
                beeWorker.style.position = "relative"; // Ensure position is not static
                const initialZIndex = getComputedStyle(beeWorker).zIndex;
                beeWorker.addEventListener("click", (event) => {
                    attackBee(index);
                    beeWorker.style.zIndex = "2";
                    beeWorker.style.transform = "translate(100px, 100px)";
                    beeWorker.setAttribute("src", "./resources/hurt_bee.jpg");
                    setTimeout(() => {
                        beeWorker.style.transform = "translate(0px, 0px)";
                        if (insect.getHealth() > 0) {
                            beeWorker.setAttribute("src", "resources/worker_bee.jpg");
                        }
                        else {
                            beeWorker.setAttribute("src", "resources/dead_bee.jpg");
                        }
                        beeWorker.style.zIndex =
                            initialZIndex === "auto" ? "1" : initialZIndex; // Reset to initial z-index
                    }, 1000);
                });
                hiveContainerReference.appendChild(beeWorker);
            }
        });
    }
    else {
        console.error("The html element has not been found.");
    }
}
function attackBee(beeIndex) {
    let attackedInsect = hive
        .getInsects()
        .find((insect, index) => beeIndex === index);
    if (attackedInsect) {
        console.log("Attacked Insect: ", attackedInsect);
        attackedInsect.takeDamage();
        console.log("Attacked Insect: ", attackedInsect);
    }
}
function attackSwarm() {
    hive.attackBee();
}
document.querySelector("button")?.addEventListener("click", attackSwarm);
//Observatie: De facut o albina sa se incarce cum avem pe shopfloor pentru window.load event
// Ca sa fie foarte smeher

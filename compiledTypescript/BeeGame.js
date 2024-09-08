import { Drone } from "./Drone.js";
import { InsectType } from "./InsectType.js";
import { Queen } from "./Queen.js";
import { Worker } from "./Worker.js";
import { SessionStorage } from "./SessionStorage.js";
const sessionStorageKey = "swarmMembers";
const sessionStorageKeyKilled = "killedInsects";
export class BeeGame {
    insects = [];
    static instance = null;
    killedInsects = [];
    constructor() {
        //Aici o sa initializez din Session storage daca este cazul sau daca nu apelez functia asta.
        this.initializeBeeGameSwarm();
        this.loadKilledInsects();
    }
    static createBeeGame() {
        if (BeeGame.instance === null) {
            BeeGame.instance = new BeeGame();
        }
        return BeeGame.instance;
    }
    getInsects() {
        return this.insects;
    }
    getKilledInsectsNumber() {
        return this.killedInsects.length;
    }
    getKilledDronesNumber() {
        let killedDrones = 0;
        if (this.killedInsects.length) {
            this.killedInsects.forEach((insect) => {
                if (insect instanceof Drone) {
                    killedDrones++;
                }
            });
        }
        return killedDrones;
    }
    getKilledWorkersNumber() {
        let killedWorkers = 0;
        if (this.killedInsects.length) {
            this.killedInsects.forEach((insect) => {
                if (insect instanceof Worker) {
                    killedWorkers++;
                }
            });
        }
        return killedWorkers;
    }
    initializeBeeGameSwarm() {
        if (!SessionStorage.retrieveSessionData(sessionStorageKey)) {
            this.insects = [];
            for (let index = 0; index < 8; index++) {
                this.insects = [...this.insects, this.createInsect(InsectType.DRONE)];
                if (index <= 4) {
                    this.insects = [
                        ...this.insects,
                        this.createInsect(InsectType.WORKER),
                    ];
                }
                if (index === 0) {
                    this.insects = [...this.insects, this.createInsect(InsectType.QUEEN)];
                }
            }
            this.insects.sort((insectA, insectB) => insectB.getHealth() - insectA.getHealth());
            SessionStorage.updateSession(sessionStorageKey, this.getInsects());
        }
        else {
            const insectsArray = SessionStorage.retrieveSessionData(sessionStorageKey);
            // Manually rehydrate data to their respective classes
            this.insects = insectsArray.map((insectData) => {
                if (insectData.type === "Queen") {
                    return Object.assign(new Queen(), insectData);
                }
                else if (insectData.type === "Drone") {
                    return Object.assign(new Drone(), insectData);
                }
                else if (insectData.type === "Worker") {
                    return Object.assign(new Worker(), insectData);
                }
                return null;
            });
        }
    }
    loadKilledInsects() {
        const killedInsectsArray = SessionStorage.retrieveSessionData(sessionStorageKeyKilled) || [];
        // Manually rehydrate data to their respective classes
        this.killedInsects = killedInsectsArray.map((insectData) => {
            if (insectData.type === "Queen") {
                return Object.assign(new Queen(), insectData);
            }
            else if (insectData.type === "Drone") {
                return Object.assign(new Drone(), insectData);
            }
            else if (insectData.type === "Worker") {
                return Object.assign(new Worker(), insectData);
            }
            return null;
        });
    }
    isGameOver() {
        if (this.isQueenDead() || !this.isSomeBeeAlive())
            return true;
        return false;
    }
    isQueenDead() {
        let queen = this.insects.find((insect) => {
            return insect instanceof Queen;
        });
        if (queen && queen.getHealth() <= 0) {
            return true;
        }
        return false;
    }
    isSomeBeeAlive() {
        return this.insects.some((bee) => bee && bee.getHealth() > 0);
    }
    createInsect(insectType) {
        switch (insectType) {
            case InsectType.QUEEN:
                return new Queen();
            case InsectType.WORKER:
                return new Worker();
            case InsectType.DRONE:
                return new Drone();
            default:
                throw new Error("Invalid insect type");
        }
    }
    getRandomBeeIndex() {
        if (this.insects.length === 0) {
            return -1;
        }
        return Math.floor(Math.random() * this.insects.length);
    }
    attackBee(randomBeeIndex) {
        return new Promise((resolve, reject) => {
            let attackedBee = this.insects.find((insect, beeIndex) => {
                return beeIndex === randomBeeIndex;
            });
            if (attackedBee) {
                attackedBee.takeDamage();
                if (attackedBee.getHealth() <= 0) {
                    this.killedInsects = [...this.killedInsects, attackedBee];
                    SessionStorage.updateSession(sessionStorageKeyKilled, this.killedInsects);
                }
                let isAttackedBeeKilled = attackedBee.getHealth() < 0 ? true : false;
                if (this.isGameOver()) {
                    alert("Game Over");
                    SessionStorage.clearSessionData();
                    this.initializeBeeGameSwarm();
                    this.loadKilledInsects();
                    resolve(isAttackedBeeKilled);
                }
                else {
                    if (isAttackedBeeKilled) {
                        this.insects = this.insects.filter((insect) => insect.getHealth() > 0);
                    }
                    SessionStorage.updateSession(sessionStorageKey, this.getInsects());
                    resolve(isAttackedBeeKilled);
                }
            }
            else {
                reject(new Error("No bee with the generated index found."));
            }
        });
    }
    //Detailed Swarm Data
    getSwarmHealth() {
        let swarmHealth = 0;
        this.getInsects().forEach((insect) => {
            swarmHealth += insect.getHealth();
        });
        return swarmHealth;
    }
    getAliveBeeWorkerNumber() {
        let aliveBeeWorkers = 0;
        this.getInsects().forEach((insect) => {
            if (insect.getType() === "Worker" && insect.getHealth() > 0) {
                aliveBeeWorkers++;
            }
        });
        return aliveBeeWorkers;
    }
    getAliveBeeDroneNumber() {
        let aliveBeeDrone = 0;
        this.getInsects().forEach((insect) => {
            if (insect.getType() === "Drone" && insect.getHealth() > 0) {
                aliveBeeDrone++;
            }
        });
        return aliveBeeDrone;
    }
    isBeeQueenAlive() {
        let isBeeQueenAlive = true;
        this.getInsects().forEach((insect) => {
            if (insect.getType() === "Queen" && insect.getHealth() < 0) {
                isBeeQueenAlive = false;
            }
        });
        return isBeeQueenAlive;
    }
    getAliveBeesNumber() {
        return this.getInsects().length;
    }
}

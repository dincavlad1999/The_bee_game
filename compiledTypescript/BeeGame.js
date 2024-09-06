import { Drone } from "./Drone.js";
import { InsectType } from "./InsectType.js";
import { Queen } from "./Queen.js";
import { Worker } from "./Worker.js";
export class BeeGame {
    insects = [];
    static instance = null;
    constructor() {
        //Aici o sa initializez din Session storage daca este cazul sau daca nu apelez functia asta.
        this.initializeBeeGameSwarm();
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
    initializeBeeGameSwarm() {
        this.insects = [];
        for (let index = 0; index < 8; index++) {
            this.insects = [...this.insects, this.createInsect(InsectType.DRONE)];
            if (index <= 4) {
                this.insects = [...this.insects, this.createInsect(InsectType.WORKER)];
            }
            if (index === 0) {
                this.insects = [...this.insects, this.createInsect(InsectType.QUEEN)];
            }
        }
        this.insects.sort((insectA, insectB) => insectB.getHealth() - insectA.getHealth());
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
        let attackedBee = this.insects.find((insect, beeIndex) => {
            return beeIndex === randomBeeIndex;
        });
        if (attackedBee) {
            console.log("Attacked Bee before damage hp: ", attackedBee.getHealth());
            attackedBee.takeDamage();
            console.log("Attacked Bee after damage hp: ", attackedBee.getHealth());
            if (this.isGameOver()) {
                alert("Game Over");
                this.initializeBeeGameSwarm();
            }
            else {
                //Update the insects and Session Storage etc
                this.insects = this.insects.filter((insect) => insect.getHealth() > 0);
            }
        }
        else {
            throw new Error("No bee with the generated index found.");
        }
    }
}

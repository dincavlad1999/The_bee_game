import { Insect } from "./Insect.js";
export class Worker extends Insect {
    constructor() {
        super("Worker", 75);
    }
    takeDamage() {
        this.healthPoints = this.healthPoints - 10;
    }
}

import { Insect } from "./Insect.js";
export class Worker extends Insect {
    constructor() {
        super(75);
    }
    takeDamage() {
        this.healthPoints = this.healthPoints - 10;
    }
}

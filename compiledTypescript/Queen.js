import { Insect } from "./Insect.js";
export class Queen extends Insect {
    constructor() {
        super("Queen", 100);
    }
    takeDamage() {
        this.healthPoints = this.healthPoints - 8;
    }
}

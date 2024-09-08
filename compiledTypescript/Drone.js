import { Insect } from "./Insect";
export class Drone extends Insect {
    constructor() {
        super("Drone", 50);
    }
    takeDamage() {
        this.healthPoints = this.healthPoints - 12;
    }
}

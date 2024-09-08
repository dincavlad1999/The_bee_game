import { Insect } from "./Insect";
export class Queen extends Insect {
    constructor() {
        super("Queen", 100);
    }
    takeDamage() {
        this.healthPoints = this.healthPoints - 8;
    }
}

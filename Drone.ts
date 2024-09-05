import { Insect } from "./Insect.js";

export class Drone extends Insect {
  constructor() {
    super(50);
  }

  takeDamage(): void {
    this.healthPoints = this.healthPoints - 12;
  }
}

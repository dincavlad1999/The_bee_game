import { Insect } from "./Insect.js";

export class Drone extends Insect {
  constructor() {
    super("Drone", 50);
  }

  takeDamage(): void {
    this.healthPoints = this.healthPoints - 12;
  }
}

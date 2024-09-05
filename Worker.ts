import { Insect } from "./Insect.js";

export class Worker extends Insect {
  constructor() {
    super(75);
  }

  takeDamage(): void {
    this.healthPoints = this.healthPoints - 10;
  }
}

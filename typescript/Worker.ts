import { Insect } from "./Insect";

export class Worker extends Insect {
  constructor() {
    super("Worker", 75);
  }

  takeDamage(): void {
    this.healthPoints = this.healthPoints - 10;
  }
}

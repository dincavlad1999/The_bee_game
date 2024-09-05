import { Insect } from "./Insect";

export class Queen extends Insect {
  constructor() {
    super(100);
  }

  takeDamage(): void {
    this.healthPoints = this.healthPoints - 8;
  }
}

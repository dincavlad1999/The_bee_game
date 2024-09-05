export abstract class Insect {
  protected healthPoints: number;

  constructor(healthPoints: number) {
    this.healthPoints = healthPoints;
  }

  get getHealth(): number {
    return this.healthPoints;
  }

  abstract takeDamage(damage: number): void;
}

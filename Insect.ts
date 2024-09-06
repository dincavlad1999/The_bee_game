export abstract class Insect {
  protected healthPoints: number;

  constructor(healthPoints: number) {
    this.healthPoints = healthPoints;
  }

  getHealth(): number {
    return this.healthPoints;
  }

  abstract takeDamage(): void;
}

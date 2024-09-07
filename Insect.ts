export abstract class Insect {
  readonly type: string;
  protected healthPoints: number;

  constructor(type: string, healthPoints: number) {
    this.type = type;
    this.healthPoints = healthPoints;
  }

  getHealth(): number {
    return this.healthPoints;
  }

  getType(): string {
    return this.type;
  }

  abstract takeDamage(): void;
}

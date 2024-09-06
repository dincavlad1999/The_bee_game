import { Drone } from "./Drone.js";
import { Insect } from "./Insect.js";
import { InsectType } from "./InsectType.js";
import { Queen } from "./Queen.js";
import { Worker } from "./Worker.js";

export class Hive {
  private insects: Insect[] = [];
  private static instance: Hive | null = null;

  private constructor() {
    this.initializeHiveSwarm();
  }

  public static createHive() {
    if (Hive.instance === null) {
      Hive.instance = new Hive();
    }
    return Hive.instance;
  }

  public getInsects(): Insect[] {
    return this.insects;
  }

  private initializeHiveSwarm(): void {
    this.insects = [];
    for (let index = 0; index < 8; index++) {
      this.insects = [...this.insects, this.createInsect(InsectType.DRONE)];
      if (index <= 4) {
        this.insects = [...this.insects, this.createInsect(InsectType.WORKER)];
      }
      if (index === 0) {
        this.insects = [...this.insects, this.createInsect(InsectType.QUEEN)];
      }
    }
    this.insects.sort(
      (insectA, insectB) => insectB.getHealth() - insectA.getHealth()
    );
  }

  public isGameOver(): boolean {
    if (this.isQueenDead() || !this.isSomeBeeAlive()) return true;
    return false;
  }

  private isQueenDead(): boolean {
    let queen: Queen | undefined = this.insects.find((insect: Insect) => {
      return insect instanceof Queen;
    });
    if (queen && queen.getHealth() <= 0) {
      return true;
    }
    return false;
  }

  private isSomeBeeAlive(): boolean {
    return this.insects.some((bee: Insect) => bee && bee.getHealth() > 0);
  }

  private createInsect(insectType: InsectType): Insect {
    switch (insectType) {
      case InsectType.QUEEN:
        return new Queen();
      case InsectType.WORKER:
        return new Worker();
      case InsectType.DRONE:
        return new Drone();
      default:
        throw new Error("Invalid insect type");
    }
  }

  private getRandomBeeIndex(): number {
    if (this.insects.length === 0) {
      return -1;
    }
    return Math.floor(Math.random() * this.insects.length);
  }

  public attackBee(): void {
    let randomBeeIndex: number = this.getRandomBeeIndex();
    let attackedBee: Insect | undefined = this.insects.find(
      (insect: Insect, beeIndex: number) => {
        return beeIndex === randomBeeIndex;
      }
    );
    if (attackedBee) {
      console.log("Attacked Bee before damage hp: ", attackedBee.getHealth());
      attackedBee.takeDamage();
      console.log("Attacked Bee after damage hp: ", attackedBee.getHealth());
      if (this.isGameOver()) {
        alert("Game Over");
        this.initializeHiveSwarm();
      } else {
        //Update the insects
        this.insects = this.insects.filter(
          (insect: Insect) => insect.getHealth() > 0
        );
      }
    } else {
      throw new Error("No bee with the generated index found.");
    }
  }
}

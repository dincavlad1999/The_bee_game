import { Drone } from "./Drone.js";
import { Insect } from "./Insect.js";
import { InsectType } from "./InsectType.js";
import { Queen } from "./Queen.js";
import { Worker } from "./Worker.js";
import { SessionStorage } from "./SessionStorage.js";

const sessionStorageKey: string = "swarmMembers";

export class BeeGame {
  private insects: Insect[] = [];
  private static instance: BeeGame | null = null;

  private constructor() {
    //Aici o sa initializez din Session storage daca este cazul sau daca nu apelez functia asta.
    this.initializeBeeGameSwarm();
  }

  public static createBeeGame() {
    if (BeeGame.instance === null) {
      BeeGame.instance = new BeeGame();
    }
    return BeeGame.instance;
  }

  public getInsects(): Insect[] {
    return this.insects;
  }

  private initializeBeeGameSwarm(): void {
    if (!SessionStorage.retrieveSessionData(sessionStorageKey)) {
      this.insects = [];
      for (let index = 0; index < 8; index++) {
        this.insects = [...this.insects, this.createInsect(InsectType.DRONE)];
        if (index <= 4) {
          this.insects = [
            ...this.insects,
            this.createInsect(InsectType.WORKER),
          ];
        }
        if (index === 0) {
          this.insects = [...this.insects, this.createInsect(InsectType.QUEEN)];
        }
      }
      this.insects.sort(
        (insectA, insectB) => insectB.getHealth() - insectA.getHealth()
      );
      SessionStorage.updateSession(sessionStorageKey, this.getInsects());
    } else {
      const insectsArray: { type: string; healthPoints: string }[] =
        SessionStorage.retrieveSessionData(sessionStorageKey);
      // Manually rehydrate data to their respective classes
      this.insects = insectsArray.map((insectData: any) => {
        if (insectData.type === "Queen") {
          return Object.assign(new Queen(), insectData);
        } else if (insectData.type === "Drone") {
          return Object.assign(new Drone(), insectData);
        } else if (insectData.type === "Worker") {
          return Object.assign(new Worker(), insectData);
        }
        return null;
      });
    }
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

  public getRandomBeeIndex(): number {
    if (this.insects.length === 0) {
      return -1;
    }
    return Math.floor(Math.random() * this.insects.length);
  }

  public attackBee(randomBeeIndex: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let attackedBee: Insect | undefined = this.insects.find(
        (insect: Insect, beeIndex: number) => {
          return beeIndex === randomBeeIndex;
        }
      );
      if (attackedBee) {
        console.log("Attacked Bee before damage hp: ", attackedBee.getHealth());
        attackedBee.takeDamage();
        let isAttackedBeeKilled: boolean =
          attackedBee.getHealth() < 0 ? true : false;
        console.log("Attacked Bee after damage hp: ", attackedBee.getHealth());
        if (this.isGameOver()) {
          alert("Game Over");
          SessionStorage.clearSessionData();
          this.initializeBeeGameSwarm();
          resolve(isAttackedBeeKilled);
        } else {
          if (isAttackedBeeKilled) {
            this.insects = this.insects.filter(
              (insect: Insect) => insect.getHealth() > 0
            );
          }
          SessionStorage.updateSession(sessionStorageKey, this.getInsects());
          resolve(isAttackedBeeKilled);
        }
      } else {
        reject(new Error("No bee with the generated index found."));
      }
    });
  }

  //Detailed Swarm Data

  public getSwarmHealth(): number {
    let swarmHealth: number = 0;
    this.getInsects().forEach((insect: Insect) => {
      swarmHealth += insect.getHealth();
    });
    return swarmHealth;
  }

  public getAliveBeeWorkerNumber(): number {
    let aliveBeeWorkers: number = 0;
    this.getInsects().forEach((insect: Insect) => {
      if (insect.getType() === "Worker" && insect.getHealth() > 0) {
        aliveBeeWorkers++;
      }
    });
    return aliveBeeWorkers;
  }

  public getAliveBeeDroneNumber(): number {
    let aliveBeeDrone: number = 0;
    this.getInsects().forEach((insect: Insect) => {
      if (insect.getType() === "Drone" && insect.getHealth() > 0) {
        aliveBeeDrone++;
      }
    });
    return aliveBeeDrone;
  }

  public isBeeQueenAlive(): boolean {
    let isBeeQueenAlive: boolean = true;
    this.getInsects().forEach((insect: Insect) => {
      if (insect.getType() === "Queen" && insect.getHealth() < 0) {
        isBeeQueenAlive = false;
      }
    });
    return isBeeQueenAlive;
  }

  public getAliveBeesNumber(): number {
    return this.getInsects().length;
  }
}

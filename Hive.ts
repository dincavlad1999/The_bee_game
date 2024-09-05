import { Drone } from "./Drone";
import { Insect } from "./Insect";
import { InsectType } from "./InsectType";
import { Queen } from "./Queen";
import { Worker } from "./Worker";

class Hive {
  private static instance: Hive | null = null;

  private constructor() {}

  public static createHive() {
    if (Hive.instance === null) {
      Hive.instance = new Hive();
    }
    return Hive.instance;
  }

  public createInsect(insectType: InsectType): Insect {
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
}

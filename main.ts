import { Hive } from "./Hive.js";

console.log("Sunt in Main.");

function hitTheHive(): void {
  let hive: Hive = Hive.createHive();
  console.log(hive.isGameOver());
  console.log(hive.getInsects());
}

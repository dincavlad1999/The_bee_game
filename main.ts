import { Hive } from "./Hive";

function hitTheHive() {
  var hive: Hive = Hive.createHive();
  console.log(hive.isGameOver());
  console.log(hive.getInsects());
}

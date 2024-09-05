import { Hive } from "./Hive.js";
console.log("Sunt in Main.");
function hitTheHive() {
    let hive = Hive.createHive();
    console.log(hive.isGameOver());
    console.log(hive.getInsects());
}

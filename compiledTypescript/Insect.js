export class Insect {
    type;
    healthPoints;
    constructor(type, healthPoints) {
        this.type = type;
        this.healthPoints = healthPoints;
    }
    getHealth() {
        return this.healthPoints;
    }
    //Created for testing purposes
    setHealth(hp) {
        this.healthPoints = hp;
    }
    getType() {
        return this.type;
    }
}

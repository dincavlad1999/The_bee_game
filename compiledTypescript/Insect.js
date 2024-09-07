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
    getType() {
        return this.type;
    }
}

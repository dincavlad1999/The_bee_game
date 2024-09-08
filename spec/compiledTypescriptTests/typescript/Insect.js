"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insect = void 0;
var Insect = /** @class */ (function () {
    function Insect(type, healthPoints) {
        this.type = type;
        this.healthPoints = healthPoints;
    }
    Insect.prototype.getHealth = function () {
        return this.healthPoints;
    };
    //Created for testing purposes
    Insect.prototype.setHealth = function (hp) {
        this.healthPoints = hp;
    };
    Insect.prototype.getType = function () {
        return this.type;
    };
    return Insect;
}());
exports.Insect = Insect;

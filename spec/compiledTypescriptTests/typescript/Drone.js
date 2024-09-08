"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drone = void 0;
var Insect_1 = require("./Insect");
var Drone = /** @class */ (function (_super) {
    __extends(Drone, _super);
    function Drone() {
        return _super.call(this, "Drone", 50) || this;
    }
    Drone.prototype.takeDamage = function () {
        this.healthPoints = this.healthPoints - 12;
    };
    return Drone;
}(Insect_1.Insect));
exports.Drone = Drone;

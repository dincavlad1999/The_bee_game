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
exports.Worker = void 0;
var Insect_1 = require("./Insect");
var Worker = /** @class */ (function (_super) {
    __extends(Worker, _super);
    function Worker() {
        return _super.call(this, "Worker", 75) || this;
    }
    Worker.prototype.takeDamage = function () {
        this.healthPoints = this.healthPoints - 10;
    };
    return Worker;
}(Insect_1.Insect));
exports.Worker = Worker;

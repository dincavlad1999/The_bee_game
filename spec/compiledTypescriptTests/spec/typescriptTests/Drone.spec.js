"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Drone_js_1 = require("../../typescript/Drone.js");
var Insect_js_1 = require("../../typescript/Insect.js");
describe("Drone", function () {
    var drone;
    beforeEach(function () {
        // Create a new Drone instance before each test
        drone = new Drone_js_1.Drone();
    });
    it("should have correct initial healthPoints", function () {
        expect(drone.getHealth()).toBe(50);
    });
    it("should take damage correctly", function () {
        drone.takeDamage();
        expect(drone.getHealth()).toBe(38); // 50 - 12 = 38
    });
    it("should be a subclass of Insect", function () {
        expect(drone).toBeInstanceOf(Insect_js_1.Insect);
    });
});

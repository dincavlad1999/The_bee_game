"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Worker_1 = require("../../typescript/Worker");
var Insect_1 = require("../../typescript/Insect");
describe("Worker", function () {
    var worker;
    beforeEach(function () {
        // Create a new Worker instance before each test
        worker = new Worker_1.Worker();
    });
    it("should have correct initial healthPoints", function () {
        expect(worker.getHealth()).toBe(75);
    });
    it("should take damage correctly", function () {
        worker.takeDamage();
        expect(worker.getHealth()).toBe(65); // 75 10 = 65
    });
    it("should be a subclass of Insect", function () {
        expect(worker).toBeInstanceOf(Insect_1.Insect);
    });
});

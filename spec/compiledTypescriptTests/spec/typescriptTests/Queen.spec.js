"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queen_1 = require("../../typescript/Queen");
var Insect_1 = require("../../typescript/Insect");
describe("Queen", function () {
    var queen;
    beforeEach(function () {
        // Create a new Queen instance before each test
        queen = new Queen_1.Queen();
    });
    it("should have correct initial healthPoints", function () {
        expect(queen.getHealth()).toBe(100); // 100
    });
    it("should take damage correctly", function () {
        queen.takeDamage();
        expect(queen.getHealth()).toBe(92); // 100 - 8 = 92
    });
    it("should be a subclass of Insect", function () {
        expect(queen).toBeInstanceOf(Insect_1.Insect);
    });
});

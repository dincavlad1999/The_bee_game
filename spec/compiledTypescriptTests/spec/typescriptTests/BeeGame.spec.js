"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BeeGame_1 = require("../../typescript/BeeGame");
var Drone_1 = require("../../typescript/Drone");
var Queen_1 = require("../../typescript/Queen");
var Worker_1 = require("../../typescript/Worker");
//I did this because sessionStorage is not supported by jasmine because it runs in node.js and there is no acces to browser specific APIS.
var mockSessionStorage = {
    data: {},
    getItem: function (key) { return mockSessionStorage.data[key] || null; },
    setItem: function (key, value) {
        mockSessionStorage.data[key] = value;
    },
    removeItem: function (key) {
        delete mockSessionStorage.data[key];
    },
    clear: function () {
        mockSessionStorage.data = {};
    },
};
Object.defineProperty(globalThis, "sessionStorage", {
    value: mockSessionStorage,
    writable: true,
});
describe("BeeGame", function () {
    var game;
    beforeEach(function () {
        game = BeeGame_1.BeeGame.createBeeGame();
    });
    it("should initialize with a swarm of bees", function () {
        var insects = game.getInsects();
        expect(insects.length).toBe(14);
        expect(insects.some(function (insect) { return insect instanceof Queen_1.Queen; })).toBe(true);
        expect(insects.some(function (insect) { return insect instanceof Worker_1.Worker; })).toBe(true);
        expect(insects.some(function (insect) { return insect instanceof Drone_1.Drone; })).toBe(true);
    });
    it("should correctly identify if the queen is dead", function () {
        var insects = game.getInsects();
        var queen = insects.find(function (insect) { return insect instanceof Queen_1.Queen; });
        if (queen) {
            queen.setHealth(0);
            expect(game.isQueenDead()).toBe(true);
        }
        else {
            fail("Queen insect is not found");
        }
    });
    it("should correctly determine if some bees are alive", function () {
        var insects = game.getInsects();
        expect(game.isSomeBeeAlive()).toBe(insects.some(function (bee) { return bee.getHealth() > 0; }));
    });
    it("should attack a bee and update the swarm accordingly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var initialSwarmHealth, randomIndex, result, attackedBee, isAttackedBeeKilled;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    initialSwarmHealth = game.getSwarmHealth();
                    randomIndex = game.getRandomBeeIndex();
                    return [4 /*yield*/, game.attackBee(randomIndex)];
                case 1:
                    result = _a.sent();
                    attackedBee = game
                        .getInsects()
                        .find(function (_, index) { return index === randomIndex; });
                    isAttackedBeeKilled = attackedBee
                        ? attackedBee.getHealth() <= 0
                        : false;
                    expect(result).toBe(isAttackedBeeKilled);
                    expect(game.getSwarmHealth()).toBeLessThan(initialSwarmHealth);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return the number of alive worker bees", function () {
        var insects = game
            .getInsects()
            .filter(function (insect) { return insect instanceof Worker_1.Worker; });
        insects.forEach(function (worker) { return worker.setHealth(0); });
        expect(game.getAliveBeeWorkerNumber()).toBe(0);
    });
    it("should return the number of alive drone bees", function () {
        var insects = game
            .getInsects()
            .filter(function (insect) { return insect instanceof Drone_1.Drone; });
        insects.forEach(function (drone) { return drone.setHealth(0); });
        expect(game.getAliveBeeDroneNumber()).toBe(0);
    });
    it("should check if the bee queen is alive", function () {
        var insects = game.getInsects();
        var queen = insects.find(function (insect) { return insect instanceof Queen_1.Queen; });
        if (queen) {
            queen.setHealth(0);
            expect(game.isBeeQueenAlive()).toBe(true);
        }
        else {
            fail("Queen insect is not found");
        }
    });
    it("should return the number of alive bees", function () {
        var initialCount = game.getAliveBeesNumber();
        expect(initialCount).toBe(game.getInsects().length);
    });
});

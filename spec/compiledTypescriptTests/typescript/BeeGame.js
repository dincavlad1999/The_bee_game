"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeeGame = void 0;
var Drone_1 = require("./Drone");
var InsectType_1 = require("./InsectType");
var Queen_1 = require("./Queen");
var Worker_1 = require("./Worker");
var SessionStorage_1 = require("./SessionStorage");
var sessionStorageKey = "swarmMembers";
var BeeGame = /** @class */ (function () {
    function BeeGame() {
        this.insects = [];
        //Aici o sa initializez din Session storage daca este cazul sau daca nu apelez functia asta.
        this.initializeBeeGameSwarm();
    }
    BeeGame.createBeeGame = function () {
        if (BeeGame.instance === null) {
            BeeGame.instance = new BeeGame();
        }
        return BeeGame.instance;
    };
    BeeGame.prototype.getInsects = function () {
        return this.insects;
    };
    BeeGame.prototype.initializeBeeGameSwarm = function () {
        if (!SessionStorage_1.SessionStorage.retrieveSessionData(sessionStorageKey)) {
            this.insects = [];
            for (var index = 0; index < 8; index++) {
                this.insects = __spreadArray(__spreadArray([], this.insects, true), [this.createInsect(InsectType_1.InsectType.DRONE)], false);
                if (index <= 4) {
                    this.insects = __spreadArray(__spreadArray([], this.insects, true), [
                        this.createInsect(InsectType_1.InsectType.WORKER),
                    ], false);
                }
                if (index === 0) {
                    this.insects = __spreadArray(__spreadArray([], this.insects, true), [this.createInsect(InsectType_1.InsectType.QUEEN)], false);
                }
            }
            this.insects.sort(function (insectA, insectB) { return insectB.getHealth() - insectA.getHealth(); });
            SessionStorage_1.SessionStorage.updateSession(sessionStorageKey, this.getInsects());
        }
        else {
            var insectsArray = SessionStorage_1.SessionStorage.retrieveSessionData(sessionStorageKey);
            // Manually rehydrate data to their respective classes
            this.insects = insectsArray.map(function (insectData) {
                if (insectData.type === "Queen") {
                    return Object.assign(new Queen_1.Queen(), insectData);
                }
                else if (insectData.type === "Drone") {
                    return Object.assign(new Drone_1.Drone(), insectData);
                }
                else if (insectData.type === "Worker") {
                    return Object.assign(new Worker_1.Worker(), insectData);
                }
                return null;
            });
        }
    };
    BeeGame.prototype.isGameOver = function () {
        if (this.isQueenDead() || !this.isSomeBeeAlive())
            return true;
        return false;
    };
    BeeGame.prototype.isQueenDead = function () {
        var queen = this.insects.find(function (insect) {
            return insect instanceof Queen_1.Queen;
        });
        if (queen && queen.getHealth() <= 0) {
            return true;
        }
        return false;
    };
    BeeGame.prototype.isSomeBeeAlive = function () {
        return this.insects.some(function (bee) { return bee && bee.getHealth() > 0; });
    };
    BeeGame.prototype.createInsect = function (insectType) {
        switch (insectType) {
            case InsectType_1.InsectType.QUEEN:
                return new Queen_1.Queen();
            case InsectType_1.InsectType.WORKER:
                return new Worker_1.Worker();
            case InsectType_1.InsectType.DRONE:
                return new Drone_1.Drone();
            default:
                throw new Error("Invalid insect type");
        }
    };
    BeeGame.prototype.getRandomBeeIndex = function () {
        if (this.insects.length === 0) {
            return -1;
        }
        return Math.floor(Math.random() * this.insects.length);
    };
    BeeGame.prototype.attackBee = function (randomBeeIndex) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var attackedBee = _this.insects.find(function (insect, beeIndex) {
                return beeIndex === randomBeeIndex;
            });
            if (attackedBee) {
                attackedBee.takeDamage();
                var isAttackedBeeKilled = attackedBee.getHealth() < 0 ? true : false;
                if (_this.isGameOver()) {
                    alert("Game Over");
                    SessionStorage_1.SessionStorage.clearSessionData();
                    _this.initializeBeeGameSwarm();
                    resolve(isAttackedBeeKilled);
                }
                else {
                    if (isAttackedBeeKilled) {
                        _this.insects = _this.insects.filter(function (insect) { return insect.getHealth() > 0; });
                    }
                    SessionStorage_1.SessionStorage.updateSession(sessionStorageKey, _this.getInsects());
                    resolve(isAttackedBeeKilled);
                }
            }
            else {
                reject(new Error("No bee with the generated index found."));
            }
        });
    };
    //Detailed Swarm Data
    BeeGame.prototype.getSwarmHealth = function () {
        var swarmHealth = 0;
        this.getInsects().forEach(function (insect) {
            swarmHealth += insect.getHealth();
        });
        return swarmHealth;
    };
    BeeGame.prototype.getAliveBeeWorkerNumber = function () {
        var aliveBeeWorkers = 0;
        this.getInsects().forEach(function (insect) {
            if (insect.getType() === "Worker" && insect.getHealth() > 0) {
                aliveBeeWorkers++;
            }
        });
        return aliveBeeWorkers;
    };
    BeeGame.prototype.getAliveBeeDroneNumber = function () {
        var aliveBeeDrone = 0;
        this.getInsects().forEach(function (insect) {
            if (insect.getType() === "Drone" && insect.getHealth() > 0) {
                aliveBeeDrone++;
            }
        });
        return aliveBeeDrone;
    };
    BeeGame.prototype.isBeeQueenAlive = function () {
        var isBeeQueenAlive = true;
        this.getInsects().forEach(function (insect) {
            if (insect.getType() === "Queen" && insect.getHealth() < 0) {
                isBeeQueenAlive = false;
            }
        });
        return isBeeQueenAlive;
    };
    BeeGame.prototype.getAliveBeesNumber = function () {
        return this.getInsects().length;
    };
    BeeGame.instance = null;
    return BeeGame;
}());
exports.BeeGame = BeeGame;

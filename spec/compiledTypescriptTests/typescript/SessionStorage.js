"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStorage = void 0;
var SessionStorage = /** @class */ (function () {
    function SessionStorage() {
    }
    SessionStorage.updateSession = function (key, value) {
        if (sessionStorage.getItem(key)) {
            sessionStorage.removeItem(key);
            sessionStorage.setItem(key, JSON.stringify(value));
            return;
        }
        sessionStorage.setItem(key, JSON.stringify(value));
    };
    SessionStorage.retrieveSessionData = function (key) {
        var sessionData = sessionStorage.getItem(key);
        if (sessionData) {
            return JSON.parse(sessionData);
        }
        return null;
    };
    SessionStorage.clearSessionData = function () {
        sessionStorage.clear();
    };
    return SessionStorage;
}());
exports.SessionStorage = SessionStorage;

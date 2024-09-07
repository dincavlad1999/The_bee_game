export class SessionStorage {
    static updateSession(key, value) {
        if (sessionStorage.getItem(key)) {
            sessionStorage.removeItem(key);
            sessionStorage.setItem(key, JSON.stringify(value));
            return;
        }
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    static retrieveSessionData(key) {
        let sessionData = sessionStorage.getItem(key);
        if (sessionData) {
            return JSON.parse(sessionData);
        }
        return null;
    }
    static clearSessionData() {
        sessionStorage.clear();
    }
}

export class SessionStorage {
  public static updateSession(key: string, value: any): void {
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
      sessionStorage.setItem(key, JSON.stringify(value));
      return;
    }
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static retrieveSessionData(key: string): any {
    let sessionData: any = sessionStorage.getItem(key);
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    return null;
  }

  public static clearSessionData(): void {
    sessionStorage.clear();
  }
}

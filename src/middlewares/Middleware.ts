import isAuthenticated from "./isAuthenticated";
import isGuest from "./IsGuest";

class Middleware {
  public static isGuest() {
    return isGuest();
  }

  public static isAuthenticated() {
    return isAuthenticated();
  }
}

export default Middleware;

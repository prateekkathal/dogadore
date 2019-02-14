export default class UserApi {
  public static baseUrl = (): string => {
    return process.env.APP_URL + "/api/";
  };

  public static loginUrl = (): string => {
    return UserApi.baseUrl() + "login";
  };

  public static signUpUrl = (): string => {
    return UserApi.baseUrl() + "sign-up";
  };

  public static meUrl = (): string => {
    return UserApi.baseUrl() + "me";
  };

  public static createLikeUrl = (): string => {
    return UserApi.baseUrl() + "likes";
  };

  public static checkLikeUrl = (): string => {
    return UserApi.baseUrl() + "likes/check";
  };
}

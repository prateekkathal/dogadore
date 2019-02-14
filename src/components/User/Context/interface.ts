import User from "../../../models/User";

export interface UserContext {
  user: User;
  accessToken: string;
  handleTokenChange: (event: any, accessToken: string) => void;
  handleUserChange: (event: any, user: User) => void;
}

import { navigate, RouteComponentProps } from "@reach/router";
import React from "react";
import User from "../../models/User";
import { default as logoutUser } from "../../store/Auth/Logout";
import { Consumer as UserConsumer } from "../User/Context";

interface Props {
  userContext: {
    user: User;
    accessToken: string;
    handleTokenChange: (event: any, accessToken: string) => void;
    handleUserChange: (event: any, user: User) => void;
  };
}

class Logout extends React.Component<Props & RouteComponentProps> {
  public componentDidMount() {
    logoutUser()
      .then(response => {
        this.props.userContext.handleTokenChange({}, "");
        this.props.userContext.handleUserChange({}, {} as User);
        navigate("/");
      })
      .catch(e => navigate("/"));
  }
  public render() {
    return (
      <div>
        <h1>You've been logged out!</h1>
      </div>
    );
  }
}

export default function LogoutWithContext(props: any) {
  return (
    <UserConsumer>
      {userContext => <Logout {...props} userContext={userContext} />}
    </UserConsumer>
  );
}

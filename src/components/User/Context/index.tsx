import React from "react";
import User from "../../../models/User";
import Me from "../../../store/Auth/Me";

const initialState = {
  accessToken: "" as string,
  user: {} as User,
  handleTokenChange: (event: any, accessToken: string) => {},
  handleUserChange: (event: any, user: User) => {}
};

interface StateInterface {
  accessToken: string;
  user: User;
  handleTokenChange: (event: any, accessToken: string) => void;
  handleUserChange: (event: any, user: User) => void;
}

const UserContext = React.createContext(initialState);

class UserProvider extends React.Component<{}, StateInterface> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: {} as User,
      accessToken: "",
      handleTokenChange: this.handleTokenChange,
      handleUserChange: this.handleUserChange
    };
  }

  public async componentDidMount() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return;
    }

    await Me(accessToken)
      .then(user => {
        this.handleUserChange({}, user);
        this.handleTokenChange({}, accessToken);
      })
      .catch(error => {
        localStorage.setItem("accessToken", "");
        localStorage.setItem("user", "");
        this.setState({ accessToken: "", user: {} as User });
      });
  }

  public handleTokenChange = (event: any, accessToken: string = "") => {
    this.setState({ accessToken });
  };

  public handleUserChange = (event: any, user: User) => {
    this.setState({ user });
  };

  public render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const Consumer = UserContext.Consumer;
export const Provider = UserProvider;

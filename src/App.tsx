import { Router } from "@reach/router";
import React from "react";
import { Container } from "react-bootstrap";
import { Authenticated } from "./components/Base/Autheticated";
import { Guest } from "./components/Base/Guest";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import { Provider as SearchProvider } from "./components/Search/Context";
import Signup from "./components/Signup";
import { Provider as UserProvider } from "./components/User/Context";

class App extends React.Component {
  public render() {
    return (
      <div>
        <UserProvider>
          <Header />
          <Container>
            <SearchProvider>
              <Router>
                <Home path="/" />
                <Guest path="login" component={Login} />
                <Guest path="sign-up" component={Signup} />
                <Authenticated path="logout" component={Logout} />
                <NotFound default={true} />
              </Router>
            </SearchProvider>
          </Container>
        </UserProvider>
      </div>
    );
  }
}

export default App;

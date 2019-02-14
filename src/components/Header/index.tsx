import styled from "@emotion/styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, RouteComponentProps } from "@reach/router";
import React from "react";
import { Navbar } from "react-bootstrap";
import { THEME } from "./../../styles/theme";
import { Consumer as UserConsumer } from "./../User/Context";

library.add(faDog);
library.add(faHeart);

const HeaderNav = styled(Navbar)`
  padding: 0;
  padding-left: 50px;
  padding-right: 100px;
  margin: 0;
  background-color: ${THEME.primary};
`;

const HeaderNavLogo = styled(Navbar.Brand)`
  padding-left: 20px;
`;

const HeaderNavItem = styled(Navbar.Text)`
  padding: 20px 40px 20px 40px;
`;

const HeadNavLink = styled(Link)`
  margin: 0;
  border: 0;
  padding-top: 0;
  padding-bottom: 0;
  font-weight: 500;

  & > span {
    color: ${THEME.white} !important;
  }

  &:hover > span {
    color: ${THEME.primary} !important;
    background-color: ${THEME.white} !important;
  }
`;

class Header extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <UserConsumer>
        {(userContext: any) => {
          return (
            <HeaderNav variant={"dark"}>
              <HeaderNavLogo href="/">
                Dog Adore | <FontAwesomeIcon icon="dog" size="lg" />{" "}
                <FontAwesomeIcon icon="heart" size="lg" />
              </HeaderNavLogo>
              <Navbar.Collapse className="justify-content-end">
                <HeadNavLink to="/">
                  <HeaderNavItem>Home</HeaderNavItem>
                </HeadNavLink>
                {!userContext.accessToken.length ? (
                  <HeadNavLink to="/login">
                    <HeaderNavItem>Login</HeaderNavItem>
                  </HeadNavLink>
                ) : (
                  <HeadNavLink to="/logout">
                    <HeaderNavItem>
                      Hi {userContext.user.name.first}, Wanna Logout?
                    </HeaderNavItem>
                  </HeadNavLink>
                )}
              </Navbar.Collapse>
            </HeaderNav>
          );
        }}
      </UserConsumer>
    );
  }
}

export default Header;

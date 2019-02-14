import styled from "@emotion/styled";
import { Link, navigate, RouteComponentProps } from "@reach/router";
import React, { FormEvent, ReactType } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { BsPrefixProps, ReplaceProps } from "react-bootstrap/helpers";
import User from "../../models/User";
import { THEME } from "../../styles/theme";
import { Consumer as UserConsumer } from "../User/Context";
import { default as LoginUser } from "./../../store/Auth/Login";

const LoginCard = styled(Card)`
  margin-top: 150px;
`;

const LoginCardBody = styled(Card.Body)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const LoginCardHeading = styled("h1")`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const LoginButton = styled(Button)`
  border-color: ${THEME.primary};
  background-color: ${THEME.primary};

  &:hover,
  &:focus,
  &:active {
    border-width: 2px;
    color: ${THEME.primary} !important;
    border-color: ${THEME.primary} !important;
    background-color: ${THEME.white} !important;
  }
`;

interface Props {
  userData: {
    user: object;
    accessToken: string;
    handleTokenChange: (event: any, accessToken: string) => void;
    handleUserChange: (event: any, user: User) => void;
  };
}

class Login extends React.Component<Props & RouteComponentProps> {
  public state = {
    username: "" as string,
    password: "" as string,
    error: "" as string,
    success: false as boolean
  };
  public handlePasswordChange = (
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) => {
    this.setState({ password: event.currentTarget.value });
  };
  public handleUsernameChange = (
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) => {
    this.setState({ username: event.currentTarget.value });
  };
  public login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    LoginUser(this.state.username, this.state.password)
      .then(
        (user): any => {
          this.setState({ success: true });

          const { _id, name, username, likes } = user;

          this.props.userData.handleUserChange(
            event,
            new User(_id, name, username, likes)
          );

          this.props.userData.handleTokenChange(
            event,
            localStorage.getItem("accessToken") || ""
          );

          navigate("/");
        }
      )
      .catch(error => {
        this.setState({ error });
      });
  };
  public render() {
    return (
      <Row>
        <Col xs={true} lg={{ span: 6, offset: 3 }}>
          <LoginCard>
            <LoginCardBody className="justify-content-center">
              <LoginCardHeading className="text-center">Login</LoginCardHeading>
              <Row>
                <Col xs={true} lg={{ span: 10, offset: 1 }}>
                  {this.state.error ? (
                    <Alert variant={"danger"}>{this.state.error}</Alert>
                  ) : (
                    ""
                  )}
                  <Form onSubmit={this.login}>
                    <Form.Group controlId="email">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        onChange={this.handleUsernameChange}
                        type="text"
                        placeholder="Enter username"
                        maxLength={255}
                        required={true}
                      />
                      <Form.Text className="text-muted">
                        should be simple...
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        onChange={this.handlePasswordChange}
                        type="password"
                        placeholder="Enter password"
                        maxLength={255}
                        required={true}
                      />
                      <Form.Text className="text-muted">
                        this can be tough...
                      </Form.Text>
                    </Form.Group>
                    <Row>
                      <Col>
                        <LoginButton block={true} type="submit">
                          Log Me In!
                        </LoginButton>
                      </Col>
                      <Col>
                        <Button variant="light" block={true} href="sign-up">
                          Signup
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </LoginCardBody>
          </LoginCard>
        </Col>
      </Row>
    );
  }
}

export default function LoginWithContext(props: RouteComponentProps) {
  return (
    <UserConsumer>
      {context => <Login {...props} userData={context} />}
    </UserConsumer>
  );
}

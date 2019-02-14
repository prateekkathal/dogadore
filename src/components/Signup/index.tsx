import styled from "@emotion/styled";
import { navigate, RouteComponentProps } from "@reach/router";
import React, { FormEvent, ReactType } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { BsPrefixProps, ReplaceProps } from "react-bootstrap/helpers";
import User from "../../models/User";
import { THEME } from "../../styles/theme";
import { Consumer as UserConsumer } from "../User/Context";
import { default as SignupUser } from "./../../store/Auth/Signup";

const SignupCard = styled(Card)`
  margin-top: 150px;
`;

const SignupCardBody = styled(Card.Body)`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const SignupCardHeading = styled("h1")`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SignupButton = styled(Button)`
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

interface State {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  error: string;
  success: boolean;
}

class Login extends React.Component<Props & RouteComponentProps, State> {
  public state = {
    firstName: "" as string,
    lastName: "" as string,
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
  public handleFirstnameChange = (
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) => {
    this.setState({ firstName: event.currentTarget.value });
  };
  public handleLastnameChange = (
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) => {
    this.setState({ lastName: event.currentTarget.value });
  };
  public login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { firstName, lastName, username, password } = this.state;

    SignupUser(firstName, lastName, username, password)
      .then(
        (user): any => {
          this.setState({ success: true });

          // tslint:disable-next-line:no-shadowed-variable
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
          <SignupCard>
            <SignupCardBody className="justify-content-center">
              <SignupCardHeading className="text-center">
                Sign Up
              </SignupCardHeading>
              <Row>
                <Col xs={true} lg={{ span: 10, offset: 1 }}>
                  {this.state.error ? (
                    <Alert variant={"danger"}>{this.state.error}</Alert>
                  ) : (
                    ""
                  )}
                  <Form onSubmit={this.login}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        onChange={this.handleFirstnameChange}
                        type="text"
                        placeholder="Enter first name"
                        maxLength={255}
                        required={true}
                      />
                      <Form.Text className="text-muted">
                        you've gotta remember this...
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        onChange={this.handleLastnameChange}
                        type="text"
                        placeholder="Enter last name"
                        maxLength={255}
                      />
                      <Form.Text className="text-muted">
                        unnecessary...
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="username">
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
                    <SignupButton variant="primary" type="submit" block={true}>
                      Sign Up
                    </SignupButton>
                  </Form>
                </Col>
              </Row>
            </SignupCardBody>
          </SignupCard>
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

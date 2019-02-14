import styled from "@emotion/styled";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { THEME } from "../../styles/theme";

const BigHeading = styled("h1")`
  color: ${THEME.primary};
  font-size: 96px;
  font-weight: 500;
  margin-top: 150px;
`;

const BigButton = styled(Button)`
  margin-top: 50px;
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

class NotFound extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <Row>
        <Col xs={true} lg={{ span: 10, offset: 1 }} className="text-center">
          <BigHeading>404 Not Found!</BigHeading>
          <BigButton size="lg" href="/">
            Back To Home
          </BigButton>
        </Col>
      </Row>
    );
  }
}

export default NotFound;

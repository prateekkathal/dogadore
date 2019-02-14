import { Redirect } from "@reach/router";
import React from "react";
import Middleware from "../../../middlewares/Middleware";

export const Authenticated = ({
  component: Component,
  path,
  ...rest
}: {
  component: any;
  path: string;
}) => {
  return Middleware.isAuthenticated() ? (
    <Component path={path} {...rest} />
  ) : (
    <Redirect to="/" {...rest} noThrow={true} />
  );
};

import { Redirect } from "@reach/router";
import React from "react";
import Middleware from "../../../middlewares/Middleware";

export const Guest = ({
  component: Component,
  path,
  ...rest
}: {
  component: any;
  path: string;
}) => {
  return Middleware.isGuest() ? (
    <Component path={path} {...rest} />
  ) : (
    <Redirect to="/" {...rest} noThrow={true} />
  );
};

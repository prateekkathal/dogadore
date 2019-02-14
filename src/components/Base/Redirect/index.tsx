import { redirectTo, RouteComponentProps } from "@reach/router";
import React from "react";

interface Props {
  to: string;
}

class Redirect extends React.Component<RouteComponentProps & Props> {
  constructor(props: any) {
    super(props);
  }
  public componentDidMount() {
    return redirectTo(this.props.to);
  }
  public render() {
    return null;
  }
}

export default Redirect;

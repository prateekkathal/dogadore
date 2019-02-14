import styled from "@emotion/styled";
import { Link, RouteComponentProps } from "@reach/router";
import React from "react";
import { Button, Col, Jumbotron, Row } from "react-bootstrap";
import Breed from "../../models/Breed";
import SubBreed from "../../models/SubBreed";
import User from "../../models/User";
import { getDogs } from "../../store/GetDogs";
import { default as DogCol } from "../Dog";
import Search from "../Search";
import { Consumer as SearchConsumer } from "../Search/Context";
import { Consumer as UserConsumer } from "../User/Context";
import Dog from "./../../models/Dog";

const HomeDiv = styled.div`
  padding: 50px;
  margin-top: 20px;
`;

interface State {
  dogs: Dog[];
}

interface Props {
  userContext: {
    user: User;
    accessToken: string;
    handleTokenChange: (event: any, accessToken: string) => void;
    handleUserChange: (event: any, user: User) => void;
  };
  searchParams: {
    breed: Breed;
    breeds: Breed[];
    subBreed: SubBreed;
  };
}

class Home extends React.Component<Props & RouteComponentProps, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      dogs: []
    };
  }
  public async componentDidMount() {
    await this.filterDogs();
  }
  public filterDogs = async () => {
    await getDogs(
      this.props.searchParams.breed,
      this.props.searchParams.subBreed
    ).then(dogs => {
      this.setState({
        dogs
      });
    });
  };
  public render() {
    const { dogs } = this.state;
    return (
      <HomeDiv>
        <Search filterDogs={this.filterDogs} />
        <Row>
          {Boolean(dogs.length) &&
            dogs.map((dog, index) => {
              return <DogCol key={index} dog={dog} index={index} />;
            })}
        </Row>
      </HomeDiv>
    );
  }
}

export default function HomeWitContext(props: RouteComponentProps) {
  return (
    <UserConsumer>
      {userContext => (
        <SearchConsumer>
          {searchContext => (
            <Home
              {...props}
              userContext={userContext}
              searchParams={searchContext}
            />
          )}
        </SearchConsumer>
      )}
    </UserConsumer>
  );
}

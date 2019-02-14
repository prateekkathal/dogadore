import styled from "@emotion/styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navigate } from "@reach/router";
import React from "react";
import { Button, Col, Image } from "react-bootstrap";
import User from "../../models/User";
import createLike from "../../store/CreateLike";
import { THEME } from "../../styles/theme";
import DogModal from "../Modal";
import { Consumer as UserConsumer } from "../User/Context";
import { default as DogModel } from "./../../models/Dog";

library.add(faHeart);

const DogCol = styled(Col)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const HeartIconRed = styled(FontAwesomeIcon)`
  color: ${THEME.red};
`;

const HeartIconWhite = styled(FontAwesomeIcon)`
  color: ${THEME.white};
`;

const HeartButton = styled(Button)`
  padding-top: 15px;
  padding-bottom: 15px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const DogImage = styled.div`
  width: 100%;
  min-height: 300px;
  background-size: cover;
  background-position: center center;

  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  dog: DogModel;
  index: number;
  userContext: {
    user: User;
    accessToken: string;
    handleUserChange: (event: any, user: User) => void;
  };
}

interface State {
  liked: boolean;
  modal: boolean;
}

class Dog extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      liked: false,
      modal: false
    };
  }
  public componentDidMount() {
    this.checkLike();
  }
  public likeDog = (e: any) => {
    if (!this.props.userContext.accessToken.length) {
      return navigate("/login");
    }

    const url = e.currentTarget.dataset.url;

    createLike(this.props.userContext.accessToken, url)
      .then((response: any) => {
        this.setState({ liked: true });

        const user = this.props.userContext.user;
        user.likes.push(url);
        this.props.userContext.handleUserChange(e, user);
      })
      .catch((error: any) => {});
  };
  public modalState = () => {
    const modal = !this.state.modal;

    this.setState({ modal });
  };
  public checkLike = () => {
    if (!this.props.userContext.accessToken.length) {
      return;
    }

    const { user } = this.props.userContext;

    const liked =
      user.likes.length && user.likes.includes(this.props.dog.image)
        ? true
        : false;

    this.setState({ liked });
  };
  public componentDidUpdate(prevProps: any) {
    if (this.props.dog.image !== prevProps.dog.image) {
      this.checkLike();
    }
  }
  public render() {
    return (
      <DogCol lg={{ span: 4, offset: 0 }} key={this.props.index}>
        <DogModal
          modal={this.state.modal}
          dog={this.props.dog}
          modalState={this.modalState}
        />
        <DogImage
          style={{ backgroundImage: `url(${this.props.dog.image})` }}
          onClick={this.modalState}
        />
        <HeartButton
          variant={this.state.liked ? "danger" : "light"}
          block={true}
          onClick={this.likeDog}
          data-url={this.props.dog.image}
        >
          {!this.state.liked ? (
            <HeartIconRed icon="heart" size={"lg"} />
          ) : (
            <HeartIconWhite icon="heart" size={"lg"} />
          )}
        </HeartButton>
      </DogCol>
    );
  }
}

export default function DogWithContext(props: any) {
  return (
    <UserConsumer>
      {userContext => <Dog {...props} userContext={userContext} />}
    </UserConsumer>
  );
}

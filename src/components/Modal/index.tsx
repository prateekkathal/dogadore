import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import DogModel from "../../models/Dog";

interface Props {
  dog: DogModel;
  modal: boolean;
  modalState: () => void;
}

interface State {
  title: string;
  dog: DogModel;
  modal: boolean;
}

class DogModal extends React.Component<Props, State> {
  public static getDerivedStateFromProps(newProps: Props, prevState: State) {
    const { modal, dog } = newProps;

    return {
      modal,
      dog
    };
  }
  constructor(props: any) {
    super(props);

    this.state = {
      title: this.randomTitle(),
      modal: this.props.modal,
      dog: this.props.dog
    };
  }
  public randomTitle(): string {
    const titles = [
      "Cute Dog",
      "Cuteeee",
      "Big Boy!",
      "Lazy Boy!",
      "Cute Puppy",
      "Good Boy!",
      "Good Girl!"
    ];

    return titles[Math.floor(Math.random() * titles.length)];
  }
  public handleClose = () => {
    this.props.modalState();
  };
  public render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        show={this.state.modal}
        onHide={this.handleClose}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <Image fluid={true} src={this.props.dog.image} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default DogModal;

import styled from "@emotion/styled";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Breed from "../../models/Breed";
import { THEME } from "../../styles/theme";
import { Consumer as SearchConsumer } from "./Context";

const SearchFilterButton = styled(Button)`
  margin-top: 32px;
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
  filterDogs: () => void;
}

class Search extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  public filterDogs = () => {
    this.props.filterDogs();
  };
  public render() {
    return (
      <SearchConsumer>
        {context => {
          return (
            <Row>
              <Col xs={true} lg={{ span: 5 }}>
                <Form.Group controlId="breed">
                  <Form.Label>Breed</Form.Label>
                  <Form.Control
                    defaultValue={context.breed ? context.breed.name : ""}
                    as="select"
                    onChange={context.handleBreedChange}
                  >
                    <option value={""}>All</option>
                    {context.breeds &&
                      context.breeds.length &&
                      context.breeds.map((breed, index) => {
                        return (
                          <option key={index} value={breed.name}>
                            {breed.name}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={true} lg={{ span: 5 }}>
                <Form.Group controlId="sub-breed">
                  <Form.Label>Sub Breed</Form.Label>
                  <Form.Control
                    col={4}
                    defaultValue={context.subBreed ? context.subBreed.name : ""}
                    as="select"
                    onChange={context.handleSubBreedChange}
                    disabled={
                      !context.breed ||
                      (context.breed &&
                        context.breed instanceof Breed &&
                        !context.breed.subBreeds.length)
                    }
                  >
                    <option value={""}>All</option>
                    {context.breed &&
                      context.breed instanceof Breed &&
                      context.breed.subBreeds.map((subBreed, index) => {
                        return (
                          <option key={index} value={subBreed.name}>
                            {subBreed.name}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={true} lg={{ span: 2 }}>
                <SearchFilterButton
                  type="button"
                  block={true}
                  onClick={this.filterDogs}
                >
                  Filter
                </SearchFilterButton>
              </Col>
            </Row>
          );
        }}
      </SearchConsumer>
    );
  }
}

export default Search;

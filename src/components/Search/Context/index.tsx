import React, { FormEvent, ReactType } from "react";
import { BsPrefixProps, ReplaceProps } from "react-bootstrap/helpers";
import SubBreed from "../../../models/SubBreed";
import { getBreeds } from "../../../store/GetBreeds";
import Breed from "./../../../models/Breed";

const initialState = {
  breed: {} as Breed,
  breeds: [] as Breed[],
  getBreeds: {} as Promise<Breed[]>,
  handleBreedChange(
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) {},
  handleSubBreedChange(
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) {},
  subBreed: {} as SubBreed,
  subBreeds: [] as SubBreed[]
};

interface StateInterface {
  breed: Breed;
  breeds: Breed[];
  getBreeds: Promise<Breed[]>;
  handleBreedChange: (
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) => void;
  handleSubBreedChange: (
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) => void;
  subBreed: SubBreed;
  subBreeds: SubBreed[];
}

const SearchContext = React.createContext(initialState);

class SearchProvider extends React.Component<{}, StateInterface> {
  constructor(props: any) {
    super(props);

    this.state = {
      breed: {} as Breed,
      breeds: [],
      getBreeds: getBreeds(),
      handleBreedChange: this.handleBreedChange,
      handleSubBreedChange: this.handleSubBreedChange,
      subBreed: {} as SubBreed,
      subBreeds: [] as SubBreed[]
    };
  }

  public async componentDidMount() {
    await getBreeds().then(breeds => {
      this.setState({ breeds });
    });
  }

  public handleBreedChange = (
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) => {
    const selectedBreed = new Breed(event.currentTarget.value);

    const breed = this.state.breeds.find(
      breedOfBreeds => breedOfBreeds.name === selectedBreed.name
    );

    this.setState({
      breed: breed instanceof Breed ? breed : ({} as Breed),
      subBreed: {} as SubBreed
    });
  };

  public handleSubBreedChange = (
    event: FormEvent<
      ReplaceProps<ReactType<any>, BsPrefixProps<ReactType<any>>>
    >
  ) => {
    const selectedSubBreed = event.currentTarget.value;

    const subBreed = this.state.breed.subBreeds.find(
      subBreedOfSubBreeds => subBreedOfSubBreeds.name === selectedSubBreed.name
    );

    this.setState({
      subBreed: subBreed instanceof SubBreed ? subBreed : ({} as SubBreed)
    });
  };

  public render() {
    return (
      <SearchContext.Provider value={this.state}>
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export const Consumer = SearchContext.Consumer;
export const Provider = SearchProvider;

import SubBreed from "./SubBreed";

interface BreedInterface {
  name: string;
  subBreeds: SubBreed[];
}

class Breed implements BreedInterface {
  public name = "";
  public subBreeds: SubBreed[] = [];

  constructor(name: string, subBreeds: SubBreed[] = []) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);

    this.subBreeds = subBreeds;
  }
}

export default Breed;

import { FormEvent } from "react";
import Breed from "./../../../models/Breed";

export interface SearchContext {
  breed: string;
  subBreed: string;
  breeds: Breed[];
  getBreeds: () => Breed[];
  handleBreedChange: (event: FormEvent) => void;
  handleSubBreedChange: (event: FormEvent) => void;
}

import Axios from "axios";
import SubBreed from "../models/SubBreed";
import Breed from "./../models/Breed";
import DogApi from "./../utilities/DogApi";

export async function getBreeds(): Promise<Breed[]> {
  return Axios.get(DogApi.breedsUrl()).then(
    response => {
      const breeds: Breed[] = [];

      if (response.data.status === "success") {
        Object.keys(response.data.message).map((breed: any) => {
          const subBreeds: SubBreed[] = [];

          const responseSubBreeds = response.data.message[breed];
          if (responseSubBreeds.length) {
            responseSubBreeds.map((subBreed: string) => {
              subBreeds.push(new SubBreed(subBreed));
            });
          }
          breeds.push(new Breed(breed, subBreeds));
        });
      }

      return Promise.resolve(breeds);
    },
    error => {
      return Promise.reject(
        "There was an error getting the list of breeeds" + error
      );
    }
  );
}

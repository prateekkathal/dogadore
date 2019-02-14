import Axios from "axios";
import Dog from "../models/Dog";
import SubBreed from "../models/SubBreed";
import Breed from "./../models/Breed";
import DogApi from "./../utilities/DogApi";

export async function getDogs(
  breed?: Breed,
  subBreed?: SubBreed
): Promise<Dog[]> {
  const apiUrl =
    breed instanceof Breed && subBreed instanceof SubBreed
      ? DogApi.dogsByBreedOrSubBreedUrl(breed.name, subBreed.name)
      : breed instanceof Breed
      ? DogApi.dogsByBreedOrSubBreedUrl(breed.name)
      : DogApi.randomImageUrl();

  return Axios.get(apiUrl).then(
    response => {
      const dogs: Dog[] = [];

      if (response.data.status === "success") {
        response.data.message.map((image: string) => {
          dogs.push(new Dog(image));
        });
      }

      return Promise.resolve(dogs);
    },
    error => {
      return Promise.reject(
        "There was an error getting the images of dogs" + error
      );
    }
  );
}

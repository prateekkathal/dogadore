export default class DogApi {
  public static baseUrl = (): string => {
    return "https://dog.ceo/api/";
  };

  public static breedsUrl = (): string => {
    return DogApi.baseUrl() + "breeds/list/all";
  };

  public static randomImageUrl = (count: number = 6): string => {
    return DogApi.baseUrl() + "breeds/image/random/" + count;
  };

  public static dogsByBreedOrSubBreedUrl = (
    breed: string,
    subBreed: string = "",
    count: number = 6
  ): string => {
    if (subBreed.length) {
      return (
        DogApi.baseUrl() +
        "breed/" +
        breed.toLowerCase() +
        "/" +
        subBreed.toLowerCase() +
        "/images/random/" +
        count
      );
    }

    return (
      DogApi.baseUrl() +
      "breed/" +
      breed.toLowerCase() +
      "/images/random/" +
      count
    );
  };
}

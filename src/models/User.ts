class User {
  public "_id": string = "";

  public name: object = {
    first: "" as string,
    last: "" as string
  };

  public username: string = "";

  public likes: string[] = [];

  constructor(id: string, name: object, username: string, likes = []) {
    this._id = id;

    this.name = name;

    this.username = username;

    this.likes = likes;
  }
}

export default User;

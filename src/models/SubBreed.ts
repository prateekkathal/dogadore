class SubBreed {
  public name: string = "";

  constructor(name: string) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
  }
}

export default SubBreed;

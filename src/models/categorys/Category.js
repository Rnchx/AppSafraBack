export default class Category {
  constructor(name, idCategory) {
    this.id = this.generateId();
    this.name = name;
    this.idCategory = idCategory;
  }

  generateId() {
    return Math.floor(Math.random() * 10000);
  }
}
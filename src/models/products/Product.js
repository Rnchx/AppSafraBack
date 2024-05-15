export default class Product {
  constructor(name, price, description, validity, photo) {
    this.id = this.generateId();
    this.name = name;
    this.price = price;
    this.description = description;
    this.validity = validity;
    this.photo = photo;
  }

  generateId() {
    return Math.floor(Math.random() * 10000);
  }
}
export default class Product {
  constructor(name, price, category, validity) {
    this.id = this.generateId();
    this.name = name;
    this.price = price;
    this.category = category;
    this.validity = validity;
  }

  generateId() {
    return Math.floor(Math.random() * 10000);
  }
}
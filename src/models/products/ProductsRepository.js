import db from "../../database/index.js";

export default class ProductsRepository {
  constructor() {
    this.db = db;
  }

  async getProducts() {
    try {
      const allProducts = await this.db.manyOrNone("SELECT * FROM products");
      return allProducts;
    } catch (error) {
      console.error("Failed to get products:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await this.db.oneOrNone(
        "SELECT * FROM products WHERE id = $1",
        id
      );
      return product;
    } catch (error) {
      console.error(`Failed to get product by id ${id}:`, error);
      throw error;
    }
  }

  async createProduct(product) {
    try {
      await this.db.none(
        "INSERT INTO products (id, name, price, category, validity) VALUES ($1, $2, $3, $4, $5)",
        [product.id, product.name, product.price, product.category, product.validity]
      );
      return product;
    } catch (error) {
      console.error("Failed to create product:", error);
      throw error;
    }
  }

  async updateProduct(id, name, price, category, validity) {
    try {
      const product = await this.getProductById(id);

      if (!product) {
        return null;
      }

      const updatedProduct = await this.db.one(
        "UPDATE products SET name = $1, price = $2, category = $3, validity = $4 WHERE id = $5 RETURNING *",
        [name, price, category, validity, id]
      );

      return updatedProduct;
    } catch (error) {
      console.error(`Failed to update product ${id}:`, error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      await this.db.none("DELETE FROM products WHERE id = $1", id);
    } catch (error) {
      console.error(`Failed to delete product ${id}:`, error);
      throw error;
    }
  }
}

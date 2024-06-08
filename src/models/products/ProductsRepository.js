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

  async getProductByName(name) {
    try {
      const product = await this.db.oneOrNone(
        "SELECT * FROM products WHERE name = $1",
        name
      );
      return product;
    } catch (error) {
      console.error(`Failed to get product by name ${name}:`, error);
      throw error;
    }
  }

  async getProductByType(type) {
    try {
      const product = await this.db.manyOrNone(
        "SELECT * FROM products WHERE type = $1",
        type
      );
      return product;
    } catch (error) {
      console.error(`Failed to get product by type ${type}:`, error);
      throw error;
    }
  }

  async getProductByidCategory(category) {
    try {
      const product = await this.db.manyOrNone(
        "SELECT * FROM products WHERE idcategory = $1",
        category
      );
      return product;
    } catch (error) {
      console.error(`Failed to get product by category ${type}:`, error);
      throw error;
    }
  }

  async createProduct(product) {
    try {
      await this.db.none(
        "INSERT INTO products (name, price, description, type, validity, photo, idcategory) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [product.name, product.price, product.description, product.type, product.validity, product.photo, product.idcategory]
      );
      return product;
    } catch (error) {
      console.error("Failed to create product:", error);
      throw error;
    }
  }

  async updateProduct(id, name, price, description, type, validity, photo, idcategory) {
    try {
      const product = await this.getProductById(id);

      if (!product) {
        return null;
      }

      const updatedProduct = await this.db.one(
        "UPDATE products SET name = $1, price = $2, description = $3, type = $4, validity = $5, photo = $6, idcategory = $7 WHERE id = $8 RETURNING *",
        [name, price, description, type, validity, photo, idcategory, id]
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

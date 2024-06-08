import db from "../../database/index.js";

export default class CategorysRepository {
  constructor() {
    this.db = db;
  }

  async getCategorys() {
    try {
      const allCategorys = await this.db.manyOrNone("SELECT * FROM categorys");
      return allCategorys;
    } catch (error) {
      console.error("Failed to get categorys:", error);
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      const product = await this.db.oneOrNone(
        "SELECT * FROM categorys WHERE id = $1",
        id
      );
      return product;
    } catch (error) {
      console.error(`Failed to get category by id ${id}:`, error);
      throw error;
    }
  }

  async getCategoryByName(name) {
    try {
      const category = await this.db.manyOrNone(
        "SELECT * FROM categorys WHERE name = $1",
        name
      );
      return category;
    } catch (error) {
      console.error(`Failed to get category by name ${name}:`, error);
      throw error;
    }
  }

  async filterProductByCategory(category) {
    try {
      const product = await this.db.manyOrNone(
        "SELECT * FROM categorys INNER JOIN products ON categorys.id = products.idcategory WHERE categorys.name = $1",
        category
      );
      return product;
    } catch (error) {
      console.error(`Failed to get filter product by category ${category}:`, error);
      throw error;
    }
  }

  async createCategory(category) {
    console.log(category);
    try {
      await this.db.none(
        "INSERT INTO categorys (name) VALUES ($1)",
        [category.name]
      );
      return category;
    } catch (error) {
      console.error("Failed to create category:", error);
      throw error;
    }
  }

  async updateCategory(id, name) {
    try {
      const product = await this.getProductById(id);

      if (!product) {
        return null;
      }

      const updatedProduct = await this.db.one(
        "UPDATE products SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
      );

      return updatedProduct;
    } catch (error) {
      console.error(`Failed to update product ${id}:`, error);
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      await this.db.none("DELETE FROM categorys WHERE id = $1", id);
    } catch (error) {
      console.error(`Failed to delete category ${id}:`, error);
      throw error;
    }
  }
}

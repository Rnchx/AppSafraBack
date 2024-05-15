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
        "SELECT * FROM cateogrys WHERE id = $1",
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
      const category = await this.db.oneOrNone(
        "SELECT * FROM categorys WHERE name = $1",
        name
      );
      return category;
    } catch (error) {
      console.error(`Failed to get category by name ${name}:`, error);
      throw error;
    }
  }

  async createCategory(category) {
    try {
      await this.db.none(
        "INSERT INTO category (id, name, idCategory) VALUES ($1, $2, $3)",
        [category.id, category.name, category.idCategory]
      );
      return category;
    } catch (error) {
      console.error("Failed to create category:", error);
      throw error;
    }
  }

  async updateCategory(id, name, idCategory) {
    try {
      const product = await this.getProductById(id);

      if (!product) {
        return null;
      }

      const updatedProduct = await this.db.one(
        "UPDATE products SET name = $1, idCategory = $2 WHERE id = $3 RETURNING *",
        [name, idCategory, id]
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

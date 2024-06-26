import { Router } from "express";

import {
  getCategorys,
  getCategoryById,
  getCategoryByName,
  filterProductByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categorys.controller.js";

const categorysRouter = Router();

categorysRouter.get("/", getCategorys);
categorysRouter.get("/:id", getCategoryById);
categorysRouter.get("/name/:name", getCategoryByName);
categorysRouter.get("/filter/:category", filterProductByCategory);
categorysRouter.post("/", createCategory);
categorysRouter.put("/:id", updateCategory);
categorysRouter.delete("/:id", deleteCategory);

export default categorysRouter;
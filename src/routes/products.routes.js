import { Router } from "express";

import {
  getProducts,
  getProductById,
  getProductByName,
  getProductByType,
  getProductidCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);
productsRouter.get("/name/:name", getProductByName);
productsRouter.get("/type/:type", getProductByType);
productsRouter.get("/idCategory/:category", getProductidCategory);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

export default productsRouter;

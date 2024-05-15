import { Router } from "express";
import productsRouter from "./products.routes.js";
import categorysRouter from "./categorys.routes.js"

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Servidor rodando perfeitamente!" });
});

router.use("/products", productsRouter);
router.use("/categorys", categorysRouter);

export { router };

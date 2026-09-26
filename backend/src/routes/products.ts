import { Router } from "express";
import { ApiError } from "../middleware/errorHandler.js";
import {
  listProductsQuerySchema,
  productIdParamSchema,
} from "../schemas/product.schema.js";
import {
  getProductById,
  getRelatedProducts,
  listProducts,
} from "../services/productService.js";

export const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const query = listProductsQuerySchema.parse(req.query);
    const result = await listProducts(query);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = productIdParamSchema.parse(req.params);
    const product = await getProductById(id);
    if (!product) throw new ApiError(404, "Product not found");

    const related = await getRelatedProducts(id);
    res.json({ product, related });
  } catch (err) {
    next(err);
  }
});

import { Router } from "express";
import { requireSessionId } from "../middleware/sessionId.js";
import {
  addCartItemSchema,
  cartItemIdParamSchema,
  updateCartItemSchema,
} from "../schemas/cart.schema.js";
import { addItem, getCart, removeItem, updateItem } from "../services/cartService.js";

export const cartRouter = Router();

cartRouter.use(requireSessionId);

// GET /api/cart — sessionId comes from the x-session-id header (see structural decision on
// anonymous cart identity), not a URL param.
cartRouter.get("/", async (req, res, next) => {
  try {
    const cart = await getCart(req.sessionId!);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

cartRouter.post("/items", async (req, res, next) => {
  try {
    const { productId, quantity } = addCartItemSchema.parse(req.body);
    const cart = await addItem(req.sessionId!, productId, quantity);
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
});

cartRouter.put("/items/:id", async (req, res, next) => {
  try {
    const { id } = cartItemIdParamSchema.parse(req.params);
    const { quantity } = updateCartItemSchema.parse(req.body);
    const cart = await updateItem(req.sessionId!, id, quantity);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

cartRouter.delete("/items/:id", async (req, res, next) => {
  try {
    const { id } = cartItemIdParamSchema.parse(req.params);
    const cart = await removeItem(req.sessionId!, id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

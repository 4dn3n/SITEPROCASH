import { Router } from "express";
import { ApiError } from "../middleware/errorHandler.js";
import { getOrderById } from "../services/orderService.js";

export const ordersRouter = Router();

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) throw new ApiError(404, "Commande introuvable");
    res.json(order);
  } catch (err) {
    next(err);
  }
});

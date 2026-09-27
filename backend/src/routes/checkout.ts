import { Router } from "express";
import { requireSessionId } from "../middleware/sessionId.js";
import { createCheckoutSessionSchema } from "../schemas/checkout.schema.js";
import { createCheckoutSession } from "../services/checkoutService.js";

export const checkoutRouter = Router();

checkoutRouter.use(requireSessionId);

checkoutRouter.post("/", async (req, res, next) => {
  try {
    const input = createCheckoutSessionSchema.parse(req.body);
    const result = await createCheckoutSession(req.sessionId!, input);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

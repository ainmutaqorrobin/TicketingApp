import { Request, Response, Router } from "express";
import { API } from "./const";
import { requireAuth, validateRequest } from "@robin_project/common";
import { body } from "express-validator";

const router = Router();

router.post(
  API,
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("Token must be provided"),
    body("orderId").not().isEmpty().withMessage("OrderId must be provided"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    return res.send({ success: true });
  }
);

export { router as createChargeRouter };

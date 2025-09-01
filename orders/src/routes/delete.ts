import express, { Request, Response } from "express";
import { API } from "./const";

const router = express.Router();

router.delete(`${API}/:orderId`, (req: Request, res: Response) => {
  res.send({});
});

export default router;

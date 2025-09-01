import express, { Request, Response } from "express";
import { API } from "./const";

const router = express.Router();

router.post(`${API}`, (req: Request, res: Response) => {
  res.send({});
});

export default router;

import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.send("success");
});

export default router;


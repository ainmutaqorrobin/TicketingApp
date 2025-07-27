import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Current user");
});

app.listen(3000, () => {
  console.log("listening auth services on port 3000");
});

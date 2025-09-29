import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { Password } from "../util/password";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@robin_project/common";

const router = Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Give password of user"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError("Invalid credentials");

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) throw new BadRequestError("Invalid credentials");

    //generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    //store in session
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as SignInRouter };

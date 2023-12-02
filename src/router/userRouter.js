import express from "express";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { insertUser, getUserByEmail } from "../models/userModel.js";
import {
  loginValidation,
  newUserValidation,
} from "../middleware/joiValidation.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "to be completed",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", newUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;

    // hash pass

    req.body.password = hashPassword(password);

    // insert user
    const result = await insertUser(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "Your account has been created, you may login now",
        })
      : res.json({
          status: "error",
          message:
            "Unable to create an account now, Pelase contact admin for support",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "There is another user have this email alread exist.";
      error.errorCode = 200;
    }

    next(error);
  }
});

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { password, email } = req.body;

    // check if user exist for the given email
    const result = await getUserByEmail(email);

    if (result?.password) {
      // check if the plain pass and the pass from db, the hashed one, is the same
      const isMatched = comparePassword(password, result.password);

      if (isMatched) {
        result.password = undefined;

        return res.json({
          status: "success",
          message: "Logined in successfully",
          user: result,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login details",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "There is another user have this email alread exist.";
      error.errorCode = 200;
    }

    next(error);
  }
});
export default router;

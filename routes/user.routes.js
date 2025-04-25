import express from "express";
const router = express.Router();
import { body } from "express-validator"; // it is a middleware
import { loginUser, registerUser } from "../controllers/user.controller.js";

router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"), //looks inside req.body.email
  body('fullName.firstName').isLength({min:3}).withMessage('First name must be at least 3 characters.'),
  body('password').isLength({min:6}).withMessage('Password must be of 6 characters at least.')
],
registerUser
);

router.post("/login", [
  body("email").isEmail().withMessage("Invalid Email"), //looks inside req.body.email
  body('password').isLength({min:6}).withMessage('Password must be of 6 characters at least.')
],
loginUser
);
export default router;

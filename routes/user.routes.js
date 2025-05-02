import express from "express";
const router = express.Router();
import { body } from "express-validator"; // it is a middleware
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

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

router.get("/profile",authUser, getUserProfile); //this will get the user profile from the database.
router.get("/logout",authUser, logoutUser); //this will get the user profile from the database.
export default router;

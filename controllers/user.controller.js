import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); //the errors .arrary () will give the respective error in the user input.
  }

  const { fullName, email, password } = req.body;
  const isUserAlreadyRegistered = await userModel.findOne({ email });
  if (isUserAlreadyRegistered) {
    return res.status(409).json({ message: "User already registered" }); //this will check if the user is already registered or not.
  }
  const hashedPassword = await userModel.hashPassword(password);
  const user = await createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); //the errors .arrary () will give the respective error in the user input.
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password"); //this will select the password field as it is not selected by default.
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password); //this will compare the password with the hashed password in the database.

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token); // Set the cookie with the token
  res.status(200).json({ token, user });
};

export const getUserProfile = async (req, res, next) => {
  // const user = await userModel.findById(req.user._id); //this will get the user profile from the database.
  // if(!user){
  // return res.status(404).json({message:'User not found'});
  // }
  res.status(200).json(req.user);
};

export const logoutUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1]; // Get the token from the cookie
  await blacklistTokenModel.create({ token }); // Add the token to the blacklist
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  await userModel.findByIdAndUpdate(req.user._id, { socketId: null }); // Clear the socketId in the database
  res.clearCookie("token"); // Clear the cookie
  res.status(200).json({ message: "Logged out successfully" });
};

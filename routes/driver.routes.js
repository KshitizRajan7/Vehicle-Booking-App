import express from 'express';
import { body } from 'express-validator';
import { registerDriver } from '../controllers/driver.controller.js';

const router=express.Router();

router.post('/register',[
    body("fullName.firstName").notEmpty().withMessage("First name is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is not valid"),
    body("vehicle.color").notEmpty().withMessage("Color is required"),
    body("vehicle.plate").notEmpty().withMessage("Plate is required"),
    body("vehicle.capacity").notEmpty().withMessage("Capacity is required"),
    body("vehicle.vehicleType").notEmpty().withMessage("Vehicle type is required"),
],
    registerDriver);

export default router;
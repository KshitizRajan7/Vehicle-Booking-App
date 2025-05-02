import driverModel from "../models/driver.model.js";
import {createDriver} from "../services/driver.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistToken.model.js"

export const registerDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {fullName, email, password, vehicle } = req.body;

    const isDriverAlreadyRegistered = await driverModel.findOne({email});
    if (isDriverAlreadyRegistered) {
        return res.status(409).json({ message: "Driver already registered" });
    }

    const hashedPassword = await driverModel.hashPassword(password); //hashing the password before saving it to the database
    const driver = await createDriver({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });
    const token = driver.generateAuthToken(); //generate the token for the user
    res.status(201).json({ token, driver });
}

export const loginDriver = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const driver = await driverModel.findOne({ email }).select("+password"); //selecting the password field to compare it with the hashed password
    if (!driver) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordMatch = await driver.comparePassword(password, driver.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = driver.generateAuthToken(); //generate the token for the user
    res.cookie("token",token);
    res.status(200).json({ token, driver });
}

export const getDriverProfile = async (req, res) => {
    const driver =  req.driver; //getting the driver from the request object

    if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json({ driver });
}

export const logoutDriver = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message:"driver logout successfull"})
}



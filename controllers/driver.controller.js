import driverModel from "../models/driver.model.js";
import {createDriver} from "../services/driver.service.js";
import { validationResult } from "express-validator";

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

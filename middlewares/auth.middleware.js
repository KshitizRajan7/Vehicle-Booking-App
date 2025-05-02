import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
    // First, get the token from either cookies or Authorization header
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization?.split(' ')[1]);

    // If no token is provided, send Unauthorized status
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const isblacklisted = await blacklistTokenModel.findOne({ token: token });
    if(isblacklisted){
        return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
    }

    try {
        // Verify the token using the JWT secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user from the decoded ID and exclude the password
        const user = await userModel.findById(decoded._id).select("-password");
        
        // If no user is found, return Unauthorized status
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;
        
        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If the token is invalid or any other error occurs, send Unauthorized status
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

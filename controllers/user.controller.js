import userModel from "../models/user.model.js";
import {createUser}  from "../services/user.service.js";
import {validationResult} from 'express-validator';

export const registerUser = async(req,res,next)=>{
 const errors = validationResult(req);
 if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()}); //the errors .arrary () will give the respective error in the user input.
 }

 const {fullName,email,password} =req.body;
 const hashedPassword = await userModel.hashPassword(password);
 const user =await createUser({
    firstName:fullName.firstName,lastName:fullName.lastName,email,password:hashedPassword
 });
 const token = user.generateAuthToken();
 res.status(201).json({token,user});
}

export const loginUser = async(req,res,next)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()}); //the errors .arrary () will give the respective error in the user input.
   }
   const {email,password} =req.body;

   const user = await userModel.findOne({email}).select('+password'); //this will select the password field as it is not selected by default.
   if(!user){
      return res.status(401).json({message:'Invalid email or password'});
   }
   const isMatch = await user.comparePassword(password); //this will compare the password with the hashed password in the database.

   if(!isMatch){
      return res.status(401).json({message:'Invalid email or password'});
   }
   const token = user.generateAuthToken();
   res.status(200).json({token,user});
}
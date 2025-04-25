import userModel from "../models/user.model.js";

export const createUser = async({
    firstName,lastName,email,password //these will be accept as an object
})=>{
    if(!firstName || !email || !password) {
        throw new Error('All fields are required.')
    }
    const user = userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    })
    return user;
}

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    fullName:{
        firstName: {
            type: String,
            required:true,
            minlength:[3,'First name must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minlength:[3,'Last name must be at least 3 characters long'],
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Last name must be at least 5 characters long'],
    },
    password:{
        type:String,
        required:true,
        select:false // when finding user, password wont be there.
    },
    socketId:{ //live tracking of user 
        type:String,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Token will expire in 24 hours
    );
    return token;
};

userSchema.methods.comparePassword = async function (password){ // methods are used in the instances. 
    return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword= async function(password){ //static methods are used directly in the model, not in the instance or any document
    return await bcrypt.hash(password,10);
}
const userModel = mongoose.model('user',userSchema) //creating a model

export default userModel;
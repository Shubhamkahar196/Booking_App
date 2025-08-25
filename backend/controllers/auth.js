import bcrypt from 'bcryptjs';
import User from "../models/user.js"
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

export const register = async (req,res,next) =>{
     try {

    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password : hashedPassword,
    });

    // Save user to database
    await newUser.save();


        res.status(200).send("User has been created")

    }catch(err){
        next(err);
    }
}


// login

export const login = async(req,res,next)=>{
  try{

    const {email,password} = req.body;

    // find user by email

    const user = await User.findOne({
      email
    })

    if(!user){
      return res.status(400).json({
        message: "User is not found"
      })
    }

    // compare password

    const matchedPassword = await bcrypt.compare(password,user.password);
    if(!matchedPassword){
      return res.status(401).send({
        message: "Invalid password"
      })
    }

    // generating token

    const token = jwt.sign({ id: user._id},process.env.JWT_SECRET_KEY,{
      expiresIn: "1d",
    })

    // Set token as HTTP-only cookie for security
    res.cookie("access_token", token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });

    res.status(200).send({
      message: "Login successfully",
      token, 
      isAdmin: user.isAdmin
    })

  }catch(err){
    next(err);
  }
}
  

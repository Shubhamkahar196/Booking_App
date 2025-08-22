import mongoose from "mongoose";

import { DB_NAME } from "../constrants.js";

const connectDB = async ()=>{
    try{
        if(!process.env.MONGODB_URI){
            throw new Error ("Mongodb_uri is not defined")
        }

        if(!DB_NAME){
            throw new Error("DB_Name is not defined");
        }

        const connectionInstanace = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB connected || DB Host: ${connectionInstanace.connection.host}`);
    }catch(error){
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
};

export default connectDB;
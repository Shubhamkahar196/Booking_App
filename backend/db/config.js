import mongoose from "mongoose";



const connectDB = async ()=>{
    try{
        if(!process.env.MONGODB_URI){
            throw new Error ("Mongodb_uri is not defined")
        }

      

        const connectionInstanace = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n MONGODB connected || DB Host: ${connectionInstanace.connection.host}`);
    }catch(error){
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
};

export default connectDB;
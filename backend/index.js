import express from 'express'

import dotenv from 'dotenv'
import connectDB from './db/config.js';
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js';
import hotelRoute from './routes/hotels.js';
import roomRoute from './routes/rooms.js';

const app = express();


dotenv.config();
// connecting to database
connectDB();


// middleware
app.use(express.json());

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/hotels",hotelRoute)
app.use("/api/v1/users",userRoute)
app.use("/api/v1/rooms",roomRoute)

app.use((req,res,next)=>{
  console.log("Hii i am a middleware")
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
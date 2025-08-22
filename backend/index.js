import express from 'express'
import { DB_NAME } from './constrants.js';
import dotenv from 'dotenv'
import connectDB from './db/config.js';
import authRoute from './routes/auth.js'
import userRoute from './routes/users.js';
import hotelRoute from './routes/hotels.js';
import roomRoute from './routes/rooms.js';



dotenv.config();
// connecting to database
connectDB();

const app = express();

// middleware
app.use("/api/v1/auth",authRoute)


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
  



import express from 'express';
import Hotel from "../models/hotel.js"
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js';

const router = express.Router();

// creating
router.post("/", createHotel)


// update
router.put("/:id", updateHotel);

// delete

router.delete("/:id", deleteHotel) 


// get by id

router.get("/:id",getHotel)

// get all

router.get("/",getHotels);




export default router
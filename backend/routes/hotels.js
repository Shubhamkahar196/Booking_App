import express from 'express';
import Hotel from "../models/hotel.js"

const router = express.Router();

// creating

router.post("/",async(req,res)=>{
    const newHotel = new Hotel(req.body);
    // ...
try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
} catch (err) {
    console.log(err.message);
    res.status(500).json({
        message: "Error from hotel",
        error: err.message 
    });
}
// 
})

// update
router.put("/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true } 
        );
        res.status(200).json(updatedHotel);
    } catch(err) {
        res.status(500).json(err);
    }
});

// delete

router.delete("/:id", async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Hotel delete");
    } catch(err) {
        res.status(500).json(err);
    }
});


// get by id

router.get("/:id", async (req, res) => {
    try {
      const hotel =   await Hotel.findById(
            req.params.id
        );
        res.status(200).json(hotel);
    } catch(err) {
        res.status(500).json(err);
    }
});

// get all

router.get("/", async (req, res) => {
    try {
      const hotels =   await Hotel.find(
            req.params.id
        );
        res.status(200).json(hotels);
    } catch(err) {
        res.status(500).json(err);
    }
});




export default router
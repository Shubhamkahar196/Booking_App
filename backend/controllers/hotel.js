
// creating hotel
export const createHotel = async(req,res,next) =>{

    
        const newHotel = new Hotel(req.body);
      
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
    
    
}

// updating hotel
export const updateHotel = async(req,res,next) =>{

   
        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(
                req.params.id, 
                { $set: req.body }, 
                { new: true } 
            );
            res.status(200).json(updatedHotel);
        } catch(err) {
            next(err);
        }

}


// deleting hotel
export const deleteHotel = async(req,res,next) =>{

    try {
           await Hotel.findByIdAndDelete(
               req.params.id
           );
           res.status(200).json("Hotel delete");
       } catch(err) {
           next(err)
       }
}

// get hotel
export const getHotel = async(req,res,next) =>{

   
      
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
    
    
}


// get all hotels

export const getHotels = async(req,res,next) =>{

   
    try {
      const hotels =   await Hotel.find(
            req.params.id
        );
        res.status(200).json(hotels);
    } catch(err) {
        next(err);
    }
    
    
}






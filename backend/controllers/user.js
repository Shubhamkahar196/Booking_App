import User from "../models/user.js";



// This function updates a user by their ID
export const updateUser = async(req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true } 
        );
        res.status(200).json(updatedUser);
    } catch(err) {
        next(err);
    }
}


// This function deletes a user by their ID
export const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("User deleted successfully.");
    } catch(err) {
        next(err)
    }
}


// This function gets a single user by their ID
export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(
            req.params.id
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}


// This function gets all users
export const getAllUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(err) {
        next(err);
    }
}


// // updating hotel
// export const updateUser = async(req,res,next) =>{

   
//         try {
//             const updatedUser = await User.findByIdAndUpdate(
//                 req.params.id, 
//                 { $set: req.body }, 
//                 { new: true } 
//             );
//             res.status(200).json(updatedUser);
//         } catch(err) {
//             next(err);
//         }

// }


// // deleting hotel
// export const deleteUser = async(req,res,next) =>{

//     try {
//            await User.findByIdAndDelete(
//                req.params.id
//            );
//            res.status(200).json("User delete");
//        } catch(err) {
//            next(err)
//        }
// }

// // get hotel
// export const getUser = async(req,res,next) =>{

   
      
//     try {
//         const Hotel = await Hotel.findById(
//             req.params.id
//         );
//         res.status(200).json(Hotel);
//     } catch (err) {
//         next(err);
//     }
    
    
// }


// // get all hotels

// export const getAllUsers = async(req,res,next) =>{

   
//     try {
//       const users =   await User.find(
//             req.params.id
//         );
//         res.status(200).json(users);
//     } catch(err) {
//         next(err);
//     }
    
    
// }






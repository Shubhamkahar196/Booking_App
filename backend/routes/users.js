import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyTokens.js';


const router = express.Router();





// update
router.put("/:id", verifyUser,updateUser);

// delete

router.delete("/:id",verifyUser ,deleteUser) 


// get by id

router.get("/:id",verifyUser,getUser)

// get all

router.get("/",verifyAdmin,getUser);


export default router
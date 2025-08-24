import express from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/user.js';
import { verifyToken } from '../utils/verifyTokens.js';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.get("/checkauthentication", verifyToken,(req,res,next)=>{
    res.status(200).json({
        messsage: "Hello user, you are logged in"
    });
})



// update
router.put("/:id", updateUser);

// delete

router.delete("/:id", deleteUser) 


// get by id

router.get("/:id",getUser)

// get all

router.get("/",getUser);


export default router
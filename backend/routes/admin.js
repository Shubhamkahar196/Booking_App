import express from "express";
import {
  getUsers,
  deleteUser,
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/adminController.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

// Users
router.get("/users", verifyAdmin, getUsers);
router.delete("/users/:id", verifyAdmin, deleteUser);

// Hotels
router.get("/hotels", verifyAdmin, getHotels);
router.post("/hotels", verifyAdmin, createHotel);
router.put("/hotels/:id", verifyAdmin, updateHotel);
router.delete("/hotels/:id", verifyAdmin, deleteHotel);

// Rooms
router.get("/rooms", verifyAdmin, getRooms);
router.post("/rooms", verifyAdmin, createRoom);
router.put("/rooms/:id", verifyAdmin, updateRoom);
router.delete("/rooms/:id", verifyAdmin, deleteRoom);

export default router;

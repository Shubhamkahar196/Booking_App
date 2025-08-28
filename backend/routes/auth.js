import express from 'express';
import { login, register, logout, getSession } from '../controllers/auth.js';

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Logout user (clears the cookie)
router.post("/logout", logout);

// Check session (is user logged in?)
router.get("/session", getSession);

export default router;

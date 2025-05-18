// routes/userRoutes.js
import express from 'express';
import { getAllUsers, createUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/get-user', getAllUsers);
router.post('/create-user', createUser);

export default router;

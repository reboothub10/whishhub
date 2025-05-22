// routes/userRoutes.js
import express from 'express';
import { getUserDetails, login, register } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/get-userDetails', getUserDetails);


export default router;

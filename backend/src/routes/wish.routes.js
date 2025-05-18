// routes/userRoutes.js
import express from 'express';
import { getWishList, createWish, deleteWish } from '../controllers/wish.controller.js';

const router = express.Router();

router.get('/list', getWishList);
router.post('/add', createWish);
router.post('/delete', deleteWish);

export default router;

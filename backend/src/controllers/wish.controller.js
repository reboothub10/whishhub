import 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import { addWish, listWish } from '../services/wish.service.js';
import WishModel from '../models/wish.model.js';
//getWishList, createWish, deleteWish
const wishlist = []; // Array to store user data

// Function to get all wishes
export const getWishList = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }

  const response = await listWish(token);
      
  if (response.success) {

        return res.status(201).json({ success: true, wishlist: response.wishlist });
  } else {
        return res.status(401).json({ success: false, message: response.message });
  }
};

// Function to create a new wish
export const createWish = async (req, res) => {
  const { title, content, wishgroup_id } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Wish Name is required' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied' });
  }
  const trimmedToken = token.trim();
  const decoded = jwt.verify(trimmedToken, process.env.JWT_SECRET);

 
  if (decoded) {

    const user_id = decoded.id; 
    const wish = new WishModel({ title, content, user_id, wishgroup_id});

  wishlist.push(wish);
  const response = await addWish(wish);
      
    if (response.success) {
        return res.status(201).json({ success: true, wish: response.wish });
    } else {
        return res.status(401).json({ success: false, message: response.message });
    }
  }else {
    return res.status(401).json({ success: false, message: "Please login to continue" });
  }

  

};

// Function to delete wish
export const deleteWish = (req, res) => {
  console.log("Deleteing wish");
  console.log(req.body);
  const { title, content, user_id } = req.body;
  
  res.status(201).json({ message: 'Wish added successfully', wish: newWish });
};

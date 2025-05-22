import { pool } from "../db/config.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

export const addWish = async (wish) => {
    try {
        const query = `INSERT INTO wish (user_id, title, content, wishgroup_id) VALUES (?, ?, ?, ?)`;
        const values = [wish.user_id, wish.title, wish.content, wish.wishgroup_id];

        await pool.query(query, values);
        return { success: true, message: 'New Wish added successfully' };
    } catch (error) {
        console.error("Adding error:", error);
        return { success: false, message: 'Addition failed. Please try again later.' };
    }
};

export const listWish = async (token) => {
    try {
        const trimmedToken = token.trim();
        // Verify token (no `await` needed here)
        const decoded = jwt.verify(trimmedToken, process.env.JWT_SECRET);

        // Retrieve user details from the database
        const [rows] = await pool.query('SELECT w.id, w.user_id, w.title wishName, w.content wishUrl, wishgroup_id, wg.name wishCategory FROM wish w INNER JOIN wish_group wg on w.wishgroup_id= wg.id WHERE w.user_id  = ?', [decoded.id]);
        if (rows.length === 0) {
            return { success: false, message: 'User not found' };
        }
        return { success: true, wishlist: rows };

    } catch (error) {
        console.error("Token verification error:", error);
        return { success: false, message: 'Invalid or expired token' };
    }
};
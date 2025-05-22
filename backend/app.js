// app.js
import express from 'express';
import userRoutes from './src/routes/user.routes.js';
import { checkConnection } from './src/db/config.js';
import createAllTable from './src/db/utilsDB.js';
import authRoutes from './src/routes/auth.routes.js';
import wishRoutes from './src/routes/wish.routes.js';
import cors from 'cors'

const app = express();
app.use(cors());


app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/wish', wishRoutes); // Use wishes routes for API calls
app.use('/api/users', userRoutes); // Use user routes for API calls
app.use('/api/auth', authRoutes); // Use user routes for API calls

app.listen(3001, async() => {
  console.log('Server running on port 3001');
  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.log("Failed to initialize the database",error);
    
  }
});


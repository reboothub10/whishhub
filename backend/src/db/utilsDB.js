import { pool } from "./config.js";

const userTableQuery = `CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    userType ENUM('user','admin') DEFAULT 'user',
    gender ENUM('male', 'female', 'non_binary', 'prefer_not_to_say', 'other') DEFAULT 'female',
    industry VARCHAR(100) DEFAULT NULL,
    age_group ENUM('18-24', '25-34', '35-44', '45-54', '55-64', '65+') DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const wishTableQuery = `CREATE TABLE IF NOT EXISTS wish (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    wishgroup_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const wishgroupTableQuery = `CREATE TABLE IF NOT EXISTS wish_group (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT 0,
  name VARCHAR(255) NOT NULL
);`;

//const wishGroupTableInsertQuery = `

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} table created or already exists`);
  } catch (error) {
    console.log(`Error creating ${tableName}`, error);
  }
};

const createAllTable = async () => {
  try {
    await createTable("User", userTableQuery);
    await createTable("Wish", wishTableQuery);
    await createTable("Wish Groups", wishgroupTableQuery);
    console.log("All tables created successfully!!");
  } catch (error) {
    console.log("Error creating tables", error);
    throw error;
  }
};

export default createAllTable;

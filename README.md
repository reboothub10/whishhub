# WishHub - Shared Wishlist Service

A fullstack web application where each user can manage their personal wishlist and explore wishlists of other users.  
Built with **Node.js**, **Express**, **MySQL**, and **React**.

---

## Features

- User registration and authentication (JWT-based)
- Each user maintains their own wishlist (add, edit, delete items)
- Authenticated users can search other users by username and view their wishlists
- Responsive, modern UI with React

---

## Project Structure

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) server

---

## Setup Instructions


Create a .env file in the backend/ folder:

```bash
DB_HOST=localhost
DB_USER=<your_mysql_user>
DB_PASSWORD=<your_mysql_password>
DB_NAME=wishlist_app
JWT_SECRET=your_secret_key
```

Clone the Repository

```bash
git clone https://github.com/reboothub10/whishhub.git
cd whishhub
cd backend
npm install
node app.js
cd ../frontend
npm install
npm run start
```
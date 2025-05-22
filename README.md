# WishHub - Shared Wishlist Service

A fullstack web application where each user can manage their personal wishlist and explore wishlists of other users.  
Built with **Node.js**, **Express**, **MySQL**, and **React**.

---

## Features

- User registration and authentication (JWT-based)
- Each user maintains their own wishlist/s (add, edit, delete items)
- User can add/delete/update items (wishes) in the wishlist
- User can share a public link to the wishlist, so gift-givers can access (view only)
- User can use a recommendation system to add recommended items to the wishlist
- // Post-launch Authenticated users can search other users by username and view their wishlists
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
---
## Design files
Please find all the Figma screenshots here: https://drive.google.com/drive/folders/1bb7CD5y4-xs_jlWBU-Wv5XUPvrUVvYFM?usp=drive_link

1. Login flow
- Figma: https://www.figma.com/design/O9oBu4R1jbEmRZJDYXRFkT/Luda---all-designs?node-id=1037-11805&m=dev
2. "Add a list" flow 
- Figma: https://www.figma.com/design/O9oBu4R1jbEmRZJDYXRFkT/Luda---all-designs?node-id=1037-11668&m=dev
3. "My Wishes" flow
- Figma https://www.figma.com/design/O9oBu4R1jbEmRZJDYXRFkT/Luda---all-designs?node-id=1037-11808&m=dev
4. Get recommended items
Figma: https://www.figma.com/design/O9oBu4R1jbEmRZJDYXRFkT/Luda---all-designs?node-id=1038-12675&m=dev
5. "View a list" flow (gift-giver)
Figma: 
https://www.figma.com/design/O9oBu4R1jbEmRZJDYXRFkT/Luda---all-designs?node-id=1040-11974&m=dev

# Cuaniaga API

A RESTful backend service for managing users, authentication, products, and transactions. Built using **Node.js**, **Express**, **Sequelize ORM**, and **JWT** for authentication.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 👤 Role Management (User, Admin, Moderator)
- 🛒 Product Management (CRUD by Admin)
- 💸 Transaction System with multiple products per transaction
- 📦 Inventory Control (auto stock reduction)
- 👨‍👩‍👧 User-owned Transactions
- ✅ Middleware for route protection and role-based access

---

## 🧱 Tech Stack

- **Backend**: Node.js + Express
- **Database**: MySQL / PostgreSQL (via Sequelize)
- **Auth**: JWT
- **ORM**: Sequelize
- **Test Tool**: Postman / curl

---

## 🛠️ Installation

1. **Clone the repository**

git clone https://github.com/yourusername/cuaniaga-api.git
cd cuaniaga-api

2. **Install dependencies**

npm install

3. **Configure database**

Edit app/config/db.config.js:

module.exports = {
  HOST: "localhost",
  USER: "your-db-username",
  PASSWORD: "your-db-password",
  DB: "cuaniaga_db",
  dialect: "mysql", // or "postgres"
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
};

4. **Run the server**

node server.js
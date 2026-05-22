# 🚀 InstaClone Backend API

A scalable and production-inspired backend for a modern **Instagram-like social media platform** built using **Node.js**, **Express.js**, and **MongoDB**.

This backend handles authentication, authorization, image uploads, post management, likes, follow systems, protected APIs, and optimized cloud media delivery using **ImageKit**.

The project follows a clean and scalable backend architecture inspired by real-world backend development practices.

---

# ✨ Features

## 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Cookie-Based Authentication
- Protected Routes
- Persistent Login Sessions
- Secure Password Hashing using `bcryptjs`
- Auth Middleware Verification

---

## 👤 User System

- Follow Users
- Unfollow Users
- Accept Follow Requests
- Reject Follow Requests
- Prevent Self Follow
- Duplicate Follow Protection

---

## 📸 Post System

- Create Posts with Images
- Upload Images using Multer
- Cloud Image Storage using ImageKit
- Optimized CDN Image Delivery
- Fetch Logged-in User Posts
- Fetch Feed Posts
- Get Detailed Post Information
- Like Posts
- Prevent Duplicate Likes
- Feed Like Status Detection (`isLiked`)

---

## 🛡️ Security & Backend Practices

- JWT Verification Middleware
- Cookie Authentication
- CORS Configuration
- Protected APIs
- MongoDB Indexing
- Duplicate Prevention
- Request Validation
- Scalable MVC Architecture
- Environment Variable Management
- RESTful API Design
- Error Response Handling

---

# 🧠 Concepts Covered

This project demonstrates hands-on implementation of:

- REST API Development
- Backend Architecture
- MVC Pattern
- MongoDB & Mongoose
- Authentication & Authorization
- JWT Tokens
- Cookie-Based Sessions
- Express Middleware
- File Upload Handling
- Cloud Media Storage
- CDN Image Optimization
- MongoDB Relationships
- Protected Routes
- Database Indexing
- Async Backend Operations
- Backend & Frontend Integration
- Scalable Backend Structuring

---

# 🏗️ Tech Stack

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB
- Mongoose

---

## Authentication & Security

- JWT
- bcryptjs
- cookie-parser
- cors

---

## File Upload & Media Storage

- Multer
- ImageKit

---

## Environment Management

- dotenv

---

# 📂 Project Structure

```bash
Backend/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── post.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   ├── like.model.js
│   │   └── follow.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── post.routes.js
│   │   └── user.routes.js
│   │
│   ├── config/
│   │   └── database.js
│   │
│   └── app.js
│
├── server.js
├── package.json
└── .env
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Run Development Server

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:3000
```

---

# 🔌 API Endpoints

# 🔐 Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register New User |
| POST | `/api/auth/login` | Login Existing User |
| GET | `/api/auth/get-me` | Get Logged-in User |

---

# 📸 Post Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/posts` | Create New Post |
| GET | `/api/posts` | Get Logged-in User Posts |
| GET | `/api/posts/feed` | Get Feed Posts |
| GET | `/api/posts/details/:postId` | Get Detailed Post |
| POST | `/api/posts/likes/:postId` | Like a Post |

---

# 👥 User Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/follow/:username` | Follow User |
| POST | `/api/users/unfollow/:username` | Unfollow User |
| PATCH | `/api/users/follow/accept/:requestId` | Accept Follow Request |
| PATCH | `/api/users/follow/reject/:requestId` | Reject Follow Request |

---

# 🔄 Authentication Flow

```text
User Login/Register
        ↓
JWT Token Generated
        ↓
Token Stored in Cookie
        ↓
Frontend Sends Cookie Automatically
        ↓
Protected Middleware Verifies JWT
        ↓
User Authorized Successfully
```

---

# 🖼️ Image Upload Flow

```text
Frontend Uploads Image
        ↓
Multer Processes File
        ↓
Image Uploaded to ImageKit
        ↓
Image Optimized using CDN Transformations
        ↓
Optimized Image URL Stored in MongoDB
        ↓
Frontend Renders Optimized Image
```

---

# 📌 Database Features

## ✅ MongoDB Indexing

Implemented MongoDB indexes to prevent:

- Duplicate Usernames
- Duplicate Emails
- Duplicate Likes
- Duplicate Follow Requests

---

# 🚀 Backend Highlights

✔ JWT Authentication  
✔ Cookie-Based Authorization  
✔ Protected APIs  
✔ Cloud Image Uploads  
✔ CDN Image Optimization  
✔ Optimized Media Delivery  
✔ Secure Password Hashing  
✔ Multer File Handling  
✔ Real-world MVC Architecture  
✔ Scalable Folder Structure  
✔ MongoDB Relationships  
✔ Database Indexing  
✔ Feed System  
✔ Like System  
✔ Follow Request System  
✔ RESTful API Design  

---

# 🔮 Future Improvements

- Comments System
- Saved Posts
- Realtime Notifications
- Stories Feature
- Chat System
- User Profile Editing
- Feed Pagination
- Search Functionality
- Refresh Tokens
- API Rate Limiting
- Swagger API Documentation
- Socket.IO Realtime Features

---

# 👨‍💻 Developer

Built with ❤️ by **Siddhartha Biswas**

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
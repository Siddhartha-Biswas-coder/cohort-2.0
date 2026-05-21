# 🚀 InstaClone Backend API

A powerful and scalable backend for a modern **Instagram-inspired social media platform** built using **Node.js**, **Express.js**, and **MongoDB**.

This backend handles everything from authentication and authorization to post management, follow systems, likes, protected APIs, and cloud image uploads — following real-world backend development practices and scalable project architecture.

---

# ✨ Core Features

## 🔐 Authentication & Authorization
- User Registration & Login
- JWT-based Authentication
- Cookie-based Session Management
- Protected Routes Middleware
- Persistent Authentication
- Secure Password Hashing with `bcryptjs`

---

## 👤 User System
- Follow Users
- Unfollow Users
- Accept Follow Requests
- Reject Follow Requests
- Prevent Self Follow
- Duplicate Follow Prevention

---

## 📸 Post System
- Create Posts with Images
- Upload Images to ImageKit
- Fetch Logged-in User Posts
- Get Detailed Post Information
- Like Posts
- Duplicate Like Protection

---

## 🛡️ Security & Backend Practices
- JWT Verification Middleware
- Cookie Authentication
- CORS Configuration
- Request Validation
- Secure Route Handling
- Database Indexing
- MVC Architecture
- Error Response Handling

---

# 🧠 Concepts & Topics Covered

This project demonstrates hands-on implementation of:

- REST API Development
- Express.js Routing
- MVC Backend Architecture
- MongoDB & Mongoose
- Authentication & Authorization
- JWT Tokens & Cookies
- Middleware in Express
- File Upload Handling
- Cloud Media Storage
- MongoDB Relationships
- Protected APIs
- Database Indexing
- Error Handling
- Backend Project Structuring

---

# 🏗️ Tech Stack

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication & Security
- JWT
- bcryptjs
- cookie-parser
- cors

## File Upload & Storage
- Multer
- ImageKit

## Environment Management
- dotenv

---

# 📂 Project Structure

```bash
backend/
│
├── controllers/
│   ├── auth.controller.js
│   ├── post.controller.js
│   └── user.controller.js
│
├── middlewares/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   ├── post.model.js
│   ├── like.model.js
│   └── follow.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── post.routes.js
│   └── user.routes.js
│
├── config/
├── app.js
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
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Start Development Server

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:3000
```

---

# 🔌 API Endpoints

## 🔐 Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register New User |
| POST | `/api/auth/login` | Login Existing User |
| GET | `/api/auth/get-me` | Get Logged-in User |

---

## 📸 Post Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/posts` | Create New Post |
| GET | `/api/posts` | Get Logged-in User Posts |
| GET | `/api/posts/details/:postId` | Get Post Details |
| POST | `/api/posts/likes/:postId` | Like a Post |

---

## 👥 User Routes

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
Token Stored in HTTP Cookie
        ↓
Frontend Sends Cookie Automatically
        ↓
Protected Routes Verify JWT
        ↓
User Authorized Successfully
```

---

# 📌 Database Features

## ✅ Unique Indexing

Implemented MongoDB indexes to prevent:
- Duplicate Usernames
- Duplicate Emails
- Duplicate Likes
- Duplicate Follow Requests

---

# 🚀 Highlights

✔ Cookie-Based Authentication  
✔ JWT Authorization  
✔ Cloud Image Uploads  
✔ Secure Password Hashing  
✔ Protected APIs  
✔ Real-world Backend Architecture  
✔ Scalable Folder Structure  
✔ Relationship Management  
✔ Clean RESTful API Design  

---

# 🔮 Future Improvements

- Comments System
- Realtime Notifications
- Stories Feature
- Chat System
- Saved Posts
- User Profile Editing
- Pagination
- Refresh Tokens
- API Rate Limiting
- Swagger Documentation
- Realtime Socket.IO Integration

---

# 👨‍💻 Developer

Built with ❤️ by **Siddhartha Biswas**

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
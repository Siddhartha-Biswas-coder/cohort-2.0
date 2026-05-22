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
- Fetch Logged-in User (`get-me`)

---

## 👤 User System

- Follow Users
- Unfollow Users
- Accept Follow Requests
- Reject Follow Requests
- Prevent Self Follow
- Duplicate Follow Protection
- Follow Request Status Management

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
- Unlike Posts
- Prevent Duplicate Likes
- Feed Like Status Detection (`isLiked`)
- Feed Sorted by Latest Posts

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
- Async/Await Workflow Handling

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
│   ├── config/
│   │   └── database.js
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

## 2️⃣ Navigate into Project

```bash
cd backend
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Start Development Server

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
| POST | `/api/posts/like/:postId` | Like a Post |
| POST | `/api/posts/unlike/:postId` | Unlike a Post |

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
CDN Optimization Applied
        ↓
Optimized Image URL Stored in MongoDB
        ↓
Frontend Renders Optimized Image
```

---

# ❤️ Like System Flow

```text
User Clicks Like
        ↓
Protected Route Verifies User
        ↓
Like Stored in MongoDB
        ↓
Duplicate Like Prevented
        ↓
Feed Returns isLiked Status
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
✔ Like & Unlike System  
✔ Follow Request System  
✔ RESTful API Design  
✔ Async/Await Backend Workflow  

---

# 🚀 Continuous Learning & Future Growth

This project represents my current understanding of full-stack development and scalable backend architecture.

As I continue learning and improving, I plan to further enhance this backend by implementing more advanced real-world features and backend engineering concepts.

---

# 🌱 Areas I Plan to Explore & Improve

- Comments System
- Saved Posts Feature
- Realtime Notifications
- Stories System
- Chat & Messaging Features
- User Profile Editing
- Feed Pagination & Infinite Scroll APIs
- Search & Recommendation Systems
- Refresh Token Authentication
- API Rate Limiting & Security Enhancements
- Swagger API Documentation
- Socket.IO Realtime Communication
- Scalable Production Deployment
- Advanced Database Optimization
- Redis Caching
- Role-Based Authorization
- Microservices Architecture
- CI/CD Pipelines
- Advanced Backend Testing

---

# 🎯 Learning Mindset

I believe in continuously improving by:

- Building real-world projects
- Learning scalable software architecture
- Practicing clean code principles
- Exploring production-level backend systems
- Strengthening frontend & backend integration
- Improving problem-solving and system design skills

This project is one important step in my full-stack development journey, and I will continue expanding it as I grow as a developer.

---

# 👨‍💻 Developer

Built with ❤️ by **Siddhartha Biswas**

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
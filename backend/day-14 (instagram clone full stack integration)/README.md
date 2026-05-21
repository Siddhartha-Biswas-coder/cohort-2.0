# 📸 InstaClone — Full Stack Social Media Application

A modern **full-stack Instagram-inspired social media application** built using **React**, **Node.js**, **Express.js**, and **MongoDB**.

This project focuses on implementing real-world **frontend architecture**, **backend architecture**, **authentication systems**, **REST APIs**, **state management**, and **scalable project structuring** while following industry-level development practices.

> ⚠️ This project is currently under active development.

---

# 🚀 Project Vision

The goal of this project is to build a scalable and production-like social media platform while learning and implementing:

- Full Stack Development
- Frontend & Backend Architecture
- Authentication & Authorization
- REST API Design
- Database Relationships
- Cloud Media Uploads
- State Management
- Modern React Practices
- Secure Backend Development

---

# ✨ Current Features

## 🔐 Authentication System
- User Registration
- User Login
- JWT Authentication
- Cookie-based Authentication
- Persistent User Sessions
- Protected Backend Routes

---

## 👤 User Features
- Follow Users
- Unfollow Users
- Accept Follow Requests
- Reject Follow Requests
- Prevent Duplicate Follow Requests

---

## 📸 Post Features
- Create Posts
- Upload Images
- Like Posts
- Prevent Duplicate Likes
- Fetch User Posts
- Get Post Details

---

## 🎨 Frontend Features
- 4 Layer Frontend Architecture
- Context API State Management
- Custom Hooks
- Axios API Layer
- SCSS Styling System
- Feature-based Folder Structure
- Reusable Components

---

# 🧠 Concepts & Topics Covered

This project demonstrates practical implementation of:

## Frontend
- React
- React Router
- Context API
- Custom Hooks
- Axios
- SCSS / SASS
- Component-based Architecture
- State Management
- Feature-based Folder Structure

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-based Authentication
- Middleware
- MVC Architecture
- REST APIs
- File Upload Handling
- Cloud Storage Integration
- Database Indexing

---

# 🏗️ Tech Stack

## Frontend
- React
- Vite
- React Router
- Axios
- SCSS

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- multer
- ImageKit

---

# 📂 Project Structure

```bash
InstaClone/
│
├── Backend/
│   │
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── posts/
│   │   │   └── shared/
│   │   │
│   │   ├── App.jsx
│   │   ├── app.routes.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🧩 Frontend Architecture

The frontend follows a clean **4 Layer Architecture**:

---

## 🎨 UI Layer
Responsible for:
- Showing UI
- Rendering Pages
- User Interaction
- Navigation

---

## 🪝 Hook Layer
Responsible for:
- Business Logic
- API Handling
- Connecting UI & State Layers

---

## 🧠 State Layer
Responsible for:
- Global State Management
- Authentication State
- Loading State
- Shared Data

---

## 🌐 API Layer
Responsible for:
- Backend Communication
- API Requests
- Axios Services

---

# 🔄 Authentication Flow

```text
User Login/Register
        ↓
Frontend Sends Request
        ↓
Backend Validates User
        ↓
JWT Token Generated
        ↓
Token Stored in Cookie
        ↓
Protected Routes Verify JWT
        ↓
Authenticated User Access Granted
```

---

# 🔌 API Features

## Authentication APIs
- Register User
- Login User
- Get Current User

---

## User APIs
- Follow User
- Unfollow User
- Accept Follow Request
- Reject Follow Request

---

## Post APIs
- Create Post
- Like Post
- Get User Posts
- Get Post Details

---

# 🛡️ Security Features

- Password Hashing using `bcryptjs`
- JWT Authentication
- Cookie-based Authorization
- Protected Routes Middleware
- Secure CORS Configuration
- Duplicate Request Prevention
- MongoDB Indexing

---

# 📸 Cloud Image Uploads

Images are uploaded and managed using:

- Multer
- ImageKit

This enables scalable cloud-based image handling for posts.

---

# ⚙️ Installation & Setup

# 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

# 2️⃣ Setup Backend

```bash
cd Backend
npm install
```

Create `.env` file:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

Start backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:3000
```

---

# 3️⃣ Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🚀 Current Development Status

## ✅ Completed
- Authentication System
- JWT Authorization
- Cookie Authentication
- Follow System
- Like System
- Post Creation APIs
- Frontend Authentication Flow
- 4 Layer Frontend Architecture
- Backend MVC Architecture

---

## 🚧 In Progress
- Feed System
- Protected Frontend Routes
- User Dashboard
- Better UI Components
- Error Handling Improvements

---

## 🔮 Planned Features
- Comments System
- Stories Feature
- Realtime Notifications
- Chat System
- Responsive Mobile UI
- Saved Posts
- Profile Editing
- Infinite Scrolling
- Dark/Light Theme Toggle
- Socket.IO Integration
- Refresh Tokens
- API Documentation

---

# 📚 Learning Outcomes

This project helped in understanding:

- Full Stack Project Structuring
- Authentication Flow
- REST API Development
- State Management
- Frontend Architecture
- Backend Architecture
- Secure Authentication
- Cloud Media Uploads
- MongoDB Relationships
- Real-world Development Practices

---

# 👨‍💻 Developer

Built with ❤️ by **Siddhartha Biswas**

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
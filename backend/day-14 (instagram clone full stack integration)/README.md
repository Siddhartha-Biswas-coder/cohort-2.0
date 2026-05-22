# 📸 InstaClone — Full Stack Social Media Application

A modern and scalable **full-stack Instagram-inspired social media application** built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

This project focuses on implementing real-world **frontend architecture**, **backend architecture**, **authentication systems**, **REST APIs**, **state management**, **cloud media handling**, and **scalable project structuring** while following modern full-stack development practices.

The application includes authentication, post creation, cloud image uploads, feed rendering, follow systems, like systems, reusable frontend architecture, protected APIs, and full frontend-backend integration.

---

# 🚀 Project Vision

The goal of this project is to build a scalable production-inspired social media platform while learning and implementing:

- Full Stack Development
- Frontend & Backend Architecture
- Authentication & Authorization
- REST API Development
- Database Relationships
- Cloud Media Uploads
- State Management
- Modern React Practices
- Secure Backend Development
- Scalable Folder Structuring
- Real-world Full Stack Workflows

---

# ✨ Features

# 🔐 Authentication System

- User Registration
- User Login
- JWT Authentication
- Cookie-Based Authentication
- Persistent Login Sessions
- Protected Backend Routes
- Authentication State Management
- Secure Password Hashing using `bcryptjs`
- Auth Middleware Verification

---

# 👤 User Features

- Follow Users
- Unfollow Users
- Accept Follow Requests
- Reject Follow Requests
- Prevent Duplicate Follow Requests
- Prevent Self Follow

---

# 📸 Post Features

- Create Posts with Images
- Upload Images using Multer
- Cloud Image Storage using ImageKit
- Optimized CDN Image Delivery
- Fetch Feed Posts
- Fetch Logged-in User Posts
- Get Detailed Post Information
- Like Posts
- Unlike Posts
- Prevent Duplicate Likes
- Dynamic Feed Like Status (`isLiked`)
- Real-time Feed Refresh after Like/Unlike

---

# 🎨 Frontend Features

- 4 Layer Frontend Architecture
- Context API State Management
- Custom Hooks
- Axios API Layer
- SCSS Styling Architecture
- Feed Rendering System
- Dynamic Post Rendering
- Create Post UI
- Like / Unlike UI
- Reusable Components
- Feature-Based Folder Structure
- Authentication Flow
- Global State Handling
- Route Navigation

---

# 🧠 Concepts & Topics Covered

# Frontend

- React.js
- React Router
- Context API
- Custom Hooks
- Axios
- SCSS / SASS
- Component-Based Architecture
- Feature-Based Folder Structure
- State Management
- Dynamic Rendering
- Conditional Rendering
- Async Frontend Operations
- Reusable Component Design
- API Layer Structuring
- FormData Handling

---

# Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie-Based Authentication
- Middleware
- MVC Architecture
- REST APIs
- File Upload Handling
- Cloud Media Storage
- CDN Image Optimization
- MongoDB Relationships
- Database Indexing
- Async Backend Operations
- Secure API Development

---

# 🏗️ Tech Stack

# Frontend

- React.js
- Vite
- React Router
- Axios
- SCSS / SASS

---

# Backend

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
│   ├── src/
│   │   │
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── post.controller.js
│   │   │   └── user.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── post.model.js
│   │   │   ├── like.model.js
│   │   │   └── follow.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── post.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── features/
│   │   │   │
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

The frontend follows a scalable **4 Layer Architecture** approach.

---

# 🎨 UI Layer

Responsible for:

- Rendering UI
- Showing Feed Posts
- Navigation
- User Interaction
- Form Handling
- Loading States

### Example

```bash
Login.jsx
Register.jsx
Feed.jsx
CreatePost.jsx
Post.jsx
```

---

# 🪝 Hook Layer

Responsible for:

- Business Logic
- Feed Fetching Logic
- Authentication Logic
- Post Creation Logic
- Like / Unlike Logic
- API Handling
- Connecting UI & State Layers

### Example

```bash
useAuth.js
usePost.js
```

---

# 🧠 State Layer

Responsible for:

- Global State Management
- Authentication State
- Feed State
- Loading State
- Shared Application Data

### Example

```bash
auth.context.jsx
post.context.jsx
```

---

# 🌐 API Layer

Responsible for:

- Backend Communication
- Axios Services
- Sending HTTP Requests
- Cookie-based Session Handling
- Multipart FormData Uploads

### Example

```bash
auth.api.js
post.api.js
```

---

# 🔄 Full Stack Authentication Flow

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
Frontend Automatically Sends Cookie
        ↓
Protected Middleware Verifies JWT
        ↓
Authenticated User Access Granted
```

---

# 📰 Feed Rendering Flow

```text
Feed Component Loads
          ↓
useEffect triggers feed fetching
          ↓
Hook Layer calls API Layer
          ↓
Backend returns posts
          ↓
Feed stored in Context API
          ↓
Posts rendered dynamically using reusable Post component
```

---

# 📸 Image Upload Flow

```text
User selects image + caption
            ↓
Frontend creates FormData
            ↓
API request sent to backend
            ↓
Multer processes uploaded image
            ↓
Image uploaded to ImageKit
            ↓
Optimized CDN image URL generated
            ↓
Post stored in MongoDB
            ↓
Frontend renders optimized image
```

---

# ❤️ Like / Unlike Flow

```text
User clicks like button
          ↓
Frontend sends API request
          ↓
Backend updates database
          ↓
Feed refreshed automatically
          ↓
UI updates dynamically
```

---

# 🔌 API Features

# Authentication APIs

- Register User
- Login User
- Get Current User

---

# User APIs

- Follow User
- Unfollow User
- Accept Follow Request
- Reject Follow Request

---

# Post APIs

- Create Post
- Like Post
- Unlike Post
- Get Feed Posts
- Get User Posts
- Get Post Details

---

# 🛡️ Security Features

- Password Hashing using `bcryptjs`
- JWT Authentication
- Cookie-Based Authorization
- Protected Routes Middleware
- Secure CORS Configuration
- Duplicate Request Prevention
- MongoDB Indexing
- Protected API Access

---

# 📸 Cloud Image Upload System

Images are uploaded and optimized using:

- Multer
- ImageKit
- CDN Transformations

This enables:

- Cloud Media Storage
- Optimized Image Delivery
- Scalable Image Handling
- Better Frontend Performance

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

IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
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

# ✅ Current Project Status

# ✔ Completed Features

- JWT Authentication System
- Cookie-Based Authentication
- Follow System
- Like & Unlike System
- Feed System
- Dynamic Feed Rendering
- Post Creation System
- Cloud Image Uploads
- Image Optimization
- Frontend Authentication Flow
- Context API State Management
- 4 Layer Frontend Architecture
- Backend MVC Architecture
- Frontend & Backend Integration
- Reusable Components
- API Layer Structuring

---

# 🌱 Continuous Learning & Future Improvements

This project represents my current understanding of full-stack development and scalable application architecture.

As I continue improving as a developer, I plan to expand this project further by learning and implementing more advanced production-level features and engineering concepts.

---

# 🚀 Areas I Plan to Explore & Improve

- Protected Frontend Routes
- Comment System
- Saved Posts
- Stories Feature
- User Profile Pages
- Profile Editing
- Infinite Scrolling Feed
- Realtime Notifications
- Chat System
- Dark / Light Theme Toggle
- Toast Notifications
- Skeleton Loading UI
- Refresh Tokens
- Socket.IO Integration
- API Documentation
- Advanced State Management
- Performance Optimization
- Frontend Testing
- Accessibility Improvements
- TypeScript Integration

---

# 📚 Learning Outcomes

This project helped in understanding:

- Full Stack Project Structuring
- Frontend Architecture
- Backend Architecture
- Authentication Flow
- REST API Development
- Context API State Management
- Secure Authentication
- MongoDB Relationships
- Cloud Media Uploads
- Image Optimization
- Full Stack Integration
- Real-world Development Practices

---

# 👨‍💻 Developer

Built with ❤️ by **Siddhartha Biswas**

- GitHub: https://github.com/Siddhartha-Biswas-coder
- LinkedIn: https://www.linkedin.com/in/siddhartha-biswas-616042395/

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
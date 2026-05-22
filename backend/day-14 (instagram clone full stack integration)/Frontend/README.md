# 🚀 InstaClone Frontend

A modern and scalable frontend for an **Instagram-inspired social media platform** built using **React.js**, **React Router**, **Axios**, and **SCSS**.

This frontend follows a clean **4-Layer Frontend Architecture** to maintain proper separation of concerns between UI, business logic, global state management, and API communication.

The project includes authentication flow, feed rendering, post creation, like/unlike functionality, reusable components, API integration, and scalable frontend structuring inspired by real-world frontend engineering practices.

---

# ✨ Features

# 🔐 Authentication System

- User Registration
- User Login
- Cookie-Based Authentication
- Persistent Login Sessions
- Authentication State Handling
- Loading State Management
- Context API Global Authentication State
- Automatic Navigation after Authentication

---

# 📰 Feed System

- Fetch Feed Posts from Backend
- Dynamic Feed Rendering
- Show User Information
- Show Profile Images
- Render Optimized ImageKit Images
- Dynamic Like / Unlike UI State
- Feed Loading State
- Reusable Post Component Architecture
- Latest Posts Render First

---

# 📸 Post Creation System

- Create Posts with Images
- Upload Image using FormData
- Caption Support
- Create Post UI
- Automatic Feed Updates
- Image Preview Workflow
- Backend Image Upload Integration

---

# ❤️ Like System

- Like Posts
- Unlike Posts
- Dynamic Heart Icon State
- Real-time Feed Refresh after Like/Unlike
- Like State Synchronization with Backend

---

# 🏗️ Frontend Architecture

- 4 Layer Architecture
- Feature-Based Folder Structure
- Separation of Concerns
- Reusable Components
- API Service Layer
- Custom Hooks
- Global State Management
- Context-Based Architecture
- Scalable Frontend Structuring

---

# 🎨 UI & Styling

- Modern Dark Theme UI
- Responsive Layout Structure
- SCSS Styling Architecture
- Reusable Button Styling
- Shared Global Styling
- SCSS Mixins
- Feed Card Design
- Interactive Icon Buttons
- Smooth Transitions & Animations
- Gradient Profile Ring UI

---

# 🧠 Concepts Covered

This project demonstrates hands-on implementation of:

- React Fundamentals
- React Component Architecture
- React Router
- Context API
- Custom Hooks
- Global State Management
- Axios API Integration
- Authentication Flow
- Cookie-Based Authentication
- Async Frontend Operations
- Feature-Based Folder Structure
- SCSS Architecture
- Dynamic Rendering
- Conditional Rendering
- Reusable Component Design
- Backend Integration
- API Layer Structuring
- FormData Handling
- Scalable Frontend Practices

---

# 🏗️ Tech Stack

# Frontend

- React.js
- Vite

---

# Routing

- React Router

---

# State Management

- Context API
- Custom Hooks

---

# API Communication

- Axios

---

# Styling

- SCSS / SASS

---

# Media & Assets

- ImageKit CDN Images
- SVG Icons
- FormData Uploads

---

# 📂 Project Structure

```bash
Frontend/
│
├── src/
│   │
│   ├── features/
│   │   │
│   │   ├── auth/
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── auth.api.js
│   │   │   │
│   │   │   ├── styles/
│   │   │   │   └── form.scss
│   │   │   │
│   │   │   └── auth.context.jsx
│   │   │
│   │   ├── posts/
│   │   │   │
│   │   │   ├── components/
│   │   │   │   └── Post.jsx
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   └── usePost.js
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── Feed.jsx
│   │   │   │   └── CreatePost.jsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── post.api.js
│   │   │   │
│   │   │   ├── styles/
│   │   │   │   ├── feed.scss
│   │   │   │   └── createPost.scss
│   │   │   │
│   │   │   └── post.context.jsx
│   │   │
│   │   └── shared/
│   │       │
│   │       ├── components/
│   │       │   └── Nav.jsx
│   │       │
│   │       ├── styles/
│   │       │   ├── button.scss
│   │       │   ├── global.scss
│   │       │   └── nav.scss
│   │
│   ├── App.jsx
│   ├── app.routes.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🧩 4 Layer Frontend Architecture

This project follows a scalable frontend architecture pattern.

---

# 🎨 UI Layer

Responsible for rendering UI and handling user interactions.

## Responsibilities

- Render UI
- Show Feed Posts
- Handle Form Inputs
- Navigate Pages
- Render Loading States
- Display Dynamic Data

## Example

```bash
Login.jsx
Register.jsx
Feed.jsx
CreatePost.jsx
Post.jsx
```

---

# 🪝 Hook Layer

Responsible for frontend business logic and async operations.

## Responsibilities

- Handle Authentication Logic
- Handle Feed Fetching
- Handle Post Creation
- Handle Like/Unlike Logic
- Connect API Layer with State Layer
- Manage Async Logic

## Example

```bash
useAuth.js
usePost.js
```

---

# 🧠 State Layer

Responsible for managing global application state.

## Responsibilities

- Store User Data
- Store Feed Data
- Manage Loading States
- Share State Across Components

## Example

```bash
auth.context.jsx
post.context.jsx
```

## Managed States

- User
- Feed Posts
- Loading State
- Authentication State

---

# 🌐 API Layer

Responsible for backend communication.

## Responsibilities

- Send HTTP Requests
- Handle Backend Communication
- Manage API Calls
- Handle Authentication Cookies
- Upload Multipart FormData

## Example

```bash
auth.api.js
post.api.js
```

---

# 🔄 Authentication Flow

```text
User submits login/register form
              ↓
UI Layer handles form submission
              ↓
Hook Layer processes authentication logic
              ↓
API Layer sends request to backend
              ↓
Backend returns user data + cookie
              ↓
Context API stores authenticated user
              ↓
UI updates and navigates user
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
Posts dynamically rendered using reusable Post component
```

---

# 📸 Post Creation Flow

```text
User selects image + caption
            ↓
FormData created in frontend
            ↓
API Layer sends multipart/form-data request
            ↓
Backend uploads image to ImageKit
            ↓
Optimized image URL returned
            ↓
Feed updates dynamically
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
Feed refreshed with updated like state
          ↓
UI updates dynamically
```

---

# ⚙️ Installation & Setup

# 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

# 2️⃣ Navigate into Frontend

```bash
cd frontend
```

---

# 3️⃣ Install Dependencies

```bash
npm install
```

---

# 4️⃣ Start Development Server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔗 Backend Integration

Frontend communicates with backend using Axios.

---

# 🔐 Authentication API

```js
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});
```

---

# 📸 Posts API

```js
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
```

---

# 🍪 Why `withCredentials: true`?

Allows the browser to:

- Receive authentication cookies
- Send cookies automatically with requests
- Maintain authenticated sessions

---

# 🎨 Styling Architecture

# Global Styling

```bash
global.scss
```

Handles:

- Reset Styles
- Theme Colors
- Fonts
- Shared Styling Rules

---

# Shared Button Styling

```bash
button.scss
```

Provides:

- Reusable Button Classes
- Active Animations
- Hover Effects
- Shared Theme Styling

---

# Feed Styling

```bash
feed.scss
```

Handles:

- Feed Layout
- Post Card Styling
- User Profile Styling
- Interactive Icons
- Feed Responsiveness

---

# Create Post Styling

```bash
createPost.scss
```

Handles:

- Create Post Form Styling
- File Upload UI
- Custom Upload Button Styling

---

# 🚀 Frontend Highlights

✔ 4 Layer Architecture  
✔ Feature-Based Folder Structure  
✔ Context API State Management  
✔ Custom Hooks  
✔ Axios API Layer  
✔ Feed Rendering System  
✔ Authentication Flow  
✔ Cookie-Based Authentication  
✔ Reusable Components  
✔ SCSS Styling Architecture  
✔ Dynamic Post Rendering  
✔ Optimized Image Rendering  
✔ Like & Unlike System  
✔ Create Post Functionality  
✔ FormData Image Uploads  
✔ Scalable Frontend Structure  
✔ Modern React Practices  

---

# 🌱 Continuous Learning & Future Growth

This project represents my current understanding of frontend development and full-stack integration.

As I continue learning and improving, I plan to further enhance this frontend by exploring more advanced frontend engineering concepts and production-level features.

---

# 🚀 Areas I Plan to Explore & Improve

- Protected Frontend Routes
- User Profile Pages
- Comment System UI
- Saved Posts UI
- Follow System UI
- Infinite Scrolling Feed
- Realtime Notifications
- Dark / Light Theme Toggle
- Toast Notifications
- Skeleton Loading UI
- Mobile Responsive Optimization
- Advanced State Management
- Realtime Frontend Features
- Frontend Performance Optimization
- Advanced React Patterns
- TypeScript Integration
- Accessibility Improvements
- Frontend Testing

---

# 🎯 Learning Mindset

I believe in continuously improving by:

- Building real-world applications
- Learning scalable frontend architecture
- Practicing clean UI structuring
- Strengthening frontend & backend integration
- Improving React development skills
- Exploring production-level frontend engineering

This project is one important step in my frontend and full-stack development journey, and I will continue improving it as I grow as a developer.

---

# 👨‍💻 Developer

Built with ❤️ by **Siddhartha Biswas**

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
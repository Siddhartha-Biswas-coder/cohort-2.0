# 🚀 InstaClone Frontend

A modern and scalable frontend for an **Instagram-inspired social media platform** built using **React.js**, **React Router**, **Axios**, and **SCSS**.

This frontend follows a clean **4-Layer Frontend Architecture** to maintain proper separation of concerns between UI, logic, state management, and API communication.

The project includes authentication flow, global state management, feed rendering, reusable components, API integration, dynamic post rendering, and scalable frontend structuring inspired by real-world frontend engineering practices.

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
- Render Dynamic Post Feed
- Show User Information
- Show Profile Images
- Render Optimized Images from ImageKit
- Dynamic Like UI State
- Feed Loading State
- Reusable Post Component Architecture

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

# Media & Icons

- ImageKit CDN Images
- SVG Icons

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
│   │   │   │   └── Feed.jsx
│   │   │   │
│   │   │   ├── services/
│   │   │   │   └── post.api.js
│   │   │   │
│   │   │   ├── styles/
│   │   │   │   └── feed.scss
│   │   │   │
│   │   │   └── post.context.jsx
│   │   │
│   │   └── shared/
│   │       ├── button.scss
│   │       └── global.scss
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

Responsible for rendering the UI and handling user interactions.

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
Post.jsx
```

---

# 🪝 Hook Layer

Responsible for frontend business logic and async operations.

## Responsibilities

- Handle Authentication Logic
- Handle Feed Fetching
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

# ⚙️ Installation & Setup

# 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

# 2️⃣ Install Dependencies

```bash
npm install
```

---

# 3️⃣ Start Development Server

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

## Authentication API

```js
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});
```

---

## Feed API

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
✔ Scalable Frontend Structure  
✔ Modern React Practices  

---

# 🔮 Future Improvements

- Protected Frontend Routes
- Create Post UI
- Like Functionality
- Comment System
- Saved Posts
- User Profile Pages
- Follow System UI
- Infinite Scrolling Feed
- Realtime Notifications
- Responsive Mobile Design
- Dark / Light Theme Toggle
- Toast Notifications
- Skeleton Loading UI

---

# 👨‍💻 Developer

Built with ❤️ by **Siddhartha Biswas**

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
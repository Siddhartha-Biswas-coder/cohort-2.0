# 🚀 InstaClone Frontend

A modern and scalable frontend for an **Instagram-inspired social media application** built with **React**, **React Router**, **Axios**, and **SCSS**.

This frontend follows a clean **4-Layer Architecture** approach for better scalability, maintainability, and separation of concerns. It includes authentication flow, protected state handling, API communication, reusable styling structure, and modern React development practices.

---

# ✨ Features

## 🔐 Authentication System
- User Login
- User Registration
- Persistent Authentication
- Cookie-based Authentication Support
- Loading State Management
- Context API State Management

---

## 🎯 Frontend Architecture
- 4 Layer Architecture
- Feature-based Folder Structure
- Separation of Concerns
- Reusable Components
- Custom Hooks
- API Service Layer
- Global State Handling

---

## 🎨 UI & Styling
- Responsive Form UI
- Reusable Button Styles
- Global SCSS Styling
- Modern Dark Theme
- SCSS Mixins
- Smooth Transitions & Animations

---

# 🧠 Concepts & Topics Covered

This project demonstrates practical implementation of:

- React Fundamentals
- React Router
- Context API
- Custom Hooks
- API Layer Architecture
- Axios Integration
- State Management
- Component-based Architecture
- Feature-based Folder Structure
- SCSS Styling
- Form Handling
- Navigation Handling
- Authentication Flow
- Cookie-based Authentication

---

# 🏗️ Tech Stack

## Frontend
- React
- Vite

## Routing
- React Router

## State Management
- Context API
- Custom Hooks

## API Communication
- Axios

## Styling
- SCSS / SASS

---

# 📂 Project Structure

```bash
frontend/
│
├── src/
│   │
│   ├── features/
│   │   │
│   │   ├── auth/
│   │   │   │
│   │   │   ├── components/
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

# 🧩 4 Layer Architecture

This project follows a clean frontend architecture pattern:

---

## 🎨 UI Layer
Responsible for displaying UI and handling user interaction.

### Responsibilities
- Render UI
- Navigate Pages
- Handle User Inputs
- Show Loading States

### Example
```bash
Login.jsx
Register.jsx
```

---

## 🪝 Hook Layer
Responsible for managing logic and communication between UI and API.

### Responsibilities
- Handle Authentication Logic
- Manage Async Functions
- Connect State & API Layers

### Example
```bash
useAuth.js
```

---

## 🧠 State Layer
Responsible for global state management.

### Responsibilities
- Store User Data
- Manage Loading State
- Share State Across Components

### Example
```bash
auth.context.jsx
```

Managed States:
- User
- Loading
- Authentication State

---

## 🌐 API Layer
Responsible for backend communication.

### Responsibilities
- Send API Requests
- Handle HTTP Calls
- Manage Backend Communication

### Example
```bash
auth.api.js
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
State Layer stores authenticated user
              ↓
UI updates and navigates user
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

## 3️⃣ Start Development Server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔗 Backend Connection

Frontend communicates with backend using Axios:

```js
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});
```

### Why `withCredentials: true`?
Allows browser to:
- Receive authentication cookies
- Send cookies automatically with requests

---

# 🎨 Styling System

## Shared Global Styling
```bash
global.scss
```

Handles:
- Reset Styles
- Fonts
- Theme Colors
- Shared Styling Rules

---

## Reusable Button Styling
```bash
button.scss
```

Provides:
- Reusable Button Classes
- Hover Effects
- Active Animations
- Theme Styling

---

# 🚀 Highlights

✔ 4 Layer Architecture  
✔ Clean Folder Structure  
✔ Context API State Management  
✔ Custom Hooks  
✔ Axios API Layer  
✔ Authentication Flow  
✔ SCSS Styling System  
✔ Reusable Components  
✔ Modern React Practices  
✔ Scalable Frontend Structure  

---

# 🔮 Future Improvements

- Protected Routes
- User Dashboard
- Feed System
- Post Creation UI
- Dark/Light Theme Toggle
- Global Toast Notifications
- Infinite Scrolling
- Profile Pages
- Real-time Features
- Responsive Mobile UI

---

# 👨‍💻 Developer

Built with ❤️ by **Siddhartha Biswas**

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
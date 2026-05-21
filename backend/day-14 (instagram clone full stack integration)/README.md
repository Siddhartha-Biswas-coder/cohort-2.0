# Instagram Clone (Full Stack Integration)

This project is a full stack Instagram-like application built with a Node.js/Express backend and a React/Vite frontend.

## Features

### Backend
- User authentication with registration and login flows
- Protected routes using authentication middleware
- Post creation, retrieval, and management
- User profile and follow data handling
- Like system for posts
- Modular structure with controllers, models, routes, and middleware

### Frontend
- React app scaffolded with Vite
- Authentication pages for login and registration
- Auth state management using context and custom hooks
- Shared styling and reusable components for buttons and forms
- Routing support for different app views and user flows

## Project Structure

- `Backend/`
  - `src/app.js` - Express app setup
  - `src/controllers/` - Controllers for auth, posts, and users
  - `src/models/` - Data models for users, posts, likes, and follows
  - `src/routes/` - API route definitions
  - `src/middlewares/` - Auth middleware
  - `src/config/` - Database configuration

- `Frontend/`
  - `src/App.jsx` - Main application component
  - `src/main.jsx` - App bootstrap
  - `src/features/auth/` - Auth pages, hooks, services, and styles
  - `src/features/posts/` - Post-related UI and logic
  - `src/features/shared/` - Shared styles and components

## Notes

This repository brings together the backend API and frontend client in one workspace, making it easier to develop and test the complete Instagram clone experience.

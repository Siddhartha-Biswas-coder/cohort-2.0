# 🎵 Moodify — AI Powered Emotion Based Music Player

An AI-integrated full-stack music recommendation platform that uses real-time facial emotion detection to dynamically play mood-based songs.

Moodify detects a user’s facial expression in real-time using webcam analysis and recommends songs based on their mood.

Built with:
- React
- Node.js
- Express.js
- MongoDB
- Redis
- MediaPipe
- ImageKit

---

# 🌍 Live Demo

## Frontend Deployment
https://moodify-ai-git-main-siddhartha-biswas-projects.vercel.app

## Backend API
https://moodify-ai-api.onrender.com

---

# ☁️ Deployment

## Frontend
Deployed on Vercel.

## Backend
Deployed on Render.

## Database
MongoDB Atlas

## Redis
Redis Cloud

## Media Storage
ImageKit

---

# 🚀 Deployment Architecture

```text
Frontend (Vercel)
        ↓
Backend API (Render)
        ↓
MongoDB Atlas
        ↓
Redis Cloud
        ↓
ImageKit
```

---

# 📌 Production Notes

- Backend hosted on Render free tier may take 30–60 seconds to wake up after inactivity.
- Webcam access requires HTTPS (supported by Vercel).
- Emotion detection is powered by MediaPipe Face Landmarker.
- Authentication uses secure HTTP-only cookies.

---

# 🚀 Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout with Redis Token Blacklisting

---

## 😀 AI Face Expression Detection

Using webcam + MediaPipe face landmark detection:
- Happy 😄
- Sad 😢
- Surprised 😲

The detected mood is sent to the backend which returns a matching song.

---

## 🎶 Music Player

Custom-built music player with:
- Play / Pause
- Seekbar
- Volume Control
- Playback Speed Control
- Skip Forward / Backward
- Responsive UI

---

## ☁️ Cloud Storage

Songs and posters are uploaded using:
- ImageKit Cloud Storage

---

# 🧠 AI Integration

Moodify uses MediaPipe Face Landmarker to detect real-time facial expressions using webcam analysis.

Detected expressions:
- Happy
- Sad
- Surprised

The detected emotion is mapped to mood-based music recommendations dynamically.

---

# 🏗️ Tech Stack

## Frontend
- React
- React Router
- Axios
- SCSS
- Context API
- MediaPipe

## Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Redis
- JWT
- Multer
- bcryptjs

---

# 📂 Folder Structure

## Backend Structure

```bash
Backend/
│
├── src/
│   ├── config/
│   │   ├── cache.js
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── song.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── models/
│   │   ├── blacklist.model.js
│   │   ├── song.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── song.routes.js
│   │
│   ├── services/
│   │   └── storage.service.js
│   │
│   └── app.js
│
├── .env
├── server.js
├── package.json
└── package-lock.json
```

---

## Frontend Structure

```bash
Frontend/
│
├── src/
│   ├── features/
│   │
│   │── auth/
│   │   ├── components/
│   │   │   ├── FormGroup.jsx
│   │   │   └── Protected.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services/
│   │   │   └── auth.api.js
│   │   │
│   │   ├── style/
│   │   │   ├── login.scss
│   │   │   └── register.scss
│   │   │
│   │   └── auth.context.jsx
│   │
│   │── Expression/
│   │   ├── components/
│   │   │   └── FaceExpression.jsx
│   │   │
│   │   └── utils/
│   │       └── utils.js
│   │
│   │── home/
│   │   ├── components/
│   │   │   ├── Player.jsx
│   │   │   └── player.scss
│   │   │
│   │   ├── hooks/
│   │   │   └── useSong.js
│   │   │
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   │
│   │   ├── services/
│   │   │   └── song.api.js
│   │   │
│   │   └── song.context.jsx
│   │
│   │── shared/
│   │   └── styles/
│   │       ├── button.scss
│   │       └── global.scss
│   │
│   ├── App.jsx
│   ├── app.routes.jsx
│   └── main.jsx
│
├── vercel.json
├── package.json
├── package-lock.json
├── vite.config.js
└── index.html
```

---

# ⚙️ Environment Variables

Create a `.env` file inside backend folder:

```env
MONGO_URI=your_mongodb_uri

JWT_SECRET_KEY=your_secret_key

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

---

# 📦 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Siddhartha-Biswas-coder/cohort-2.0.git
```

---

## 2️⃣ Navigate To Project Folder

```bash
cd backend/day-17-modify
```

---

## 3️⃣ Install Frontend Dependencies

```bash
cd Frontend
npm install
```

---

## 4️⃣ Install Backend Dependencies

```bash
cd ../Backend
npm install
```

---

# ▶️ Run Application

## Start Backend

```bash
npm run dev
```

Runs on:

```bash
http://localhost:3000
```

---

## Start Frontend

```bash
npm run dev
```

Runs on:

```bash
http://localhost:5173
```

---

# 📡 API Routes

## Authentication

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| GET | `/api/auth/get-me` | Get Current User |
| GET | `/api/auth/logout` | Logout User |

---

## Songs

| Method | Route | Description |
|---|---|---|
| POST | `/api/songs` | Upload Song |
| GET | `/api/songs?mood=happy` | Get Song By Mood |

---

# 🧠 How It Works

1. User opens app
2. Webcam detects face
3. MediaPipe analyzes facial landmarks
4. Emotion is detected
5. Frontend sends emotion to backend
6. Backend fetches matching song from MongoDB
7. Song plays in custom player

---

# 🌟 Future Improvements

- More emotion categories
- Playlist support
- Spotify integration
- AI recommendation engine
- Real-time song switching
- Mobile responsiveness improvements
- OAuth Login
- Dark / Light themes

---

# 🔒 Security Features

- Password hashing using bcrypt
- JWT authentication
- Redis token blacklist
- Protected API routes
- Cookie-based auth
- Secure HTTP-only production cookies

---

# 🛠️ Challenges Faced

- Cross-origin cookie authentication between Vercel and Render
- Real-time webcam permission handling
- Emotion detection accuracy tuning
- React Router deployment issues on Vercel
- Production CORS configuration

---

# 👨‍💻 Author

## Siddhartha Biswas

- Full Stack Developer
- AI/ML Enthusiast
- Metallurgical & Materials Engineering Student

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ If you like this project

Give it a ⭐ on GitHub and share your feedback!
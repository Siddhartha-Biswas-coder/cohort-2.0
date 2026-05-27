# 🎵 Moodify — AI Powered Emotion Based Music Player

Moodify is a full-stack AI-powered music player that detects a user’s facial expression in real-time using webcam analysis and recommends songs based on their mood.

Built with:
- React
- Node.js
- Express.js
- MongoDB
- Redis
- MediaPipe
- ImageKit

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

# 📂 Project Structure

```bash
Moodify/
│
├── frontend/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   └── utils/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── config/
│
└── README.md
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
git clone https://github.com/your-username/moodify.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd backend
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
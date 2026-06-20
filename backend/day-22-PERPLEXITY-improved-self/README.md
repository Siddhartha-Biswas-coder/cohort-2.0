# 🔍 Snitch - Advanced Perplexity AI Clone

Snitch is a premium, full-stack AI search and research assistant modeled after Perplexity AI. It combines advanced Language Models (LLMs) with real-time web search capabilities to deliver highly accurate, contextual, and structured responses. 

The application utilizes **Mistral AI** as its core reasoning engine and **Tavily Search API** for web retrieval. It features an interactive, real-time user interface utilizing WebSockets for instant token streaming and streaming controls.

---

## ✨ Features

### 🤖 Core AI & Search Capabilities
- **Search Mode**: Provides concise, direct, and fast answers to queries with bulleted facts, pulling real-time context from the web.
- **Research Mode**: Performs deep, multi-turn web search and analysis, returning a structured research report containing an *Overview*, *Key Findings*, *Analysis*, and a *Conclusion*.
- **Web Reference Sources**: Fetches, compiles, and presents search references and urls separately from the response content to keep the output readable and verified.

### ⚡ Real-Time Streaming & Interaction
- **Token-by-Token Streaming**: Responses are streamed to the browser in real time via Socket.io using LangChain's Event Stream protocol.
- **Cancelable Generation (Abort)**: Users can stop the AI generation mid-stream. The frontend communicates with the backend via WebSockets to abort the active LangChain reasoning cycle.

### 💬 Conversation & Session Management
- **Persistent Chats**: Conversations are saved to MongoDB, allowing users to return to their history.
- **Auto-generated Titles**: Conversations are automatically titled with a short 2–4 word summary using AI based on the first message.
- **Pin / Unpin Conversations**: Important chats can be pinned to the top of the sidebar.
- **Rename & Delete**: Complete control over editing chat titles or deleting old discussions.
- **Public Chat Sharing**: Generate unique, secure links to share conversations publicly with non-authenticated users.

### 🔒 User Authentication & Security
- **OAuth2 SMTP Verification**: Seamless signup flow requiring email verification using a secure Nodemailer Google OAuth2 transport.
- **JWT Authentication**: User sessions are securely managed using http-only cookie-based JSON Web Tokens (JWT).
- **Redis Token Blacklisting**: Ensures secure logouts by blacklisting JWTs on Redis with automatic TTL expiration (includes an in-memory fallback if Redis is offline).

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Caching & Sessions**: Redis (for token blacklisting)
- **AI Orchestration**: LangChain JS (`@langchain/core`, `@langchain/google-genai`, `@langchain/mistralai`)
- **Real-Time Communication**: Socket.io
- **Search Engine API**: Tavily Core

### Frontend
- **Framework**: React 19 & Vite
- **State Management**: Redux Toolkit & React Redux
- **Styling**: Tailwind CSS v4 & Framer Motion (for animations and micro-interactions)
- **Icons**: Lucide React
- **Rich Media**: Markdown rendering with syntax highlighting for code blocks (`react-markdown` & `react-syntax-highlighter`)

---

## 📂 Project Structure

```
day-22-PERPLEXITY-improved-self/
├── Backend/
│   ├── src/
│   │   ├── config/          # DB & Environment variables validator
│   │   ├── controllers/     # Express Request handlers
│   │   ├── errors/          # Custom API error handlers
│   │   ├── middlewares/     # Auth, error & validator middlewares
│   │   ├── models/          # Mongoose DB Schemas (User, Chat, Message)
│   │   ├── repositories/    # Database queries isolation layer
│   │   ├── routes/          # REST Endpoint routes mapping
│   │   ├── services/        # AI logic, streaming, mail & Redis
│   │   ├── sockets/         # Socket.io connection & event hooks
│   │   └── utils/           # Helper classes & API responses formatters
│   ├── server.js            # Express & HTTP server entry point
│   ├── package.json
│   └── .env
│
└── Frontend/
    ├── public/
    ├── src/
    │   ├── app/             # Routing configuration, Redux store & CSS
    │   ├── constants/       # App-wide constants
    │   ├── features/
    │   │   ├── auth/        # Login, Register, Auth State & hooks
    │   │   ├── chat/        # Sidebar, Chat area, Sockets & State
    │   │   ├── research/    # Research Mode layout
    │   │   └── settings/    # Theme and preference hooks
    │   ├── main.jsx         # React bootstrapping entry point
    │   └── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas Instance)
- [Redis](https://redis.io/) (Optional, in-memory fallback will be used if unavailable)

### 1. Setup the Backend

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory using the variables described below.
4. Start the backend server in development mode:
   ```bash
   npm run dev
   ```

#### Backend Environment Variables (`.env`)
```ini
PORT=3000
MONGODB_URI=mongodb://localhost:27017/perplexity-clone

# Redis URI (Defaults to localhost if blank)
REDIS_URL=redis://127.0.0.1:6379

# JWT Auth Secret
JWT_SECRET=your_jwt_secret_key_here

# AI Model APIs
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_search_api_key

# Nodemailer OAuth2 Credentials (Used for Sending Verification Emails)
GOOGLE_USER=your-email@gmail.com
GOOGLE_CLIENT_ID=your_oauth2_client_id
GOOGLE_CLIENT_SECRET=your_oauth2_client_secret
GOOGLE_REFRESH_TOKEN=your_oauth2_refresh_token
```

### 2. Setup the Frontend

1. Navigate to the `Frontend` directory:
   ```bash
   cd ../Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your web browser.

---

## 📡 API Specifications

### REST Endpoints

#### Authentication (`/api/auth`)
- `POST /register`: Register a new account. Sends email verification.
- `POST /login`: Log in, sets HTTP-only cookie.
- `POST /logout`: Logs out user, invalidates and blacklists JWT token.
- `GET /get-me`: Fetches authenticated user's profile.
- `GET /verify-email`: Query param `?token=...` to verify user email address.

#### Chat Management (`/api/chats`)
- `POST /message`: Send user message. Initiates new chat session if `chatId` is omitted.
- `GET /`: Get all chat conversations for the current logged-in user.
- `GET /:chatId/messages`: Fetch all historical messages for a chat.
- `PATCH /:chatId`: Rename chat title.
- `DELETE /delete/:chatId`: Delete chat history.
- `POST /:chatId/regenerate`: Ask AI to regenerate the response for the last query.
- `PATCH /:chatId/pin`: Pin/unpin a chat conversation.
- `POST /:chatId/share`: Generate a public share token.
- `GET /share/:token`: Public route to view shared chats.

---

## 🔌 WebSocket (Socket.io) Events

WebSockets are initialized with cookie verification and handle streaming events.

### Server to Client Events
- `ai-stream-start`: Fired when AI starts generating a response.
- `ai-stream-chunk`: Fired for every token/word chunk emitted by the model.
- `ai-stream-sources`: Emits the list of search sources (title and url) retrieved from the search agent.
- `ai-stream-end`: Fired when the stream is completed. Contains final source list.

### Client to Server Events
- `ai-stream-abort`: Sent by the client to cancel the active stream immediately.

---

## 🛡️ License

This project is licensed under the ISC License.

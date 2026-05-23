# AI Face Expression Detection

A simple React project that detects user facial expressions in real time using Google's MediaPipe Face Landmarker.

## Features

- Live webcam detection
- Detects:
  - Happy 😀
  - Surprised 😲
  - Neutral 😐
- Real-time face tracking
- Built using React + MediaPipe

---

## Tech Stack

- React
- Vite
- MediaPipe Tasks Vision

---

## Installation

Clone the repository:

```bash
git clone <your-repo-link>
```

Go to project folder:

```bash
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Run the project:

```bash
npm run dev
```

---

## Package Used

```bash
npm install @mediapipe/tasks-vision@0.10.3
```

---

## Project Structure

```txt
src/
 ├── features/
 │    └── Expression/
 │         └── components/
 │              └── FaceExpression.jsx
 │
 ├── App.jsx
 └── main.jsx
```

---

## How It Works

The app:
1. Opens the webcam
2. Detects face landmarks using MediaPipe
3. Reads face blendshape values
4. Detects expressions based on mouth and eyebrow movement

Example:
- Smile → Happy
- Open mouth + raised eyebrows → Surprised

---

## Learning Experience

This project was built after attending a lecture on how developers work in real-world environments.

Even though I had never worked on this topic before, I explored documentation, searched the web, used AI tools like ChatGPT, and learned while building the project.

This project helped me understand:
- How developers learn new technologies
- Problem solving using documentation
- Working with AI-assisted development
- Real-time browser-based AI applications

---

## Future Improvements

- More emotion detection
- Face mesh visualization
- Blink detection
- Attention tracking
- Better UI

---

## Author

Siddhartha Biswas
import React, { useState } from "react";
import MacWindow from "./MacWindow";

import ReactTerminal, { TerminalOutput, ColorMode } from "react-terminal-ui";

import "./cli.scss";

const Cli = ({ windowName, setWindowState }) => {
  const welcomeMessage = `
╔══════════════════════════════════════════════╗
║                                              ║
║     Welcome to Siddhartha's Portfolio CLI    ║
║                                              ║
╚══════════════════════════════════════════════╝

Hello there 👋

Welcome to my interactive portfolio terminal.

Type 'help' to explore available commands.

Popular Commands:
  • about
  • skills
  • projects
  • education
  • contact
  • social

Enjoy exploring 🚀
`;

  const [messages, setMessages] = useState([
    <TerminalOutput key="welcome">{welcomeMessage}</TerminalOutput>,
  ]);

  const commands = {
    help: `
about
skills
projects
education
contact
github
resume
social
whoami
date
clear
`,

    about: `
Hi! I'm Siddhartha Biswas 👋

I'm a passionate full-stack developer focused on building
modern, responsive, and interactive web applications.

Currently learning:
• Advanced React
• Backend Development
• AI/ML
• System Design

I enjoy creating beautiful UIs and solving real-world problems.
`,

    skills: `
Frontend:
• React.js
• JavaScript
• HTML5
• CSS3 / SCSS
• Tailwind CSS

Backend:
• Node.js
• Express.js

Tools:
• Git & GitHub
• Vite
• VS Code
• REST APIs

Currently Exploring:
• Next.js
• MongoDB
• AI/ML
`,

    projects: `
1. macOS Portfolio Clone
   → React + SCSS + Draggable Windows

2. Spotify Integration
   → Embedded Spotify Player

3. Interactive CLI Terminal
   → Custom terminal commands

4. Notes App
   → Markdown note viewer

5. GitHub Dashboard
   → GitHub profile integration
`,

    education: `
B.Tech in Metallurgical & Materials Engineering

Current CGPA Goal: 9+

Learning:
• Data Structures & Algorithms
• Full Stack Development
• AI/ML Engineering
`,

    contact: `
Email: siddharthabiswas@example.com
GitHub: github.com/siddharthabiswas
LinkedIn: linkedin.com/in/siddharthabiswas
`,

    social: `
GitHub: github.com/siddharthabiswas
LinkedIn: linkedin.com/in/siddharthabiswas
Instagram: @siddhartha.dev
`,

    whoami: "siddharthabiswas",

    date: new Date().toString(),
  };

  const onInput = (input) => {
    const cmd = input.trim().toLowerCase();

    if (cmd === "clear") {
      setMessages([]);
      return;
    }

    if (cmd === "github") {
      window.open("https://github.com", "_blank");

      setMessages((prev) => [
        ...prev,

        <TerminalOutput key={Math.random()}>
          {`siddharthabiswas:~$ ${input}`}
        </TerminalOutput>,

        <TerminalOutput key={Math.random()}>Opening GitHub...</TerminalOutput>,
      ]);

      return;
    }

    if (cmd === "resume") {
      setMessages((prev) => [
        ...prev,

        <TerminalOutput key={Math.random()}>
          {`siddharthabiswas:~$ ${input}`}
        </TerminalOutput>,

        <TerminalOutput key={Math.random()}>
          Opening Resume Window...
        </TerminalOutput>,
      ]);

      return;
    }

    const output = commands[cmd] || `Command not found: ${cmd}`;

    setMessages((prev) => [
      ...prev,

      <TerminalOutput key={Math.random()}>
        {`siddharthabiswas:~$ ${input}`}
      </TerminalOutput>,

      <TerminalOutput key={Math.random()}>{output}</TerminalOutput>,
    ]);
  };

  return (
    <MacWindow windowName={windowName} setWindowState={setWindowState}>
      <div className="cli-window">
        <ReactTerminal colorMode={ColorMode.Dark} onInput={onInput}>
          {messages}
        </ReactTerminal>
      </div>
    </MacWindow>
  );
};

export default Cli;

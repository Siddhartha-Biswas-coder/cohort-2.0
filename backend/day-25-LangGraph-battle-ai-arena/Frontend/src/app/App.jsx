import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatFeed from './components/ChatFeed';
import InputBar from './components/InputBar';

// Sample data for the AI Response (to be replaced with actual API later)
const SAMPLE_DATA = {
  solution_1:
    "Here's a JavaScript function to calculate the factorial of a number using both iterative and recursive approaches:\n\n### 1. Iterative Approach (using a loop)\n```javascript\nfunction factorialIterative(n) {\n    if (n < 0) {\n        throw new Error(\"Factorial is not defined for negative numbers\");\n    }\n    let result = 1;\n    for (let i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\n// Example usage:\nconsole.log(factorialIterative(5)); // Output: 120\n```\n\n### 2. Recursive Approach\n```javascript\nfunction factorialRecursive(n) {\n    if (n < 0) {\n        throw new Error(\"Factorial is not defined for negative numbers\");\n    }\n    if (n === 0 || n === 1) {\n        return 1;\n    }\n    return n * factorialRecursive(n - 1);\n}\n\n// Example usage:\nconsole.log(factorialRecursive(5)); // Output: 120\n```",
  solution_2:
    "Certainly! Below is a simple implementation of a factorial function in JavaScript.\n\n### Iterative Approach:\n```javascript\nfunction factorialIterative(n) {\n    if (n < 0) return undefined; // Factorial is not defined for negative numbers\n    let result = 1;\n    for (let i = 1; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}\n\n// Example usage:\nconsole.log(factorialIterative(5)); // Output: 120\n```\n\n### Recursive Approach:\n```javascript\nfunction factorialRecursive(n) {\n    if (n < 0) return undefined; // Factorial is not defined for negative numbers\n    if (n === 0 || n === 1) return 1;\n    return n * factorialRecursive(n - 1);\n}\n\n// Example usage:\nconsole.log(factorialRecursive(5)); // Output: 120\n```\n\nFeel free to use either approach based on your specific needs!",
  judge: {
    solution_1_score: 10,
    solution_2_score: 9,
    solution_1_reasoning:
      "Solution 1 is exceptionally comprehensive. It provides an iterative solution, a recursive solution, an ES6 one-liner, and a BigInt-based solution. It also properly throws errors for negative inputs instead of silently returning undefined.",
    solution_2_reasoning:
      "Solution 2 is highly clear and correct, providing both iterative and recursive implementations with good explanations. However, it returns 'undefined' for negative numbers instead of throwing an error, and it does not mention the JavaScript numeric precision limits.",
  },
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSendMessage = (messageText) => {
    // Add user message to feed
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: messageText },
    ]);
    
    setIsLoading(true);

    // Simulate API delay for AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          problem: messageText,
          solution_1: SAMPLE_DATA.solution_1,
          solution_2: SAMPLE_DATA.solution_2,
          judge: SAMPLE_DATA.judge,
        },
      ]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      {/* Main Chat Area */}
      <main className="grow pt-20 pb-32 px-4 w-full max-w-210 mx-auto">
        <ChatFeed messages={messages} isLoading={isLoading} />
      </main>

      <InputBar onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./chatbot.css";

interface Message {
  role: string;
  content: string;
}

const greetings = [
  'введіть "привіт", щоб почати!',
  'اكتب "مرحبا" للبدء!',
  'escribe "hola" para empezar!',
  ' введите "привет", чтобы начать!',
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [initialMessage, setInitialMessage] = useState(true);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (initialMessage) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % greetings.length;
        setCurrentGreeting(greetings[currentIndex]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [initialMessage]);

  const sendMessage = async () => {
    if (input.trim() === "") return;
    setInitialMessage(false);
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setTypingIndicator(true);

    try {
      console.log(newMessages);
      const messages = newMessages;
      const response = await axios.post("http://localhost:8000/chat/", {
        messages,
      });

      console.log("Response from API:", response.data);
      setMessages([
        ...newMessages,
        { role: "assistant", content: response.data },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setTypingIndicator(false);
    }
  };

  // Automatically scroll to bottom when messages state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatbot">
      <div className="messages">
        {initialMessage && (
          <div className="initial-message">{currentGreeting}</div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef}></div> {/* This div helps with scrolling */}
        {typingIndicator && (
          <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up-circle"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

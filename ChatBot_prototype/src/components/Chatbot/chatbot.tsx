import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/navbar";
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
      const response = await axios.post(
        "https://glowfastapi.azurewebsites.net/chat/",
        {
          messages,
        }
      );

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <Navbar />
      <div className="chatbot">
        <div className="messages">
          {initialMessage && (
            <div className="initial-message">
              <div className="image">
                <img src="../src/assets/logo.png" alt="sol" />
              </div>
              {currentGreeting}
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
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
              id="arrow-circle-down"
              viewBox="0 0 24 24"
              className="send"
            >
              <path d="M12,24A12,12,0,1,0,0,12,12.013,12.013,0,0,0,12,24ZM10.586,6.586a2,2,0,0,1,2.828,0l4.243,4.243-1.414,1.414L13,9v9H11V9L7.757,12.243,6.343,10.829Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

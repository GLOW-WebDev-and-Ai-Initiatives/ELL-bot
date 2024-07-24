import React from "react";
import Chatbot from "./components/Chatbot/chatbot";
import Navbar from "./components/navbar/navbar";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Chatbot />
    </div>
  );
};

export default App;

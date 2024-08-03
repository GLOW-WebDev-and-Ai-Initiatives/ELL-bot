import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import { useState, useEffect } from "react";
import React from "react";
import { slide as Menu } from "react-burger-menu";

const Modal = ({ isVisible, onClose, content }) => {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default () => {
  const [isSideNoteVisible, setSideNoteVisible] = useState(false);
  const [aboutContent, setAboutContent] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleSideNote = () => {
    setSideNoteVisible(!isSideNoteVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (isSideNoteVisible) {
      fetch('about.txt')
        .then(response => response.text())
        .then(text => setAboutContent(text))
        .catch(error => console.error('Error fetching about.txt:', error));
    }
  }, [isSideNoteVisible]);

  useEffect(() => {
    if (isModalVisible) {
      fetch('/Users/utkarshbanka/ELL-bot/ChatBot_prototype/src/components/navbar/about.txt')
        .then(response => response.text())
        .then(text => setAboutContent(text))
        .catch(error => console.error('Error fetching about.txt:', error));
    }
  }, [isModalVisible]);

  return (
    <Menu>
      <a
        className="menu-item"
        href="https://glowaction.org/about-us/"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h"
          viewBox="0 0 16 16"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
        </svg>
        GLOW
      </a>
      <a
        className="menu-item"
        href="https://forms.gle/uD49hHnh6PqjjHj1A"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h"
        >
          <path d="m24,5v2c0,2.757-2.243,5-5,5h-2c-.552,0-1-.448-1-1s.448-1,1-1h2c1.654,0,3-1.346,3-3v-2c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v2c0,1.654,1.346,3,3,3,.552,0,1,.448,1,1s-.448,1-1,1c-2.757,0-5-2.243-5-5v-2C0,2.243,2.243,0,5,0h14c2.757,0,5,2.243,5,5Zm-5.238,13.552l-4.755-1.783v-4.662c0-1.516-1.076-2.834-2.503-3.066-.879-.143-1.768.103-2.439.674-.672.571-1.057,1.404-1.057,2.286v7.563l-1.003-.799c-1.21-1.083-3.075-1.006-4.188.186-1.13,1.208-1.066,3.11.13,4.23l.558.538c.186.18.435.28.694.28.9,0,1.342-1.095.694-1.72l-.568-.548c-.403-.378-.424-1.013-.046-1.416.375-.402,1.008-.421,1.41-.048h0c.011.011,1.771,1.415,1.771,1.415.476.378,1.111.451,1.66.186.548-.264.889-.806.889-1.415v-8.455c0-.294.128-.572.353-.762.228-.193.519-.272.823-.224.462.076.825.556.825,1.093v5.354c0,.417.259.79.649.937l5.404,2.027c1.111.417,1.873,1.45,1.941,2.633.031.532.472.942.998.942.02,0,.039,0,.059-.001.551-.032.972-.505.94-1.057-.115-1.973-1.385-3.696-3.236-4.39Zm2.207-13.23c-.072-.197-.26-.329-.47-.329h-1.5l-.531-1.49c-.073-.196-.26-.325-.469-.325s-.396.13-.469.325l-.531,1.49h-1.5c-.21,0-.397.131-.469.328-.073.197-.014.418.146.553l1.189.967-.47,1.508c-.063.202.007.423.177.55.089.066.194.1.3.1.097,0,.194-.028.278-.084l1.354-.906,1.377.897c.178.115.409.106.578-.023.168-.13.236-.352.169-.553l-.489-1.49,1.183-.964c.161-.135.22-.357.148-.554Zm-6,0c-.072-.197-.26-.329-.47-.329h-1.5l-.531-1.49c-.073-.196-.26-.325-.469-.325s-.396.13-.469.325l-.531,1.49h-1.5c-.21,0-.397.131-.469.328-.073.197-.014.418.146.553l1.446,1.142c.397-.031.8-.016,1.202.05.823.134,1.576.48,2.21.978l-.396-1.205,1.183-.964c.161-.135.22-.357.148-.554Zm-10.898,3.578c.089.066.194.1.3.1.097,0,.194-.028.278-.084l1.354-.906,1.377.897c.178.115.409.106.578-.023.168-.13.236-.352.169-.553l-.489-1.49,1.183-.964c.161-.135.22-.357.148-.554s-.26-.329-.47-.329h-1.5l-.531-1.49c-.073-.196-.26-.325-.469-.325s-.396.13-.469.325l-.531,1.49h-1.5c-.21,0-.397.131-.469.328-.073.197-.014.418.146.553l1.189.967-.47,1.508c-.063.202.007.423.177.55Z" />
        </svg>
        Feedback
      </a>
      <a
        className="menu-item"
        onClick={toggleModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h"
        >
          <path d="
            m50,0
            a50,50,0,0,0,0,100
            a-50,-50,0,0,0,0,-100
            z
            m-8,32
            a8,8,0,0,1,-16,0
            a8,8,0,0,1,16,0
            z
            m32,0
            a8,8,0,0,1,-16,0
            a8,8,0,0,1,16,0
            z
            m-54,30
            h60
            c-5,26,-55,26,-60,0
            z
          " />
        </svg>
        About
      </a>
      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        content={aboutContent || "Loading..."}
      />
      {isSideNoteVisible && (
        <div className="side-note">
          {aboutContent || "Loading..."}
        </div>
      )}
    </Menu>
  );
};

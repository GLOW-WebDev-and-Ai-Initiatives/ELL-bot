import "bootstrap-icons/font/bootstrap-icons.css";
import "./navbar.css";
import { useState } from "react";

import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default () => {
  return (
    <Menu>
      <a className="menu-item" href="https://glowaction.org/about-us/" target="_blank">
        GLOW
      </a>
      <a className="menu-item" href="https://forms.gle/uD49hHnh6PqjjHj1A" target="_blank">
        Feedback
      </a>
    </Menu>
  );
};

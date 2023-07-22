import React from "react";
import styles from "./DarkModeButton.module.css";

const DarkModeButton = ({ changeMode, isLightMode }) => {
  return (
    <div
      className={styles.DarkModeButton}
      style={{
        backgroundColor: isLightMode ? "darkblue" : "white",
      }}
    >
      <i
        class="fa-solid fa-sun"
        style={{
          visibility: isLightMode && "hidden",
        }}
        onClick={changeMode}
      ></i>
      <i
        style={{
          visibility: !isLightMode && "hidden",
          color: "white",
        }}
        class="fa-solid fa-moon"
        onClick={changeMode}
      ></i>
    </div>
  );
};

export default DarkModeButton;

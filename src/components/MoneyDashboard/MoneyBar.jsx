import React from "react";
import barStyles from "../Bar/Bar.module.css";

const MoneyBar = ({ title, amount, date, id, deleteBar }) => {
  return (
    <div
      className={barStyles.BarWrapper}
      style={{ marginTop: "0", marginBottom: "8px" }}
    >
      <div>
        <div
          style={{
            marginBottom: "6px",
            fontWeight: "bold",
            fontSize: "1.15rem",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ opacity: "0.7" }}>
            <i
              className="fa-solid fa-money-bill"
              style={{ marginRight: "8px" }}
            ></i>
            din {amount}
          </div>
          <div style={{ opacity: "0.7" }}>
            <i
              className="fa-solid fa-calendar-days"
              style={{ marginRight: "8px" }}
            ></i>
            {date}
          </div>
        </div>
      </div>

      <div style={{ alignSelf: "flex-end" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#271B63",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => deleteBar(id)}
        >
          <i style={{ color: "white" }} className="fa-solid fa-trash"></i>
        </div>
      </div>
    </div>
  );
};

export default MoneyBar;

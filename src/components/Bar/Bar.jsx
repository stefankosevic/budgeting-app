import React from "react";
import styles from "./Bar.module.css";
import { BALANCE_TYPES } from "../Dashboard/DashboardTab";

const Bar = ({ leftSide, rightSide, type }) => {
  return (
    <div
      className={styles.BarWrapper}
      style={{
        color:
          type === BALANCE_TYPES.INCOME
            ? "green"
            : type === BALANCE_TYPES.EXPENSE
            ? "red "
            : "gray",
      }}
    >
      <div>{leftSide}</div>
      <div>{rightSide}</div>
    </div>
  );
};

export default Bar;

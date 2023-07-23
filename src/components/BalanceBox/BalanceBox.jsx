import React from "react";
import styles from "./BalanceBox.module.css";
import { BALANCE_TYPES } from "../Dashboard/DashboardTab";

const BalanceBox = ({ type, total }) => {
  return (
    <div
      className={styles.BalanceBoxWrapper}
      style={{ margin: type === BALANCE_TYPES.BALANCE && "0 auto" }}
    >
      <div className={styles.BalanceText}>Total {type}</div>
      <div
        className={styles.BalanceCash}
        style={{
          color:
            type === BALANCE_TYPES.BALANCE && total > 0
              ? "#42AD00"
              : type === BALANCE_TYPES.EXPENSE || total < 0
              ? "red"
              : "#42AD00",
        }}
      >
        din {Math.round(total)}
      </div>
    </div>
  );
};

export default BalanceBox;

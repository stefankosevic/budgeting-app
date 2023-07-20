import React from "react";
import styles from "./Dashboard.module.css";
import BalanceBox from "../BalanceBox/BalanceBox";
import Bar from "../Bar/Bar";

export const BALANCE_TYPES = {
  INCOME: "Income",
  EXPENSE: "Expense",
  BALANCE: "Balance",
};

const DashboardTab = ({ tabName }) => {
  return (
    <div
      className={styles.MenuWrapper}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <div className={styles.LeftWrapper}>
        <div style={{ fontSize: "32px", fontWeight: "bold" }}>
          All Transactions
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <div className={styles.BalanceBoxWrapper}>
            <BalanceBox type={BALANCE_TYPES.INCOME} />
            <BalanceBox type={BALANCE_TYPES.EXPENSE} />
          </div>
          <BalanceBox type={BALANCE_TYPES.BALANCE} />
        </div>
      </div>
      <div className={styles.RightWrapper}>
        <div>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            Recent History
          </div>
          <Bar
            leftSide={"Dentist Appointment"}
            rightSide={"-120 din"}
            type={BALANCE_TYPES.EXPENSE}
          />
          <Bar
            leftSide={"Traveling"}
            rightSide={"-3000 din"}
            type={BALANCE_TYPES.EXPENSE}
          />
          <Bar
            leftSide={"From Freelance"}
            rightSide={"+1300 din"}
            type={BALANCE_TYPES.INCOME}
          />
        </div>

        <div style={{ marginTop: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            <div>min</div>
            <div style={{ fontSize: "20px" }}>Salary</div>
            <div>max</div>
          </div>
          <Bar
            leftSide={"din 1200"}
            rightSide={"din 8000"}
            type={BALANCE_TYPES.BALANCE}
          />
        </div>

        <div style={{ marginTop: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            <div>min</div>
            <div style={{ fontSize: "20px" }}>Expense</div>
            <div>max</div>
          </div>
          <Bar
            leftSide={"din 1200"}
            rightSide={"din 8000"}
            type={BALANCE_TYPES.BALANCE}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;

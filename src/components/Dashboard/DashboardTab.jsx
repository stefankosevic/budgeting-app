import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import BalanceBox from "../BalanceBox/BalanceBox";
import Bar from "../Bar/Bar";
import axios from "axios";
import { TABS } from "../../lib/constants/tabs";
import tabStyles from "../MoneyDashboard/MoneyDashboard.module.css";

export const BALANCE_TYPES = {
  INCOME: "Income",
  EXPENSE: "Expense",
  BALANCE: "Balance",
};

const BALANCE_TAB_TYPE = {
  [TABS.MONTHLY_EXPENSE]: BALANCE_TYPES.EXPENSE,
  [TABS.ONE_TIME_EXPENSE]: BALANCE_TYPES.EXPENSE,
  [TABS.MONTHLY_INCOME]: BALANCE_TYPES.INCOME,
  [TABS.ONE_TIME_INCOME]: BALANCE_TYPES.INCOME,
};

const DashboardTab = ({ setActiveTab, total, incomeExpense }) => {
  const [recentBalances, setRecentBalances] = useState([]);
  const [totalMinMax, setTotalMinMax] = useState({});

  useEffect(() => {
    const getRecentBalances = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/user/api/balance/recent"
      );
      setRecentBalances(data.data);
    };
    getRecentBalances();
  }, []);

  useEffect(() => {
    let minIncome = 0;
    let maxIncome = 0;
    let minExpense = 0;
    let maxExpense = 0;

    incomeExpense.incomes?.forEach((income) => {
      if (income.type === TABS.MONTHLY_INCOME) minIncome += +income.amount;
      if (income.type === TABS.ONE_TIME_INCOME) maxIncome += +income.amount;
    });
    maxIncome += minIncome;

    incomeExpense.expenses?.forEach((expense) => {
      if (expense.type === TABS.MONTHLY_EXPENSE) minExpense += +expense.amount;
      if (expense.type === TABS.ONE_TIME_EXPENSE) maxExpense += +expense.amount;
    });
    maxExpense += minExpense;

    setTotalMinMax({
      minIncome,
      maxIncome,
      minExpense,
      maxExpense,
    });
  }, [incomeExpense]);

  return (
    <div
      className={`${styles.MenuWrapper} ${styles.ColumnWrapper}`}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <div className={tabStyles.BackButton} onClick={() => setActiveTab("")}>
        <i
          className="fa-solid fa-circle-arrow-left"
          style={{ fontSize: "1.8rem" }}
        ></i>
      </div>
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
            <BalanceBox type={BALANCE_TYPES.INCOME} total={total.totalIncome} />
            <BalanceBox
              type={BALANCE_TYPES.EXPENSE}
              total={total.totalExpense}
            />
          </div>
          <BalanceBox type={BALANCE_TYPES.BALANCE} total={total.balance} />
        </div>
      </div>
      <div className={styles.RightWrapper}>
        <div>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            Recent History
          </div>
          {recentBalances.map((recent) => (
            <Bar
              leftSide={recent.title}
              rightSide={recent.amount}
              type={BALANCE_TAB_TYPE[recent.type]}
            />
          ))}
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
            leftSide={`din ${totalMinMax.minIncome}`}
            rightSide={`din ${totalMinMax.maxIncome}`}
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
            leftSide={`din ${totalMinMax.minExpense}`}
            rightSide={`din ${totalMinMax.maxExpense}`}
            type={BALANCE_TYPES.BALANCE}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;

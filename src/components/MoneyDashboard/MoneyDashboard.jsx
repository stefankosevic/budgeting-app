import React, { useEffect, useState } from "react";
import styles from "./MoneyDashboard.module.css";
import barStyles from "../Bar/Bar.module.css";
import dashboardStyles from "../Dashboard/Dashboard.module.css";
import FormMoney from "./FormMoney";
import { TABS } from "../../lib/constants/tabs";
import MoneyBar from "./MoneyBar";
import axios from "axios";
const dashboardTitle = {
  [TABS.MONTHLY_INCOME]: "Monthly income",
  [TABS.MONTHLY_EXPENSE]: "Monthly expense",
  [TABS.ONE_TIME_EXPENSE]: "One time expense",
  [TABS.ONE_TIME_INCOME]: "One time income",
};

const MoneyDashboard = ({ tabName }) => {
  const [bars, setBars] = useState([]);

  const addBar = async (newBar) => {
    setBars([...bars, newBar]);

    const { data } = await axios.post(
      process.env.REACT_APP_API_URL + "/user/api/balance",
      newBar
    );
    console.log(data);
  };

  const deleteBar = (barId) => {
    const oldBars = [...bars];
    const newBars = oldBars.filter((bar) => bar.id !== barId);
    setBars([...newBars]);
  };

  useEffect(() => {
    const getBalances = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/user/api/balance",
        {
          params: {
            id: localStorage.getItem("userId"),
            tabName: tabName,
          },
        }
      );
      console.log(data);
      setBars(data.data);
    };

    getBalances();
  }, [tabName]);

  return (
    <div
      className={`${styles.Wrapper} ${dashboardStyles.MenuWrapper}`}
      style={{ justifyContent: "flex-start", gap: 0 }}
    >
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        {dashboardTitle[tabName]}
      </div>
      <div
        className={barStyles.BarWrapper}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Total {dashboardTitle[tabName]?.toLowerCase()}:
        <span style={{ color: "green", marginLeft: "4px" }}> din 16500</span>
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "16px" }}>
        <div style={{ width: "40%" }}>
          <FormMoney
            type={dashboardTitle[tabName]}
            tabName={tabName}
            addBar={addBar}
          />
        </div>
        {bars.length ? (
          <div style={{ width: "100%" }}>
            {bars.map((bar) => (
              <MoneyBar
                key={bar.id + `${Math.random()}`}
                {...bar}
                deleteBar={deleteBar}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MoneyDashboard;

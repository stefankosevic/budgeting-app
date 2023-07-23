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

const MoneyDashboard = ({ tabName, setActiveTab }) => {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(false);

  const addBar = async (newBar) => {
    setBars([...bars, newBar]);

    await axios.post(
      process.env.REACT_APP_API_URL + "/user/api/balance",
      newBar
    );
  };

  const deleteBar = async (barId) => {
    const oldBars = [...bars];
    const newBars = oldBars.filter((bar) => bar._id !== barId);
    await axios.post(
      process.env.REACT_APP_API_URL + "/user/api/balance/delete",
      {
        id: barId,
      }
    );
    setBars([...newBars]);
  };

  useEffect(() => {
    const getBalances = async () => {
      setLoading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/user/api/balance",
        {
          params: {
            id: localStorage.getItem("userId"),
            tabName: tabName,
          },
        }
      );

      setBars(data.data);
      setLoading(false);
    };

    getBalances();
  }, [tabName]);

  const getTotal = () => {
    let result = 0;
    bars.forEach((bar) => (result += Number(bar.amount)));
    return result;
  };

  return (
    <div
      className={`${styles.Wrapper} ${dashboardStyles.MenuWrapper}`}
      style={{ justifyContent: "flex-start", gap: 0 }}
    >
      <div className={styles.BackButton} onClick={() => setActiveTab("")}>
        <i
          className="fa-solid fa-circle-arrow-left"
          style={{ fontSize: "1.8rem" }}
        ></i>
      </div>
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
        <span
          style={{
            color: dashboardTitle[tabName].toLowerCase().includes("expense")
              ? "red"
              : "green",
            marginLeft: "4px",
          }}
        >
          {!loading ? `din ${getTotal()}` : ""}
        </span>
      </div>
      <div className={styles.ColumnWrapper}>
        <div style={{ width: "40%" }} className={styles.FormWrapper}>
          <FormMoney
            type={dashboardTitle[tabName]}
            tabName={tabName}
            addBar={addBar}
          />
        </div>
        {bars.length && !loading ? (
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
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default MoneyDashboard;

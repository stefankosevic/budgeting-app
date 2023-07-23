import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import DashboardTab from "./DashboardTab";
import MoneyDashboard from "../MoneyDashboard/MoneyDashboard";
import { TABS } from "../../lib/constants/tabs";
import axios from "axios";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import { useWindowSize } from "@uidotdev/usehooks";
import Menu from "../Menu/Menu";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);
  const [money, setMoney] = useState({});
  const [total, setTotal] = useState([]);
  const [isLightMode, setIsLightMode] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    if (!localStorage.getItem("userId")) return navigate("/");
  }, [navigate]);

  useEffect(() => {
    const getAllBalances = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/user/api/balance/all",
        {
          params: {
            userId: localStorage.getItem("userId"),
          },
        }
      );
      let totalIncome = 0;
      let totalExpense = 0;

      data.data.incomes.forEach(
        (income) => (totalIncome += Number(income.amount))
      );
      data.data.expenses.forEach(
        (expense) => (totalExpense += Number(expense.amount))
      );

      setMoney({
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
      });
      setTotal(data.data);
    };
    getAllBalances();
  }, [activeTab]);

  const changeMode = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <div
      className={styles.DashboardWrapper}
      style={{
        background: !isLightMode
          ? "linear-gradient(to right, #d9a7c7, #fffcdc)"
          : "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      }}
    >
      <DarkModeButton isLightMode={isLightMode} changeMode={changeMode} />
      <div className={styles.Container}>
        {size.width > 800 && (
          <Menu activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {activeTab === TABS.DASHBOARD ? (
          <DashboardTab
            tabName={activeTab}
            total={money}
            incomeExpense={total}
            setActiveTab={setActiveTab}
          />
        ) : activeTab !== TABS.DASHBOARD && activeTab ? (
          <MoneyDashboard tabName={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <Menu activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

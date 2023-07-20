import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import DashboardTab from "./DashboardTab";

const TABS = {
  DASHBOARD: "Dashboard",
  INCOMES: "Incomes",
  EXPENSES: "Expenses",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);

  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("userId")) return navigate("/");
  });

  return (
    <div className={styles.DashboardWrapper}>
      <div className={styles.Container}>
        <div className={styles.MenuWrapper}>
          <div className={styles.AvatarWrapper}>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div className={styles.ProfilePhoto} />
              <div className={styles.NameWrapper}>
                <div className={styles.Name}>
                  {localStorage.getItem("name")}
                </div>
                <div className={styles.YourMoney}>Your money</div>
              </div>
            </div>

            <ul>
              <li
                className={`${styles.MenuItem} ${
                  activeTab === TABS.DASHBOARD && styles.MenuItemActive
                }`}
                onClick={() => setActiveTab(TABS.DASHBOARD)}
              >
                {activeTab === TABS.DASHBOARD && (
                  <div className={styles.ActiveBar} />
                )}
                <i class="fa-solid fa-chart-line"></i>
                <div className={styles.MenuItemText}>{TABS.DASHBOARD}</div>
              </li>
              <li
                className={`${styles.MenuItem} ${
                  activeTab === TABS.INCOMES && styles.MenuItemActive
                }`}
                onClick={() => setActiveTab(TABS.INCOMES)}
              >
                {activeTab === TABS.INCOMES && (
                  <div className={styles.ActiveBar} />
                )}
                <i class="fa-solid fa-money-bill-trend-up"></i>
                <div className={styles.MenuItemText}>{TABS.INCOMES}</div>
              </li>
              <li
                className={`${styles.MenuItem} ${
                  activeTab === TABS.EXPENSES && styles.MenuItemActive
                }`}
                onClick={() => setActiveTab(TABS.EXPENSES)}
              >
                {activeTab === TABS.EXPENSES && (
                  <div className={styles.ActiveBar} />
                )}
                <i class="fa-solid fa-money-bill-transfer"></i>
                <div className={styles.MenuItemText}>{TABS.EXPENSES}</div>
              </li>
            </ul>
          </div>

          <div className={styles.MenuItem} style={{ justifySelf: "flex-end" }}>
            <i class="fa-solid fa-right-from-bracket"></i>
            <div className={styles.MenuItemText} onClick={logout}>
              Logout
            </div>
          </div>
        </div>

        <DashboardTab tabName={activeTab} />
      </div>
    </div>
  );
};

export default Dashboard;

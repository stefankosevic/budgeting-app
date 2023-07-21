import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import DashboardTab from "./DashboardTab";
import MoneyDashboard from "../MoneyDashboard/MoneyDashboard";
import { TABS } from "../../lib/constants/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);
  const [incomeDropdownOpen, setIncomeDropdownOpen] = useState(false);
  const [expenseDropdownOpen, setExpenseDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  const toggleIncomeDropdown = (tab) => {
    setIncomeDropdownOpen(!incomeDropdownOpen);
  };

  const toggleExpenseDropdown = (tab) => {
    setExpenseDropdownOpen(!expenseDropdownOpen);
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
                <i className="fa-solid fa-chart-line"></i>
                <div className={styles.MenuItemText}>{TABS.DASHBOARD}</div>
              </li>
              <li
                className={`${styles.MenuItem} ${
                  (activeTab === TABS.MONTHLY_INCOME ||
                    activeTab === TABS.ONE_TIME_INCOME) &&
                  styles.MenuItemActive
                }`}
              >
                {(activeTab === TABS.MONTHLY_INCOME ||
                  activeTab === TABS.ONE_TIME_INCOME) && (
                  <div className={styles.ActiveBar} />
                )}
                <i
                  style={{ alignSelf: "flex-start", marginTop: "5px" }}
                  className="fa-solid fa-money-bill-trend-up"
                ></i>
                <div className={styles.MenuItemText}>
                  <span onClick={() => toggleIncomeDropdown(TABS.INCOMES)}>
                    Income
                  </span>
                  {incomeDropdownOpen && (
                    <>
                      <div
                        onClick={() => setActiveTab(TABS.MONTHLY_INCOME)}
                        style={{
                          color:
                            activeTab === TABS.MONTHLY_INCOME
                              ? "black"
                              : "rgba(34, 34, 96, 0.6)",
                        }}
                      >
                        <i
                          style={{
                            marginRight: "8px",
                          }}
                          class="fa-regular fa-circle-dot"
                        ></i>
                        Monthly
                      </div>
                      <div
                        onClick={() => setActiveTab(TABS.ONE_TIME_INCOME)}
                        style={{
                          color:
                            activeTab === TABS.ONE_TIME_INCOME
                              ? "black"
                              : "rgba(34, 34, 96, 0.6)",
                        }}
                      >
                        <i
                          style={{ marginRight: "8px" }}
                          class="fa-regular fa-circle-dot"
                        ></i>
                        One time
                      </div>
                    </>
                  )}
                </div>

                <div></div>
              </li>
              <li
                className={`${styles.MenuItem} ${
                  (activeTab === TABS.MONTHLY_EXPENSE ||
                    activeTab === TABS.ONE_TIME_EXPENSE) &&
                  styles.MenuItemActive
                }`}
              >
                {(activeTab === TABS.MONTHLY_EXPENSE ||
                  activeTab === TABS.ONE_TIME_EXPENSE) && (
                  <div className={styles.ActiveBar} />
                )}
                <i
                  style={{ alignSelf: "flex-start", marginTop: "5px" }}
                  className="fa-solid fa-money-bill-transfer"
                ></i>
                <div className={styles.MenuItemText}>
                  <span onClick={() => toggleExpenseDropdown(TABS.EXPENSES)}>
                    Expenses
                  </span>
                  {expenseDropdownOpen && (
                    <>
                      <div
                        onClick={() => setActiveTab(TABS.MONTHLY_EXPENSE)}
                        style={{
                          color:
                            activeTab === TABS.MONTHLY_EXPENSE
                              ? "black"
                              : "rgba(34, 34, 96, 0.6)",
                        }}
                      >
                        <i
                          style={{ marginRight: "8px" }}
                          class="fa-regular fa-circle-dot"
                        ></i>
                        Monthly
                      </div>
                      <div
                        onClick={() => setActiveTab(TABS.ONE_TIME_EXPENSE)}
                        style={{
                          color:
                            activeTab === TABS.ONE_TIME_EXPENSE
                              ? "black"
                              : "rgba(34, 34, 96, 0.6)",
                        }}
                      >
                        <i
                          style={{ marginRight: "8px" }}
                          class="fa-regular fa-circle-dot"
                        ></i>
                        One time
                      </div>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.MenuItem} style={{ justifySelf: "flex-end" }}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <div className={styles.MenuItemText} onClick={logout}>
              Logout
            </div>
          </div>
        </div>

        {activeTab === TABS.DASHBOARD ? (
          <DashboardTab tabName={activeTab} />
        ) : (
          <MoneyDashboard tabName={activeTab} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userId")) return navigate("/");
  });

  return (
    <div>
      <div
        onClick={() => {
          localStorage.removeItem("userId");
          navigate("/");
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        localStorage.removeItem("userId");
        navigate("/");
      }}
    >
      Logout
    </div>
  );
};

export default Logout;

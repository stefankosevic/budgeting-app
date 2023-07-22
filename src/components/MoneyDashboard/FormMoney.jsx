import { Button, TextField } from "@mui/material";
import loginStyles from "../Login/Login.module.css";
import React, { useState } from "react";

const FormMoney = ({ type, addBar, tabName }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [hasError, setHasError] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (title.length < 5 || amount <= 0 || date.length < 8) {
      setHasError(true);
      return;
    }

    addBar({
      title: title,
      amount: amount,
      date: date,
      userId: localStorage.getItem("userId"),
      type: tabName,
      timestamp: new Date(),
    });
  };

  return (
    <form onSubmit={submitForm}>
      <TextField
        id={type}
        label={`${type} title`}
        variant="outlined"
        className={loginStyles.Input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={hasError && title.length < 5}
      />
      <TextField
        id={`${type} amount`}
        label={`${type} amount`}
        variant="outlined"
        className={loginStyles.Input}
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        error={hasError && amount <= 0}
      />
      <TextField
        id={`${type} date`}
        label="Enter a date"
        variant="outlined"
        className={loginStyles.Input}
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        error={hasError && date.length < 8}
      />
      <Button
        variant="outlined"
        className={loginStyles.LoginButton}
        type="submit"
      >
        Add
      </Button>
    </form>
  );
};

export default FormMoney;

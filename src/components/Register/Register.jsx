import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./Register.module.css";
import { validateEmail } from "../../lib/helpers/validateEmail";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ changeActiveTab }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    if (password.length < 5 || fullName.length < 3 || !validateEmail(email)) {
      setHasError(true);
      return;
    }

    const { data } = await axios.post("http://localhost:5001/user/api", {
      ime: fullName,
      email: email,
      password: password,
    });

    // TODO: Jos malo
    if (data.success === true) {
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.Wrapper}>
      <form className={styles.Container} onSubmit={onRegisterHandler}>
        <TextField
          id="name"
          label="Full name"
          variant="outlined"
          className={styles.Input}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={hasError && fullName.length < 3}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          className={styles.Input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={hasError && !validateEmail(email)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          className={styles.Input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={hasError && password.length < 5}
        />
        <div className={styles.ButtonsWrapper}>
          <Button
            variant="outlined"
            className={styles.LoginButton}
            type="submit"
          >
            Register
          </Button>
          <div className={styles.RegisterText}>
            Already have an account?{" "}
            <span className={styles.RegisterNow} onClick={changeActiveTab}>
              Login now
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

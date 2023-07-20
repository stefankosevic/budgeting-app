import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { validateEmail } from "../../lib/helpers/validateEmail";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ changeActiveTab, client }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loginInvalid, setLoginInvalid] = useState(false);
  const navigate = useNavigate();

  const onLoginHandler = async (e) => {
    e.preventDefault();
    if (password.length < 5 || !validateEmail(email)) {
      setHasError(true);
      return;
    }

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_API_URL + "/user/api/login",
        {
          email: email,
          password: password,
        }
      );

      localStorage.setItem("userId", data.data._id);
      localStorage.setItem("name", data.data.ime);

      console.log(data);
      if (data.success) {
        navigate("/dashboard");
        return;
      }
    } catch (e) {
      setLoginInvalid(true);
    }
  };

  return (
    <div className={styles.Wrapper}>
      <form className={styles.Container} onSubmit={onLoginHandler}>
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
        {loginInvalid ? (
          <div className={styles.LoginInvalid}>Pogresno uneti podaci</div>
        ) : null}
        <div className={styles.ButtonsWrapper}>
          <Button
            variant="outlined"
            className={styles.LoginButton}
            type="submit"
          >
            Login
          </Button>
          <div className={styles.RegisterText}>
            Don't have an account yet?{" "}
            <span className={styles.RegisterNow} onClick={changeActiveTab}>
              Register now
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

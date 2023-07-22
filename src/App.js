import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) return navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="App">
      {isLogin && !localStorage.getItem("userId") ? (
        <Login changeActiveTab={() => setIsLogin(false)} />
      ) : (
        <Register changeActiveTab={() => setIsLogin(true)} />
      )}
      {/* {localStorage.getItem("userId") ? <Dashboard /> : null} */}
    </div>
  );
}

export default App;

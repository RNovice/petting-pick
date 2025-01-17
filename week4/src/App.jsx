import { useState, useEffect } from "react";
import axios from "axios";
import ProductEditor from "./pages/ProductBackOffice";
import Login from "./pages/Login";

const { VITE_API_BASE: API_BASE } = import.meta.env;

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];
        if (token === undefined) return;
        axios.defaults.headers.common.Authorization = token;
        const {
          data: { success },
        } = await axios.post(`${API_BASE}/api/user/check`);
        setIsLogin(success);
      } catch (err) {
        console.error(err);
      }
    }
    checkLogin();
  }, []);

  return (
    <>
      {isLogin ? (
        <ProductEditor setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </>
  );
}

export default App;

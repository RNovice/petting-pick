import { useState, useEffect } from "react";
import axios from "axios";

const env = import.meta.env;
const { VITE_API_BASE: API_BASE, VITE_API_PATH: API_PATH } = env;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    username: env.VITE_USERNAME || "",
    password: env.VITE_PASSWORD || "",
  });
  const [products, setProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);

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
        if (success) getProducts();
      } catch (err) {
        console.error(err);
      }
    }
    checkLogin();
  }, []);

  function handleLoginFormInput(e) {
    const { name, value } = e.target;
    setLoginFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/admin/signin`, loginFormData);
      const { token, expired } = res.data;
      document.cookie = `authToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common.Authorization = token;
      getProducts();
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      alert("Login Fail: \n" + err);
    }
  }

  async function handleLogout() {
    try {
      const { status } = await axios.post(`${API_BASE}/logout`);
      if (status === 200) {
        document.cookie = "authToken; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        setIsLogin(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getProducts() {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {isLogin ? (
        <div className="container">
          <button className="btn btn-danger mt-4" onClick={handleLogout}>
            {" "}
            Logout{" "}
          </button>
          <div className="row mt-3">
            Edit products
          </div>
        </div>
      ) : (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div
            className="card p-4 shadow"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Email address
                </label>
                <input
                  id="username"
                  name="username"
                  type="email"
                  required={true}
                  className="form-control"
                  placeholder="Enter your email"
                  value={loginFormData.username}
                  onInput={handleLoginFormInput}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required={true}
                  className="form-control"
                  placeholder="Enter your password"
                  value={loginFormData.password}
                  onInput={handleLoginFormInput}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <a href="https://ec-course-api.hexschool.io/" target="_blank">
                Register here
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

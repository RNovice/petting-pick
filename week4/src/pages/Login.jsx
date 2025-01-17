import { useState, useEffect } from "react";
import axios from "axios";

const env = import.meta.env;
const { VITE_API_BASE: API_BASE } = env;

const Login = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({
    username: env.VITE_USERNAME || "",
    password: env.VITE_PASSWORD || "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = res.data;
      document.cookie = `authToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common.Authorization = token;
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      alert("Login Fail: \n" + err);
    }
  }

  return (
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
              value={formData.username}
              onInput={handleInput}
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
              value={formData.password}
              onInput={handleInput}
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
  );
};

export default Login;

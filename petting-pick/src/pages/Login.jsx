import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "@/slice/authSlice";
import { Link } from "react-router-dom";
import { startLoading, stopLoading } from "@/slice/loadingSlice";

const env = import.meta.env;

const Login = () => {
  const [formData, setFormData] = useState({
    username: env.VITE_USERNAME || "",
    password: env.VITE_PASSWORD || "",
  });
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    status === "checking"
      ? dispatch(
          startLoading({
            text: "Checking Authentication",
            color: "#aaa",
            bgColor: "#fff",
          })
        )
      : dispatch(stopLoading());
    return () => {
      dispatch(stopLoading());
    };
  }, [status, dispatch]);

  function handleInput(e) {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(loginAdmin(formData));
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
          {["loading", "checking"].includes(status) ? (
            <button
              disabled
              type="submit"
              className="loading-text btn btn-primary w-100"
            >
              {status === "loading" ? "Logging in" : "Checking login"}
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          )}
        </form>
        <p className="text-center mt-3">
          Go back to home page? <Link to="/">Click here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

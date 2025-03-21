import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoSvg from "@/assets/images/logo.svg";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 30000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center user-select-none">
      <div>
        <h1 className="display-3 text-danger d-flex justify-content-center align-items-center gap-3">
          404 <img src={LogoSvg} alt="Site Logo" style={{ width: "50px" }} />
        </h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted">
          The page you are looking for does not exist.
          <br />
          Redirected to the homepage in 30 seconds.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

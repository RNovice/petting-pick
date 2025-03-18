import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children }) => {
  const { status } = useSelector((state) => state.auth);
  const location = useLocation();

  return status === "logged-in" ? (
    <Navigate to={location.state?.prevPath?.startsWith("/admin") ? location.state.prevPath : "/admin"} replace />
  ) : (
    children
  );
};

export default AuthWrapper;

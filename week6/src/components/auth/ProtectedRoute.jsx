import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { status } = useSelector((state) => state.auth);
  const location = useLocation();

  return status !== "logged-in" ? (
    <Navigate to="/login" state={{ prevPath: location.pathname }} replace />
  ) : (
    children
  );
};

export default ProtectedRoute;

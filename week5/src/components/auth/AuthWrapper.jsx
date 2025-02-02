import { Navigate } from "react-router-dom";

const AuthWrapper = ({ children, isAuth, to }) => {
  if (isAuth) {
    return <Navigate to={to} replace />;
  }
  return <>{children}</>;
};

export default AuthWrapper;

import AuthController from "@/controllers/authController";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const session = AuthController.getSession();
  const user = session?.user;
  const location = useLocation();

  if (user && location.pathname === "/register") {
    return <Navigate to="/" replace />;
  }

  if (location.pathname.startsWith("/admin")) {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    if (user.role !== "admin") {
      return <Navigate to="/" replace />;
    }
  }
  if (location.pathname.startsWith("/shop/account") && !user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
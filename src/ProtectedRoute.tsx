import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { name } = useUser();

  if (!name) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;

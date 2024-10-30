import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthProvider";

const ProtectedRouteUser = (props) => {
  const auth = useAuth();
  const { token } = auth;
  const navigate = useNavigate();

  if (!token) {
    auth.logOut();
    return <Navigate to="/home" />;
  }

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    if (
      token &&
      (decodedToken.role !== "admin" && decodedToken.role !== "user")
    ) {
      navigate("/home");
    }
  }, [token && decodedToken.role !== "admin" && decodedToken.role !== "user"]);

  return <Outlet {...props} />;
};

export default ProtectedRouteUser;

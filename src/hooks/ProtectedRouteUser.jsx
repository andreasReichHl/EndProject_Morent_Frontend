import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthProvider";

const ProtectedRouteUser = (props) => {
  const auth = useAuth();
  const { token } = auth;
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!token) {
      auth.logout();
      navigate("/login");
    }
  }, [token, auth, navigate]);

  return token ? (
    <Outlet {...props} />
  ) : (
    <span className="loading loading-spinner loading-lg"></span>
  );
};

export default ProtectedRouteUser;

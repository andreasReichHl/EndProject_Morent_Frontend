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
    /* try {
      const decodedToken = jwtDecode(token);
      if (
        decodedToken.scope !== "Admin" &&
        decodedToken.scope !== "Manager" &&
        decodedToken.scope !== "Accountant" &&
        
      ) {
        navigate("/");
      }
    } catch (error) {
      console.error("Token decoding failed: ", error);
      auth.logout();
      navigate("/");
    } */
  }, [token, auth, navigate]);

  return token ? (
    <Outlet {...props} />
  ) : (
    <span className="loading loading-spinner loading-lg"></span>
  );
};

export default ProtectedRouteUser;

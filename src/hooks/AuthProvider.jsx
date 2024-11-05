import { createContext, useContext, useState, useEffect } from "react";

// AuthContext erstellen
const AuthContext = createContext();

// AuthProvider Komponente
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  const login = (receivedToken) => {
    sessionStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      fetch(import.meta.env.VITE_BACKEND + "/api/v1/protectRoute", {
        headers: {
          Authorization: "Bearer " + storedToken,
        },
      }).then((response) => {
        if (!response.ok) {
          logout();
        }
          console.log("accepted")
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth Hook erstellen
const useAuth = () => {
  return useContext(AuthContext);
};

// Exportiere AuthProvider und AuthContext
export { AuthProvider, AuthContext, useAuth };

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ConfirmRegistrationCode from "./pages/ConfirmRegistrationCode.jsx";
import AuthProvider from "./hooks/AuthProvider.jsx";
import ProtectedRouteAdmin from "./hooks/ProtectedRouteAdmin.jsx";
import AdminPageTest from "./pages/AdminPageTest.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/confirm-code",
        element: <ConfirmRegistrationCode />,
      },
      {
        path: "/admin-overview",
        element: <ProtectedRouteAdmin element={<AdminPageTest/>} />
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

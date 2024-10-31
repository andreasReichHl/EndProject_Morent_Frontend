import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./AdminLayout.jsx";
import App from "./App.jsx";
import AuthProvider from "./hooks/AuthProvider.jsx";
import "./index.css";
import Layout from "./Layout.jsx";
import BookingsPage from "./pages/adminPanel/BookingsPage.jsx";
import StoresPage from "./pages/adminPanel/StoresPage.jsx";
import UsersPage from "./pages/adminPanel/UsersPage.jsx";
import VehiclesPage from "./pages/adminPanel/VehiclesPage.jsx";
import ConfirmRegistrationCode from "./pages/ConfirmRegistrationCode.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <App />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "confirm-code",
        element: <ConfirmRegistrationCode />,
      },
    ],
  },
  {
    path: "/admin-panel",
    element: <AdminLayout />,
    //element: <ProtectedRouteAdmin element={<AdminPanel/>} />
    children: [
      {
        path: "stores",
        element: <StoresPage />,
      },
      {
        path: "vehicles",
        element: <VehiclesPage />,
      },
      {
        path: "bookings",
        element: <BookingsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
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

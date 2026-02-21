import ProtectedRoute from "./ProtectedRoute";
import { USER_ROLE } from "../constants/role";

import Register from "../pages/auth/Register";
import Home from "../pages/Home/Home";
import FormAndSubmission from "../components/FormAndSubmission/FormAndSubmission";
import Team from "../pages/Team/Team";
import TeamRegistrationPage from "../pages/Team/TeamRegistration";
import ViewSubmission from "../pages/admin/ViewSubmission";
import AddTask from "../pages/admin/AddTask";
import NotFound from "../pages/404/NotFound";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import ContactUs from "../pages/ContactUs/ContactUs";
import Login from "../pages/auth/Login";
import Credits from "../pages/Home/Credits";

export const routesConfig = [
  // General
  { path: "/", element: <Home /> },
  { path: "/credits", element: <Credits />},

  // Auth
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact-us", element: <ContactUs /> },

  // User routes
  {
    path: "/tasks",
    element: (
      <ProtectedRoute role={USER_ROLE.user}>
        <FormAndSubmission />
      </ProtectedRoute>
    ),
  },
  {
    path: "/team",
    element: (
      <ProtectedRoute role={USER_ROLE.user}>
        <Team />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register-team",
    element: (
      <ProtectedRoute role={USER_ROLE.user}>
        <TeamRegistrationPage />
      </ProtectedRoute>
    ),
  },

  // Admin routes
  {
    path: "/admin/view-submission",
    element: (
      <ProtectedRoute role={USER_ROLE.admin}>
        <ViewSubmission />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/add-task",
    element: (
      <ProtectedRoute role={USER_ROLE.admin}>
        <AddTask />
      </ProtectedRoute>
    ),
  },

  {
    path: "/leaderboard",
    element: (
      <ProtectedRoute role={USER_ROLE.admin}>
        <Leaderboard />
      </ProtectedRoute>
    ),
  },
  // Catch-all 404
  {
    path: "*",
    element: <NotFound />,
  },
];

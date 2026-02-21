import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";

import "./App.css";
import "./tailwind.css";

import { routesConfig } from "./routes";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {routesConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Analytics />
      </Layout>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;

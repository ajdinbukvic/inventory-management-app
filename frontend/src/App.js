//import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Employees from "./pages/Employees";
import ManageEmployee from "./pages/ManageEmployee";
import Supplies from "./pages/Supplies";
import ManageSupply from "./pages/ManageSupply";
import Suppliers from "./pages/Suppliers";
import PageNotFound from "./pages/PageNotFound";
import ManageSupplier from "./pages/ManageSupplier";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./components/ProtectedRoute";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Home />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <Sidebar>
                <ChangePassword />
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Layout>
                  <Employees />
                </Layout>
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Layout>
                  <ManageEmployee />
                </Layout>
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-employee/:id"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Layout>
                  <ManageEmployee />
                </Layout>
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplies"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Layout>
                  <Supplies />
                </Layout>
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-supply"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Layout>
                  <ManageSupply />
                </Layout>
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-supply/:id"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Layout>
                  <ManageSupply />
                </Layout>
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Layout>
                  <Suppliers />
                </Layout>
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-supplier"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Layout>
                  <ManageSupplier />
                </Layout>
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-supplier/:id"
          element={
            <ProtectedRoute>
              <Sidebar>
                <Layout>
                  <ManageSupplier />
                </Layout>
              </Sidebar>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

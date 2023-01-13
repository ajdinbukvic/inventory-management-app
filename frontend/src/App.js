//import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ChangePassword from "./pages/ChangePassword";
import Employees from "./pages/Employees";
import ManageEmployee from "./pages/ManageEmployee";
import Supplies from "./pages/Supplies";
import ManageSupply from "./pages/ManageSupply";
import Suppliers from "./pages/Suppliers";
import ManageSupplier from "./pages/ManageSupplier";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// import { getLoginStatus } from "./services/authService";
// import { SET_LOGIN } from "./helpers/auth";
import { ProtectedRoute } from "./components/ProtectedRoute";

axios.defaults.withCredentials = true;

function App() {
  //const dispatch = useDispatch();
  //const isLoggedIn = useSelector(selectIsLoggedIn);
  // useEffect(() => {
  //   async function loginStatus() {
  //     const status = await getLoginStatus();
  //     dispatch(SET_LOGIN(status));
  //   }
  //   loginStatus();
  // }, [dispatch]);
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
                <Layout>
                  <ChangePassword />
                </Layout>
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
          path="/manage-employee"
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
          path="/manage-supply"
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
          path="/manage-supplier"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

// Login
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}auth/login`, formData);
    if (response.statusText === "OK") {
      toast.success("Login Successful...", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

// Logout
export const logoutUser = async () => {
  try {
    await axios.get(`${BASE_URL}auth/logout`);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Login Status
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}auth/isLoggedIn`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

// Change Password
export const changePassword = async (formData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}auth/changePassword`,
      formData
    );
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

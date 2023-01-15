import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}employees`);
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

export const getEmployee = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}employees/${id}`);
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

export const createEmployee = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}employees`, formData);
    if (response.statusText === "OK") {
      toast.success("Uspješno ste dodali novog zaposlenika!", {
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

export const updateEmployee = async (id, formData) => {
  try {
    const response = await axios.patch(`${BASE_URL}employees/${id}`, formData);
    if (response.statusText === "OK") {
      toast.success("Uspješno ste ažurirali podatke o zaposleniku!", {
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

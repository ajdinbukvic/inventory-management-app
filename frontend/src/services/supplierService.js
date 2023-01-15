import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllSuppliers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}suppliers`);
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

export const getSupplier = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}suppliers/${id}`);
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

export const createSupplier = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}suppliers`, formData);
    if (response.statusText === "OK") {
      toast.success("Uspješno ste dodali novog dobavljača!", {
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

export const updateSupplier = async (id, formData) => {
  try {
    const response = await axios.patch(`${BASE_URL}suppliers/${id}`, formData);
    if (response.statusText === "OK") {
      toast.success("Uspješno ste ažurirali podatke o dobavljaču!", {
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

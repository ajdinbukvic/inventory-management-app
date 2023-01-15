import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllSupplies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}supplies`);
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

export const getSupply = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}supplies/${id}`);
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

export const createSupply = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}supplies`, formData);
    if (response.statusText === "Created") {
      toast.success("Uspješno ste dodali novu sirovinu!", {
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

export const updateSupply = async (id, formData) => {
  try {
    const response = await axios.patch(`${BASE_URL}supplies/${id}`, formData);
    if (response.statusText === "OK") {
      toast.success("Uspješno ste ažurirali podatke o sirovini!", {
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

export const deleteSupply = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}supplies/${id}`);
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

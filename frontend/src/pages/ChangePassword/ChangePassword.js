import React, { useState } from "react";
import "./ChangePassword.css";
import { toast } from "react-toastify";
import { changePassword } from "../../services/authService";
import Card from "../../components/card/Card";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const initialState = {
  currentPassword: "",
  password: "",
  passwordConfirm: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { currentPassword, password, passwordConfirm } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();

    const formData = {
      currentPassword,
      password,
      passwordConfirm,
    };

    const data = await changePassword(formData);
    if (data) {
      toast.success("Uspješno ste promijenili lozinku!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/");
    }
  };

  return (
    <div>
      <Header />
      <div
        style={{ minHeight: "80vh", position: "relative" }}
        className="--pad"
      >
        <div className="change-password">
          <Card cardClass={"password-card"}>
            <h3>Promjena lozinke</h3>
            <form onSubmit={changePass} className="--form-control change-form">
              <input
                type="password"
                placeholder="Trenutna lozinka"
                required
                name="currentPassword"
                value={currentPassword}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Nova lozinka"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Potvrda nove lozinke"
                required
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-primary">
                Spremi promjene
              </button>
            </form>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePassword;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/employeeService";
import Card from "../components/card/Card";
import "./Manage.css";

const ManageEmployee = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    if (!isAddMode) {
      const fetchData = async () => {
        const result = await getEmployee(id);
        result.data.data.employmentDate = result.data.data.employmentDate
          .split("-")
          .reverse()
          .join("-");
        setEmployee(result.data.data);
      };
      fetchData();
    }
  }, [id, isAddMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
    else if (name === "passwordConfirm") setPasswordConfirm(value);
    else setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    const data = {
      firstName: employee?.firstName,
      lastName: employee?.lastName,
      phoneNumber: employee?.phoneNumber,
      address: employee?.address,
      email: employee?.email,
      employmentDate: employee?.employmentDate,
    };
    let result;
    if (!isAddMode) {
      result = await updateEmployee(id, data);
    } else {
      data.username = username;
      data.password = password;
      data.passwordConfirm = passwordConfirm;
      result = await createEmployee(data);
    }
    console.log(data);
    if (result) navigate("/employees");
  };

  return (
    <div>
      <h3 className="--mt">Upravljanje zaposlenicima</h3>
      <div className="add-item">
        <Card cardClass={"card"}>
          <form onSubmit={saveEmployee}>
            <label>Ime:</label>
            <input
              type="text"
              placeholder="ime"
              name="firstName"
              required
              value={employee?.firstName}
              onChange={handleInputChange}
            />
            <label>Prezime:</label>
            <input
              type="text"
              placeholder="prezime"
              name="lastName"
              required
              value={employee?.lastName}
              onChange={handleInputChange}
            />

            <label>Telefon:</label>
            <input
              type="text"
              placeholder="telefon"
              name="phoneNumber"
              required
              value={employee?.phoneNumber}
              onChange={handleInputChange}
            />

            <label>Adresa:</label>
            <input
              type="text"
              placeholder="adresa"
              name="address"
              required
              value={employee?.address}
              onChange={handleInputChange}
            />

            <label>Email:</label>
            <input
              type="email"
              placeholder="email"
              name="email"
              required
              value={employee?.email}
              onChange={handleInputChange}
            />

            <label>Datum zaposlenja:</label>
            <input
              type="date"
              name="employmentDate"
              required
              value={employee?.employmentDate}
              onChange={handleInputChange}
            />
            {isAddMode === true ? (
              <>
                {" "}
                :<label>Korisničko ime:</label>
                <input
                  type="text"
                  placeholder="korisničko ime"
                  name="username"
                  required
                  value={username}
                  onChange={handleInputChange}
                />
                <label>Lozinka:</label>
                <input
                  type="password"
                  placeholder="lozinka"
                  name="password"
                  required
                  value={password}
                  onChange={handleInputChange}
                />
                <label>Potvrda lozinke:</label>
                <input
                  type="password"
                  placeholder="potvrda lozinke"
                  name="passwordConfirm"
                  required
                  value={passwordConfirm}
                  onChange={handleInputChange}
                />
              </>
            ) : null}
            <div className="--my">
              <button type="submit" className="--btn --btn-success">
                Spremi
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ManageEmployee;

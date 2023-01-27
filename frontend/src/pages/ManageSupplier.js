import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createSupplier,
  getSupplier,
  updateSupplier,
} from "../services/supplierService";
import Card from "../components/card/Card";
import "./Manage.css";

const ManageSupplier = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    if (!isAddMode) {
      const fetchData = async () => {
        const result = await getSupplier(id);
        result.data.data.startDate = result.data.data.startDate
          .split("-")
          .reverse()
          .join("-");
        setSupplier(result.data.data);
      };
      fetchData();
    }
  }, [id, isAddMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const saveSupplier = async (e) => {
    e.preventDefault();
    const data = {
      name: supplier?.name,
      uid: supplier?.uid,
      vat: supplier?.vat,
      phoneNumber: supplier?.phoneNumber,
      contactPerson: supplier?.contactPerson,
      email: supplier?.email,
      startDate: supplier?.startDate,
    };
    let result;
    if (!isAddMode) result = await updateSupplier(id, data);
    else result = await createSupplier(data);
    console.log(data);
    if (result) navigate("/suppliers");
  };

  return (
    <div>
      <h3 className="--mt">Upravljanje dobavljačima</h3>
      <div className="add-item">
        <Card cardClass={"card"}>
          <form onSubmit={saveSupplier}>
            <label>Naziv:</label>
            <input
              type="text"
              placeholder="naziv"
              name="name"
              required
              value={supplier?.name}
              onChange={handleInputChange}
            />
            <label>Jed. ID broj:</label>
            <input
              type="text"
              placeholder="jed. id broj"
              name="uid"
              required
              value={supplier?.uid}
              onChange={handleInputChange}
            />

            <label>PDV broj:</label>
            <input
              type="text"
              placeholder="pdv broj"
              name="vat"
              required
              value={supplier?.vat}
              onChange={handleInputChange}
            />

            <label>Telefon:</label>
            <input
              type="text"
              placeholder="telefon"
              name="phoneNumber"
              required
              value={supplier?.phoneNumber}
              onChange={handleInputChange}
            />

            <label>Kontakt osoba:</label>
            <input
              type="text"
              placeholder="kontakt osoba"
              name="contactPerson"
              required
              value={supplier?.contactPerson}
              onChange={handleInputChange}
            />

            <label>Email:</label>
            <input
              type="email"
              placeholder="email"
              name="email"
              required
              value={supplier?.email}
              onChange={handleInputChange}
            />

            <label>Datum početka:</label>
            <input
              type="date"
              name="startDate"
              required
              value={supplier?.startDate}
              onChange={handleInputChange}
            />
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

export default ManageSupplier;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createSupply,
  getSupply,
  updateSupply,
} from "../services/supplyService";
import { getAllSuppliers } from "../services/supplierService";
import Card from "../components/card/Card";
import "./ManageEmployee.css";

const ManageSupply = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const navigate = useNavigate();

  const [supply, setSupply] = useState({});
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (!isAddMode) {
      const fetchData = async () => {
        const [result1, result2] = await Promise.all([
          getSupply(id),
          getAllSuppliers(),
        ]);
        setSupply(result1.data.data);
        setSuppliers(result2.data.data);
      };
      fetchData();
    } else {
      const fetchData = async () => {
        const result = await getAllSuppliers();
        setSuppliers(result.data.data);
      };
      fetchData();
    }
  }, [id, isAddMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupply({ ...supply, [name]: value });
  };

  const saveSupply = async (e) => {
    e.preventDefault();
    const data = {
      name: supply?.name,
      quantity: supply?.quantity,
      minQuantity: supply?.minQuantity,
      price: supply?.price,
      unitMeasure: supply?.unitMeasure,
      supplierId: supply?.supplierId,
    };
    let result;
    if (!isAddMode) result = await updateSupply(id, data);
    else result = await createSupply(data);
    console.log(data);
    if (result) navigate("/supplies");
  };

  return (
    <div>
      <h3 className="--mt">Upravljanje sirovinama</h3>
      <div className="add-product">
        <Card cardClass={"card"}>
          <form onSubmit={saveSupply}>
            <label>Naziv:</label>
            <input
              type="text"
              placeholder="naziv"
              name="name"
              required
              value={supply?.name}
              onChange={handleInputChange}
            />
            <label>Količina:</label>
            <input
              type="text"
              placeholder="količina"
              name="quantity"
              required
              value={supply?.quantity}
              onChange={handleInputChange}
            />
            <label>Min. količina:</label>
            <input
              type="text"
              placeholder="min. količina"
              name="minQuantity"
              required
              value={supply?.minQuantity}
              onChange={handleInputChange}
            />
            <label>Cijena:</label>
            <input
              type="text"
              placeholder="cijena"
              name="price"
              required
              value={supply?.price}
              onChange={handleInputChange}
            />
            <label>Jed. mjere:</label>
            <input
              type="text"
              placeholder="jed. mjere"
              name="unitMeasure"
              required
              value={supply?.unitMeasure}
              onChange={handleInputChange}
            />
            <label>Dobavljač:</label>
            <select
              placeholder="Odaberite dobavljača"
              onChange={handleInputChange}
              required
              name="supplierId"
            >
              {isAddMode === true ? (
                <option value="" disabled selected>
                  Odaberite dobavljača...
                </option>
              ) : (
                ""
              )}
              {suppliers.map((supplier) => {
                if (supplier.id === supply.supplierId) {
                  return (
                    <option key={supplier.id} value={supplier.id} selected>
                      {supplier.name}
                    </option>
                  );
                }
                return (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                );
              })}
            </select>
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

export default ManageSupply;

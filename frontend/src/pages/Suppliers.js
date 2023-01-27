import React, { useEffect, useState } from "react";
import "./Table.css";
import { FaEdit } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getAllSuppliers } from "../services/supplierService";
import { Link, useNavigate } from "react-router-dom";
import DateModal from "../components/DateModal";
import { updateSupplier } from "../services/supplierService";

const Suppliers = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(false);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const fetchData = async () => {
    const result = await getAllSuppliers();
    setSuppliers(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(suppliers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(suppliers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, suppliers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % suppliers.length;
    setItemOffset(newOffset);
  };

  const modal = (id) => {
    setShowModal(true);
    setId(id);
  };

  const addNewSupplier = () => {
    navigate("/add-supplier");
  };

  const updateEndDate = async (date) => {
    await updateSupplier(id, { endDate: date });
    setShowModal(false);
    await fetchData();
  };

  return (
    <div className="item-list">
      <hr />
      <div className="table">
        <div
          className="--flex-between --flex-dir-column"
          style={{ marginBottom: 20 }}
        >
          <span>
            <h3>Lista dobavljača</h3>
          </span>
          <button onClick={addNewSupplier} className="--btn --btn-success">
            Dodaj novog dobavljača
          </button>
        </div>

        <div className="table">
          {suppliers.length === 0 ? (
            <p>Trenutno nema dobavljača..</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>R. br.</th>
                  <th>Naziv</th>
                  <th>Jed. ID broj</th>
                  <th>PDV broj</th>
                  <th>Telefon</th>
                  <th>Kontakt osoba</th>
                  <th>Email</th>
                  <th>Datum početka</th>
                  <th>Datum završetka</th>
                  <th>Uređivanje</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((supplier, index) => {
                  const {
                    id,
                    name,
                    uid,
                    vat,
                    phoneNumber,
                    contactPerson,
                    email,
                    startDate,
                    endDate,
                  } = supplier;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{uid}</td>
                      <td>{vat}</td>
                      <td>{phoneNumber}</td>
                      <td>{contactPerson}</td>
                      <td>{email}</td>
                      <td>{startDate}</td>
                      <td>
                        {endDate !== null ? (
                          endDate
                        ) : (
                          <CgDanger
                            size={25}
                            color={"red"}
                            onClick={() => modal(id)}
                          />
                        )}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/edit-supplier/${id}`}>
                            <FaEdit size={20} color={"blue"} />
                          </Link>
                        </span>
                      </td>
                      <DateModal
                        onSave={updateEndDate}
                        show={showModal}
                        onNo={() => setShowModal(false)}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Sljeceća"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prethodna"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default Suppliers;

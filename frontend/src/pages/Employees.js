import React, { useEffect, useState } from "react";
import "./Employees.css";
import { FaEdit } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getAllEmployees } from "../services/employeeService";
import { Link, useNavigate } from "react-router-dom";
import DateModal from "../components/DateModal";
import { updateEmployee } from "../services/employeeService";

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(false);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const fetchData = async () => {
    const result = await getAllEmployees();
    setEmployees(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(employees.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(employees.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, employees]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % employees.length;
    setItemOffset(newOffset);
  };

  const modal = (id) => {
    setShowModal(true);
    setId(id);
  };

  const addNewEmployee = () => {
    navigate("/add-employee");
  };

  const updateDismissalDate = async (date) => {
    await updateEmployee(id, { dismissalDate: date });
    setShowModal(false);
    await fetchData();
  };

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div
          className="--flex-between --flex-dir-column"
          style={{ marginBottom: 20 }}
        >
          <span>
            <h3>Lista zaposlenika</h3>
          </span>
          <button onClick={addNewEmployee} className="--btn --btn-success">
            Dodaj novog zaposlenika
          </button>
        </div>

        <div className="table">
          {employees.length === 0 ? (
            <p>Trenutno nema zaposlenika..</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>R. br.</th>
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Telefon</th>
                  <th>Adresa</th>
                  <th>Email</th>
                  <th>Datum zaposlenja</th>
                  <th>Datum otkaza</th>
                  <th>Uređivanje</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((employee, index) => {
                  const {
                    id,
                    firstName,
                    lastName,
                    phoneNumber,
                    address,
                    email,
                    employmentDate,
                    dismissalDate,
                  } = employee;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{phoneNumber}</td>
                      <td>{address}</td>
                      <td>{email}</td>
                      <td>{employmentDate}</td>
                      <td>
                        {dismissalDate !== null ? (
                          dismissalDate
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
                          <Link to={`/edit-employee/${id}`}>
                            <FaEdit size={20} color={"blue"} />
                          </Link>
                        </span>
                      </td>
                      <DateModal
                        onSave={updateDismissalDate}
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

export default Employees;

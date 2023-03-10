import React, { useEffect, useState } from "react";
import "./Table.css";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteSupply,
  getAllSupplies,
  updateSupply,
} from "../services/supplyService";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

const Supplies = () => {
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  const fetchData = async () => {
    const result = await getAllSupplies();
    setSupplies(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(supplies.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(supplies.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, supplies]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % supplies.length;
    setItemOffset(newOffset);
  };

  const addNewSupply = () => {
    navigate("/add-supply");
  };

  const onDelete = async (id) => {
    await deleteSupply(id);
    await fetchData();
  };

  const onChangeStatus = async (id) => {
    await updateSupply(id, { isUsed: false });
    await fetchData();
  };

  const deleteAlert = (id) => {
    confirmAlert({
      title: "Brisanje sirovine",
      message: "Jeste li sigurni da želite obrisati ovu sirovinu?",
      buttons: [
        {
          label: "Izbriši",
          onClick: () => onDelete(id),
        },
        {
          label: "Izlaz",
        },
      ],
    });
  };

  const changeUsedStatus = (id) => {
    confirmAlert({
      title: "Promjena statusa upotrebe",
      message: "Jeste li sigurni da želite isključiti upotrebu ove sirovine?",
      buttons: [
        {
          label: "Isključi",
          onClick: () => onChangeStatus(id),
        },
        {
          label: "Izlaz",
        },
      ],
    });
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
            <h3>Lista sirovina</h3>
          </span>
          <button onClick={addNewSupply} className="--btn --btn-success">
            Dodaj novu sirovinu
          </button>
        </div>

        <div className="table">
          {supplies.length === 0 ? (
            <p>Trenutno nema sirovina..</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>R. br.</th>
                  <th>Naziv</th>
                  <th>Količina</th>
                  <th>Min. količina</th>
                  <th>Cijena</th>
                  <th>Jed. mjere</th>
                  <th>Upotreba</th>
                  <th>Dobavljač</th>
                  <th>Akcije</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((supply, index) => {
                  const {
                    id,
                    name,
                    quantity,
                    minQuantity,
                    price,
                    unitMeasure,
                    isUsed,
                    Supplier,
                  } = supply;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td
                        className={
                          quantity < minQuantity ? "--color-danger" : ""
                        }
                      >
                        {quantity}
                      </td>
                      <td>{minQuantity}</td>
                      <td>{price}</td>
                      <td>{unitMeasure}</td>
                      <td>
                        {isUsed === true ? (
                          <AiOutlineCheck
                            size={20}
                            color={"green"}
                            onClick={() => changeUsedStatus(id)}
                          />
                        ) : (
                          <MdCancel size={20} color={"red"} />
                        )}
                      </td>
                      <td>{Supplier.name}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/edit-supply/${id}`}>
                            <FaEdit size={20} color={"blue"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => deleteAlert(id)}
                          />
                        </span>
                      </td>
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

export default Supplies;

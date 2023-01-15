import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const DateModal = (props) => {
  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const save = () => {
    props.onSave(date);
  };

  return (
    <>
      <Modal show={props.show} centered size="sm" contentClassName="my-modal">
        <Modal.Header closeButton onClick={props.onNo}>
          <Modal.Title>Promjena datuma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="dateInput">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="date" autoFocus onChange={handleDateChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onNo}>
            Zatvori
          </Button>
          <Button variant="primary" onClick={save}>
            Spremi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DateModal;

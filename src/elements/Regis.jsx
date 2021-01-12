import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { register } from "../configs/services";
import "./Login.css";

function ModalRegister({ show, setShow, switchModal, dispatch }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [errRegis, seterrRegis] = useState(false);
  useEffect(() => {
    if (errRegis === true) {
      setTimeout(() => {
        seterrRegis(false);
      }, 3000);
    }
  }, [errRegis]);

  const onSwitch = () => {
    setShow(false);
    switchModal(true);
    setFormData({ email: "", password: "", fullName: "" });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onRegister = (e) => {
    e.preventDefault();
    register(dispatch, formData, seterrRegis);
  };
  const handleClose = () => setShow(false);

  return (
    <Modal
      backdrop="static"
      centered
      show={show}
      setshow={setShow}
      onHide={handleClose}
      size="md"
      className="modal-regist-log "
    >
      <Modal.Body>
        <div className="wrapper-form">
          <h1 className="font"> Register </h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            onChange={(e) => handleChange(e)}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            onChange={(e) => handleChange(e)}
            value={formData.password}
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input"
            onChange={(e) => handleChange(e)}
            value={formData.fullName}
          />
          {errRegis && (
            <p style={{ color: "red" }}>
              Invalid Register. Please check your form
            </p>
          )}
          <button className="btn-login" onClick={onRegister}>
            REGISTER
          </button>

          <p className="switch">
            Already have an account ? Klik{" "}
            <b className="b" onClick={onSwitch}>
              Here
            </b>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalRegister;

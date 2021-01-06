import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export default class ModalLogin extends Component {
  state = {
    email: "",
    password: "",
  };

  _handlEmailInput = (e) => {
    const { errorLoginToFalse } = this.props;

    this.setState({ email: e.target.value });
    errorLoginToFalse();
  };

  _handlPassInput = (e) => {
    const { errorLoginToFalse } = this.props;

    this.setState({ password: e.target.value });
    errorLoginToFalse();
  };

  _handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { dummyLogin, setIsLogin, onErrorLogin } = this.props;

    if (email === dummyLogin.email && password === dummyLogin.password) {
      setIsLogin();
    } else {
      onErrorLogin();
      console.log("error");
    }
  };

  render() {
    const { isShow, onHide, switchModal, errLogin } = this.props;
    return (
      <Modal
        backdrop="static"
        centered
        onHide={() => onHide("login")}
        show={isShow}
        size="md"
        className="modal-regist-log"
      >
        <Modal.Body>
          <div className="wrapper-form">
            <h1>Login</h1>
            <input
              type="text"
              className="email-input"
              placeholder="Email"
              onChange={this._handlEmailInput}
            />
            <input
              type="password"
              className="password-input"
              placeholder="Password"
              onChange={this._handlPassInput}
            />
            {errLogin && (
              <p style={{ color: "red" }}>Wrong username or password</p>
            )}
            <button className="btn-login" onClick={this._handleLogin}>
              LOGIN
            </button>
            <p className="to-register">
              Don't have an account ? Klik{" "}
              <b onClick={() => switchModal("login")}>Here</b>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

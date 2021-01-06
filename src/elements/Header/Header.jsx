import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Context } from "../../Context/Context";
import { logoutService } from "../../configs/services";
import userIcon from "../../assets/icon/userIcon.png";
import ModalLogin from "../Login";
import ModalRegister from "../Regis";
import "./Header.css";
import {
  LOGO,
  CART,
  PROFILE,
  LOGOUT,
  ADD_PRODUCT,
  TRANSACTION,
} from "./../../configs/icons";

function Header() {
  const [state, dispatch] = useContext(Context);
  const { isLogin } = state;

  return (
    <Navbar fixed="top" className="header-container">
      <Link to="/">
        <div className="logo">
          <img src={LOGO} alt="logo" />
        </div>
      </Link>
      <div className="align-center">
        {isLogin ? (
          <IsLogin dispatch={dispatch} state={state} />
        ) : (
          <NotLogin dispatch={dispatch} state={state} />
        )}
      </div>
    </Navbar>
  );
}

const NotLogin = ({ dispatch, state }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const onLogin = () => {
    setShowLogin(true);
  };
  const onRegister = () => {
    setShowRegister(true);
  };

  return (
    <>
      <button className="login" onClick={onLogin}>
        Login
      </button>
      <ModalLogin
        show={showLogin}
        setShow={setShowLogin}
        switchModal={setShowRegister}
        dispatch={dispatch}
        state={state}
      />
      <button className="register" onClick={onRegister}>
        Register
      </button>
      <ModalRegister
        show={showRegister}
        setShow={setShowRegister}
        switchModal={setShowLogin}
        dispatch={dispatch}
      />
    </>
  );
};

const IsLogin = ({ dispatch, state }) => {
  const { carts } = state;
  const [showDropdown, setShowDropdown] = useState(false);

  const onLogout = (e) => {
    logoutService(dispatch);
  };

  const _handleOpenDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      {state.user.isAdmin === false && (
        <Link to="/cart">
          {carts.length > 0 && (
            <div className="num-product-cart">
              <p>{carts.length}</p>
            </div>
          )}
          <img src={CART} alt="cart" className="img-cart" />
        </Link>
      )}

      <div className="dropdown">
        <img
          src={PROFILE}
          alt="user"
          className="img-profile dropbtn"
          onClick={_handleOpenDropdown}
        ></img>
        <div className={`dropdown-content ${showDropdown ? "show" : ""}`}>
          {state.user.isAdmin ? (
            <>
              {/* <span> */}
              <Link to="/income">
                <div className="dropdown-btn">
                  <img
                    src={ADD_PRODUCT}
                    alt="add-product-icon"
                    className="dropdown-img-icon"
                  />
                  <p className="ml-19 dropdown-text">Income</p>
                </div>
              </Link>
              {/* </span> */}
              {/* <span> */}
              <Link to="/add">
                <div className="dropdown-btn">
                  <img
                    src={TRANSACTION}
                    alt="add-product-icon"
                    className="dropdown-img-icon"
                  />
                  <p className="ml-19 dropdown-text">Add Product</p>
                </div>
              </Link>
              <div onClick={onLogout} className="dropdown-btn">
                <img
                  src={LOGOUT}
                  alt="logut-icon"
                  className="dropdown-img-icon"
                />
                <p className="dropdown-text">Logout</p>
              </div>
              {/* </span> */}
            </>
          ) : (
            <>
              <Link to="/profile">
                <div className="dropdown-btn">
                  <img
                    src={userIcon}
                    alt="profile-icon"
                    className="dropdown-img-icon"
                  />
                  <p className="dropdown-text profile-text">Profile</p>
                </div>
              </Link>
              {/* </span> */}
              {/* <span onClick={onLogout}> */}
              <div onClick={onLogout} className="dropdown-btn">
                <img
                  src={LOGOUT}
                  alt="logut-icon"
                  className="dropdown-img-icon"
                />
                <p className="dropdown-text">Logout</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

import React from "react";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../Context/Context";
import { useHistory } from "react-router-dom";
import { addTransaction } from "../../configs/services";
import { Button, Modal } from "react-bootstrap";
import ListBuy from "./ListBuy";
import "./Shipping.css";
import Navbar from "../../elements/Header/Header";

function ModalShip(props) {
  useEffect(() => {
    if (props.show === true) {
      setTimeout(() => {
        props.setShow(false);
        props.custom();
      }, 5000);
    }
  });
  return (
    <Modal {...props} centered>
      <div className="modal-ship">
        <p className="title">
          Thank you for ordering in us, please wait 1 x 24 hours to verify you
          order
        </p>
      </div>
    </Modal>
  );
}

function Shipping() {
  const [modalShow, setModalShow] = React.useState(false);
  const [state, dispatch] = useContext(Context);
  const { carts } = state;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pos: "",
    phone: "",
    email: "",
    attachment: { name: "Attache of transaction" },
  });
  const router = useHistory();
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [key]: value });
    console.log(formData);
  };
  const onPay = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.address &&
      formData.pos &&
      formData.phone &&
      formData.email &&
      formData.attachment
    ) {
      const products = JSON.stringify(
        carts.map((product) => {
          return { id: product.id, orderQuantity: product.qty };
        })
      );
      console.log(products);
      const { name, address, pos, phone, email, attachment } = formData;
      const body = new FormData();
      body.append("name", name);
      body.append("address", address);
      body.append("pos", pos);
      body.append("phone", phone);
      body.append("email", email);
      body.append("attachment", attachment);
      body.append("products", products);
      addTransaction(body, () => setModalShow(true));
    }
  };
  const redirect = () => {
    dispatch({
      type: "RESET_CART",
    });
    router.push("/profile");
  };
  return (
    <div className="page-ship">
      <Navbar />
      <div className="form">
        <p className="title-ship">Shipping</p>
        <input
          type="text"
          name="name"
          className="add-name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          name="email"
          className="add-email"
          placeholder="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="number"
          name="phone"
          className="add-phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="pos"
          className="add-pos"
          placeholder="Post Code"
          value={formData.pos}
          onChange={(e) => handleChange(e)}
        />
        <textarea
          type="text"
          name="address"
          className="add-address"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => handleChange(e)}
        ></textarea>
        <label htmlFor="file" className="cursor add-file">
          <div className="space-between align-center">
            <p className="ns">{formData.attachment.name}</p>
            <i className="fas icon2 fa-paperclip"></i>
          </div>
          <input
            type="file"
            name="attachment"
            className="none"
            id="file"
            onChange={(e) => handleChange(e)}
          />
        </label>
        <div className="box-product">
          <div className="box-ship">
            {carts
              ? carts.map((product, index) => (
                  <ListBuy dataProduct={product} key={index} />
                ))
              : null}
          </div>
          <Button className="btn-pay" onClick={onPay}>
            Pay
          </Button>
        </div>

        <ModalShip show={modalShow} setShow={setModalShow} custom={redirect} />
      </div>
    </div>
  );
}

export default Shipping;

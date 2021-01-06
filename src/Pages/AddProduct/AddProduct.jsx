import React from "react";
import { useState, useEffect } from "react";
import { Form, Card, Modal, Button } from "react-bootstrap";
import "./AddProduct.css";
import Navbar from "../../elements/Header/Header";
import { API } from "../../configs/api";
import { useHistory } from "react-router-dom";

function ModalAdd(props) {
  useEffect(() => {
    if (props.show === true) {
      setTimeout(() => {
        props.setShow(false);
        props.custom();
      }, 3000);
    }
  });

  return (
    <Modal {...props} centered>
      <div className="modal-add">
        <p className="title">Success Add Product</p>
      </div>
    </Modal>
  );
}

function AddProduct() {
  const [modalShow, setModalShow] = useState(false);
  const [nameFile, setNameFile] = useState("Photo Product");
  const [formData, setFormData] = useState({});
  const router = useHistory();
  const onUpload = (e) => {
    setNameFile(e.target.files[0].name);
  };
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [key]: value });
    console.log(formData);
  };
  const addProductService = (data, cb) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    API.post("/product", data, config)
      .then(() => cb())
      .catch((error) => console.error(error));
  };
  const handleButton = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.price &&
      formData.description &&
      formData.stock &&
      formData.photo
    ) {
      const { name, price, description, stock, photo } = formData;
      const body = new FormData();
      body.append("name", name);
      body.append("description", description);
      body.append("price", price);
      body.append("stock", stock);
      body.append("photo", photo);
      addProductService(body, () => setModalShow(true));
    }
  };
  const redirect = () => {
    router.push("/");
  };
  const [file, setFile] = useState(null);

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="page-add">
      <Navbar />
      <Card>
        <Form className="form-product">
          <p className="title-add">
            <b>Add Product</b>
          </p>
          <input
            type="text"
            name="name"
            className="add-name"
            placeholder="Name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number"
            name="stock"
            className="add-stock"
            placeholder="Stock"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="number"
            name="price"
            className="add-price"
            placeholder="Price"
            onChange={(e) => handleChange(e)}
          />
          <textarea
            type="text"
            name="description"
            className="add-desc"
            placeholder="Description Produck"
            onChange={(e) => handleChange(e)}
          ></textarea>
          <label htmlFor="file" className="cursor add-file">
            <div className="space-between align-center">
              <p className="nf">{nameFile}</p>
              <i className="fas icon fa-paperclip"></i>
            </div>
            <input
              type="file"
              className="none"
              id="file"
              name="photo"
              onChange={(e) => {
                handleChange(e);
                onUpload(e);
                fileHandler(e);
              }}
            />
          </label>
          <img
            className="img-add"
            src={
              file
                ? URL.createObjectURL(file)
                : "https://mapbyyou.com/maptool/dist/img/no-available.png"
            }
            alt={file ? file.name : null}
          />
          <Button className="btn-add" onClick={(e) => handleButton(e)}>
            <b style={{ fontFamily: "Poppins" }}>Add Product</b>
          </Button>
          <ModalAdd show={modalShow} setShow={setModalShow} custom={redirect} />
        </Form>
      </Card>
    </div>
  );
}

export default AddProduct;

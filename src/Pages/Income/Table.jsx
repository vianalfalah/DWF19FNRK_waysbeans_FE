import React, { useState, useEffect } from "react";
import { editStatusTransaction } from "../../configs/services";
import "./Table.css";
import { SUCCESS, UNSUCCESS } from "../../configs/icons";
import SEND from "../../assets/icon/truck.svg";

function TableIncome({ data, dispatch }) {
  return (
    <table className="table-income" border="2">
      <thead className="head">
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Address</th>
          <th>Post Code</th>
          <th>Phone</th>
          <th>Product Order</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0
          ? data.map((tran, index) => (
              <Td data={tran} index={index} dispatch={dispatch} key={index} />
            ))
          : null}
      </tbody>
    </table>
  );
}
const Td = ({ data, index, dispatch }) => {
  const [products, setProducts] = useState({ id: [], name: "" });
  const [status, setStatus] = useState(data.status);
  const getProductName = () => {
    if (data.products && data.products.length > 0) {
      let productsName = "";
      data.products.forEach((product) => {
        if (product.name) {
          if (!products.id.includes(product.id)) {
            productsName += product.name + ", ";
            setProducts({
              id: [...products.id, product.id],
            });
          }
        }
      });
      setProducts({ ...products, name: productsName });
    }
  };
  useEffect(() => {
    getProductName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onAction = (status) => {
    editStatusTransaction(data.id, { status });
    setStatus(status);
  };
  return (
    <>
      <tr>
        <td>{+index + 1}</td>
        <td>{data.name}</td>
        <td>{data.address}</td>
        <td>{data.pos}</td>
        <td>{data.phone}</td>
        <td>{products.name}</td>
        <td>
          {status === "Success" ? (
            <p className="success text-center">Success</p>
          ) : status === "Waiting Approve" ? (
            <p className="waiting-approve">Waiting Approve</p>
          ) : status === "On The Way" ? (
            <p className="on-the-way text-center">On The Way</p>
          ) : (
            <p className="cancel text-center">Cancel</p>
          )}
        </td>
        <td>
          {status === "Success" ? (
            <div className="item-center">
              <img src={SUCCESS} className="fas fa-check status-check"></img>
            </div>
          ) : status === "On The Way" ? (
            <div className="item-center">
              <img src={SEND} className="send"></img>
            </div>
          ) : status === "Waiting Approve" ? (
            <div className="item-center">
              <button
                className="btn-action cancell"
                onClick={() => onAction("Cancel")}
              >
                Cancel
              </button>
              <button
                className="btn-action successs"
                onClick={() => onAction("On The Way")}
              >
                Approve
              </button>
            </div>
          ) : (
            <div className="item-center">
              <img src={UNSUCCESS} className="fas fa-times status-cancel"></img>
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default TableIncome;

import "./Transaksi.css";
import ListBuy from "../Shipping/ListBuy";
import qr from "../../assets/qr.svg";
import { useState } from "react";
import { editStatusTransaction } from "../../configs/services";
import { Col, Modal, Row } from "react-bootstrap";

function Transaksi({ transaction }) {
  const [status, setStatus] = useState(transaction.status);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setStatus("Success");
    editStatusTransaction(transaction.id, { status: "Success" });
    window.location.href = "/profile";
  };

  const Status = ({ type }) => {
    return (
      <div className="status">
        <div style={{ marginTop: 10 }}>
          {type === "On The Way" ? (
            <div
              onClick={handleOpenModal}
              className="container-text-status otw"
            >
              On The Way
            </div>
          ) : type === "Success" ? (
            <div className="container-text-status success">Succsess</div>
          ) : type === "Waiting Approve" ? (
            <div className="container-text-status wait">Waiting Approve</div>
          ) : (
            <div className="container-text-status cancel">Cancel</div>
          )}
        </div>
      </div>
    );
  };

  const handleOpenModal = () => {
    setShow(!show);
  };

  const ModalConfirm = () => {
    return (
      <Modal
        backdrop="static"
        centered
        show={show}
        setShow={setShow}
        onHide={handleOpenModal}
        size="md"
        className="modal-regist-log"
      >
        <p className="text-desc-transaction align-center mr-15 p-3 m-auto">
          Product Have Arrived ?
        </p>
        <button
          className="btn mb-3"
          onClick={handleClick}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#613D2B",
            borderRadius: 8,
            color: "#fff",
            width: "50%",
            margin: "auto",
          }}
        >
          Confirm
        </button>
      </Modal>
    );
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        {transaction.products.length > 0 &&
          transaction.products.map((product, index) => {
            return (
              <>
                <ListBuy
                  dataTransactions={transaction}
                  dataProduct={product}
                  key={index}
                  ready={true}
                />
              </>
            );
          })}
        <Col>
          <Row>
            <img src={qr} alt="qr-code" className="qr-logo" />
          </Row>
          <Row>
            <Status type={transaction.status} />
          </Row>
        </Col>
      </div>
      <div className="row">
        {status === "On The Way" && (
          <>
            <ModalConfirm />
          </>
        )}
      </div>
    </div>
  );
}

export default Transaksi;

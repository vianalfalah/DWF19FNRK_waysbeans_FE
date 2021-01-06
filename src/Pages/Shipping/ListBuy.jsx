import { useState, useEffect } from "react";
import WAYS from "../../assets/ways-sm.svg";
import {
  getProductById,
  getMyTransactions,
  baseURL,
} from "../../configs/services";
import Moment from "react-moment";
import "./ListBuy.css";
import formatCurency from "../../configs/formatCurency";

function ListBuy({ children, dataProduct, ready, dataTransactions }) {
  const [product, setProducts] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState({});
  const qty = ready ? dataProduct.orderQuantity.qty : dataProduct.qty;
  useEffect(() => {
    if (ready) {
      setProducts(dataProduct);
    } else if (dataProduct) {
      (async () => {
        const data = await getProductById(dataProduct.id);
        setProducts(data.data.data.product);

        setUserData(JSON.parse(localStorage.getItem("profile")));
      })();
    }
  }, [dataProduct, ready]);

  const date = new Date();
  return product ? (
    <div className="card-ship">
      {console.log(transactions)}
      <div className="row">
        <div className="align-center">
          <img
            src={`${baseURL}${product.photo}`}
            className="ship-img"
            alt={product.name}
          />
        </div>
        <div className="ml-13">
          <h5 className="ship-name">{product.name}</h5>
          <p className="ship-desc">
            {window.location.pathname === "/profile" ? (
              new Date(dataTransactions.createdAt).toUTCString()
            ) : (
              <Moment format="dddd, DD MMMM YYYY">{date}</Moment>
            )}
          </p>
          <div className="bon">
            <p className="ship-desc mt-21">
              Price : {formatCurency(product.price)}
            </p>
            <p className="ship-desc">Qty : {qty}</p>
            <p className="ship-desc">
              <span className="total-ship">
                Sub Total : {formatCurency(product.price * +qty)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="qr-status">
        <div className="item-center">
          <img src={WAYS} className="ship-logo" alt={"logo"} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
}

export default ListBuy;

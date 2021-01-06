import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import Header from "../../elements/Header/Header";
import "./Cart.css";
import BoxProducts from "./BoxProducts";
import formatCurency from "../../configs/formatCurency";

function Cart() {
  const [state, dispatch] = useContext(Context);
  const { totalCart } = state;
  const { carts } = state;
  useEffect(() => {
    dispatch({
      type: "GET_TOTAL_CART",
    });
  }, [dispatch]);

  return (
    <div className="cart-container">
      <Header />
      <div className="wrapper-cart">
        <div className="title">
          <h2>My Cart</h2>
        </div>
        <div className="wrapper-detail">
          <div className="list-order">
            <p className="review-title">Review Your Order</p>
            <div className="wrap-detail-cart">
              <hr />

              {carts.length > 0 ? (
                carts.map((product, index) => (
                  <BoxProducts
                    dataProduct={product}
                    dispatch={dispatch}
                    key={index}
                  />
                ))
              ) : (
                <div className="list-empty">List Empty</div>
              )}

              <hr />
            </div>
          </div>
          <div className="wrapper-total">
            <hr />
            <div className="subtotal">
              <p>Subtotal</p>
              <p>{formatCurency(totalCart.subtotal)}</p>
            </div>
            <div className="total-qty">
              <p>Qty</p>
              <p>{totalCart.qty}</p>
            </div>
            <hr />
            <div className="price-total">
              <p>Total</p>
              <p>{formatCurency(totalCart.total)}</p>
            </div>
            <div className="wrapper-btn-checkout">
              {carts.length > 0 ? (
                <Link to="/ship">
                  <button className="btn-checkout">Proceed To Checkout</button>
                </Link>
              ) : (
                <button className="btn-checkout disabled">
                  Proceed To Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

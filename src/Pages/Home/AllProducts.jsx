import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import format from "../../configs/formatCurency";
import { getProducts } from "../../configs/services";
import "./ListP.css";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [FilterProducts, setFilterProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilterProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  useEffect(() => {
    getProducts(setProducts);
  }, []);

  return (
    <div style={{ marginTop: 150 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search Products"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="wrapper-list-product">
        {FilterProducts.map((product) => (
          <Link
            to={`/detail/${product.id}`}
            key={product.id}
            className="text-decoration-none"
          >
            <Col>
              <Card className="c-list-card">
                <Card.Img
                  className="c-list-card-img"
                  variant="top"
                  src={`${"http://localhost:5000/uploads/"}${product.photo}`}
                />
                <Card.Body>
                  <Card.Text className="c-list-card-title">
                    {product.name}
                  </Card.Text>
                  <Card.Text className="c-list-card-price">
                    {format(product.price)}
                  </Card.Text>
                  <Card.Text className="c-list-card-stock">
                    Stock : {product.stock}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;

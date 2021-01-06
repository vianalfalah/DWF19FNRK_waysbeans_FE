import Header from "./../../elements/Header/Header";
import "./Home.css";
import waysLg from "./../../assets/ways-lg.svg";
import backImg from "./../../assets/back-img.png";
import waves from "./../../assets/waves.svg";
import ListP from "./ListP";
import { useHistory } from "react-router";

function Home() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/all-products");
  };
  return (
    <>
      <Header />
      <div className="jumbotron back1">
        <span>
          <img className="ways" src={waysLg} alt="" />
        </span>
        <div className="desc">
          <p className="best">BEST QUALITY COFFEE BEANS</p>
          <p className="quality">
            Quality freshly roasted coffee made just for you. Pour, brew and
            enjoy
          </p>
        </div>
        <div className="waves-box">
          <img className="waves" src={waves} alt="" />
        </div>
        <div className="">
          <img className="back2" src={backImg} alt="" />
        </div>
      </div>
      <div
        className="list-container"
        style={{
          marginBottom: "51px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="wrapper-list-product">
          <ListP />
          <button className="btn-all" onClick={handleClick}>
            All Products
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;

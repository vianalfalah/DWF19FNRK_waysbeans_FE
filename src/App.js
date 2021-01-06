import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Add from "./Pages/AddProduct/AddProduct";
import Ship from "./Pages/Shipping/Shipping";
import Detail from "./Pages/Detail/Detail";
import Home from "./Pages/Home/Home";
import Income from "./Pages/Income/Income";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";
import PrivateRoute from "./component/PrivateRoute";
import AdminRoute from "./component/AdminRoute";
import Header from "./elements/Header/Header";
import { Context } from "./Context/Context";
import { loadedService } from "./configs/services";
import AllProducts from "./Pages/Home/AllProducts";

function App() {
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadedService(dispatch);
      setLoading(false);
    })();
    dispatch({
      type: "UPDATE_CART",
    });
  }, [dispatch]);
  return (
    <div className="main-container">
      <Router>
        <Header />
        {loading ? (
          <div>
            <Spinner animation="border" size="sm" />
            <Spinner animation="border" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
          </div>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/all-products" component={AllProducts} />
            <PrivateRoute exact path="/ship" component={Ship} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <AdminRoute exact path="/add" component={Add} />
            <AdminRoute exact path="/income" component={Income} />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;

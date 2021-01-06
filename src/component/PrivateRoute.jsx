import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { Context } from './../Context/Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;

import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./../Context/Context";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(Context);
  return (
    <Route
      {...rest}
      render={(props) =>
        state.user && state.user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;

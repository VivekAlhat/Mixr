import { useSession } from "../hooks/useSession";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { user } = useSession();
  return (
    <Route
      {...props}
      render={(props) =>
        !!user ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;

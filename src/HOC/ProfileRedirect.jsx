import { Route, Redirect } from "react-router-dom";
import { useSession } from "../hooks/useSession";

const ProfileRedirect = ({ component: Component, ...props }) => {
  const { user } = useSession();
  return (
    <Route
      {...props}
      render={(props) =>
        !user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/dashboard" }} />
        )
      }
    />
  );
};

export default ProfileRedirect;

import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import PasswordReset from "./pages/PasswordReset";
import PostPage from "./pages/PostPage";
import ProfileRedirect from "./HOC/ProfileRedirect";
import PrivateRoute from "./HOC/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <ProfileRedirect exact path="/" component={Home} />
          <ProfileRedirect path="/signup" component={Signup} />
          <ProfileRedirect path="/signin" component={Signin} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/settings" component={Settings} />
          <PrivateRoute path="/posts/:id" component={PostPage} />
          <PrivateRoute path="/users/:id" component={Profile} />
          <ProfileRedirect path="/reset" component={PasswordReset} />
          <Route path="*" component={Error} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;

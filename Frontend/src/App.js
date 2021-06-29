import React, { useState, useEffect } from "react";
import { fetch_user_data } from "./Redux";
import { connect } from "react-redux";
import "./App.css";
import { AllRoutes } from "./Routes";
import Loading from "./Pages/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { Payhere, AccountCategory } from "payhere-js-sdk";
import { PAYHERE_MERCHANT } from "./common/AppConstants";

function App(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [intialLocation, setIntialLocation] = useState("/");
  const [firstLaunch, setFirstLaunch] = useState(true);

  useEffect(() => {
    /* PAYHERE SANDBOX */
    Payhere.init(PAYHERE_MERCHANT, AccountCategory.SANDBOX);

    // fetch user details for auth
    props.fetch_user_data();

    // save user's initial requested path
    setIntialLocation(location.pathname);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (firstLaunch) {
      setFirstLaunch(false);
    } else {
      intialLocation.startsWith("/public/auth")
        ? navigate("/")
        : navigate(intialLocation);
    }
    // eslint-disable-next-line
  }, [props.init_request_path]);

  return (
    <div className="App">
      {props.loading ? <Loading /> : <div className="App">{AllRoutes()}</div>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.currentUser.loading,
    login: state.currentUser.login,
    logout: state.currentUser.logout,
    init_request_path: state.currentUser.init_request_path,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_user_data: () => dispatch(fetch_user_data()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

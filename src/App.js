import "./App.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loading from "./Components/Loading/Loading";
import { useSelector } from "react-redux";
import {
  EuiGlobalToastList,
} from "@elastic/eui";

// Containers
const Layout = React.lazy(() => import("./Components/Layout"));

// Pages
const LoginPage = React.lazy(() => import("./Components/Login"));
const RegisterPage = React.lazy(() => import("./Components/Register"));
 
function App() {
  const counter = 0;
  const notification = useSelector((state) => state.toast.notification);
  const loader = useSelector((state) => state.loaderConfig.loader);

  const [toasts, setToasts] = useState([
    { title: notification.message, color: notification.status, id: `toast-${counter}` },
  ]);
  useEffect(() => {
    setToasts([{
      id: `toast-${counter}`,
      title: notification.message,
      color: notification.status
    }])
  }, [notification])

  return (
    <div className="wrapper">
      {notification.message && (
        <EuiGlobalToastList
          toasts={toasts}
          toastLifeTimeMs={2000}
          dismissToast={() => setToasts([])}
        />
      )}

      {loader.isLoading && <Loading />}
      
      <React.Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <LoginPage {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <RegisterPage {...props} />}
            />
             
            <Route
              path="/"
              name="Home"
              render={(props) => <Layout {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
}

export default App;

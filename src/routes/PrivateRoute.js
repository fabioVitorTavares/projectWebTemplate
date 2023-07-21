import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { getData } from "../storage/localStorage";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const load = useSelector((state) => state.persistedReducer.load);
  const isAuthenticated = () => {
    const token = getData("token");
    return !!token;
  };

  if (!isAuthenticated()) {
    return <Navigate to={"/configurador/not-found"} />;
  }
  return (
    <>
      {!!load && (
        <div className="background-load" style={{ position: "fixed" }}>
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        </div>
      )}
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#ecf0f6",
        }}
      >
        <div className="container-component">
          <Component />
        </div>
      </div>
    </>
  );
};

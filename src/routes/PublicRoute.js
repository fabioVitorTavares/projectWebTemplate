import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

export const PublicRoute = ({ component: Component, ...rest }) => {
  const load = useSelector((state) => state.persistedReducer.load);
  return (
    <>
      {!!load && (
        <div className="background-load">
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
      <Component />
    </>
  );
};

import { RoutesApp } from "./routes/routes";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";

function App({ location }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoutesApp />
      </PersistGate>
    </Provider>
  );
}

export default App;

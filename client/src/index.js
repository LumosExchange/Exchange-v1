import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Web3ContextProvider } from "./Utils/web3-context";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { store, persistor } from "./Storage";

console.log(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Web3ContextProvider>
        <App />
      </Web3ContextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

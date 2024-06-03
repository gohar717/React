import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "./GlobalState/Store";
import reportWebVitals from "./reportWebVitals";

// Creating a React root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the main application component wrapped with Redux Provider and PersistGate
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// Reporting web vitals
reportWebVitals();

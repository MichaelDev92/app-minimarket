import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { AuthProvider } from "./provider/AuthContext";
import { BrowserRouter as Router } from "react-router-dom"; // Importa BrowserRouter
import { ProductContextProvider } from "./provider/ProductContext";
import { store } from "./reducers/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      {" "}
      {/* Envuelve tu aplicación con Router */}
      <AuthProvider>
        <Provider store={store}>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </Provider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import { useState } from "react";
import { privateRoutes } from "./routes/privateRoutes";
import "primereact/resources/primereact.min.css";
import { publicRoutes } from "./routes/publicRoutes";

function App() {
  const [userLogin, setUserLogin] = useState(true);
  return (
    <PrimeReactProvider value={{ unstyled: true }}>
      <Router>
        <Routes>
          {userLogin
            ? privateRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))
            : publicRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import { useState } from "react";
import { privateRoutes } from "./routes/privateRoutes";
import "primereact/resources/primereact.min.css";
import { publicRoutes } from "./routes/publicRoutes";
import Navbar from "./componets/navbar/Navbar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

function App() {
  const [userLogin, setUserLogin] = useState(true);
  return (
    <PrimeReactProvider>
      <Router>
        {userLogin && <Navbar />}
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

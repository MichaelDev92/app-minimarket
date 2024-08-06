import "./App.css";
import { Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import { privateRoutes } from "./routes/privateRoutes";
import "primereact/resources/primereact.min.css";
import { publicRoutes } from "./routes/publicRoutes";
import Navbar from "./componets/navbar/Navbar";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import useAuthData from "./Hooks/useAuthData";
import { ProgressSpinner } from "primereact/progressspinner";

function App() {
  const { isAuthenticated, loading } = useAuthData();

  if (loading) {
    return (
      <div className="loading-container">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      </div>
    );
  }

  return (
    <PrimeReactProvider>
      {isAuthenticated && <Navbar />}
      <Routes>
        {isAuthenticated
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
    </PrimeReactProvider>
  );
}

export default App;

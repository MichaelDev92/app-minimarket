import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import Sales from "../pages/sales/Sales";
import { Route as PrivateRoute } from "./types";

export const privateRoutes: PrivateRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/sales", element: <Sales /> },
];

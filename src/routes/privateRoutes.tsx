import Home from "../pages/home/Home";
import { Route as PrivateRoute } from "./types";


export const privateRoutes: PrivateRoute[] = [
  {path: '/', element: <Home/>},
]
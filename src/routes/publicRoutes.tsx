import Login from "../pages/login/Login";
import { Route as PublicRoute } from "./types";


export const publicRoutes: PublicRoute[] = [
  {path: '/', element: <Login/>},
  {path: '*', element: <Login/>},
]
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Search from "./Search";
import ErrorPage from "./ErrorPage";
import Product from "./Product";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />
    }, {
        path: "/Search",
        element: <Search />,
    }, {
        path: "/Product",
        element: <Product />,
    },

])

export default function RouteSwitch() { return <RouterProvider router={router} /> }


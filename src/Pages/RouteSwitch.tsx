import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Start } from "../Components/Exports"
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import Search, { loader as searchLoader } from "./Search";
import Product, { loader as productLoader } from "./Product";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Start />
            },
            {
                path: "search",
                element: <Search />,
                loader: searchLoader
            },
            {
                path: "product/:sku",
                element: <Product />,
                loader: productLoader
            },
        ]
    },

])

export default function RouteSwitch() { return <RouterProvider router={router} /> }


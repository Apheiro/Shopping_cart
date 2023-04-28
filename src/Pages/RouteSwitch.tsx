import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Product from "./Product";
import ErrorPage from "./ErrorPage";
import Search from "./Search";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/Product/:id",
                element: <Product />
            },
            {
                path: "/search/:query",
                element: <Search />
            }
        ]
    }
])

export default function RouteSwitch() { return <RouterProvider router={router} /> }


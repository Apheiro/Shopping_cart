import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from "./Root";
import ErrorPage from "./ErrorPage";
import Start from "./Start"
import Search, { loader as searchLoader } from "./Search";
import Product, { loader as productLoader, action as productAction } from "./Product";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Root />}
            loader={rootLoader}
            action={rootAction}
            errorElement={<ErrorPage />}
        >
            <Route
                index={true}
                element={<Start />}
            />
            <Route
                path="search"
                element={<Search />}
                loader={searchLoader}
            />
            <Route
                path="product/:sku"
                element={<Product />}
                loader={productLoader}
                action={productAction}
            />
        </Route>
    )
)

export default function RouteSwitch() { return <RouterProvider router={router} /> }


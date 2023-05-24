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
                key={"start"}
                index={true}
                element={<Start />}
            />
            <Route
                key={"search"}
                path="search"
                element={<Search />}
                loader={searchLoader}
            />
            <Route
                key={"product"}
                path="product/:sku"
                element={<Product />}
                loader={productLoader}
                action={productAction}
            />
        </Route>
    ), {
    basename: "/Shopping_cart",

}
)

export default function RouteSwitch() { return <RouterProvider router={router} /> }
import { ActionFunctionArgs, Outlet, redirect } from 'react-router-dom';
import Layout from './Layout';
import { getCartProducts, editCart } from '../utils/productsRequests';
import { removeFromCart } from '../utils/productsRequests';
import { ScrollRestoration } from "react-router-dom";
export async function loader() {
    const products = await getCartProducts()
    const darkModeOnLS = Boolean(localStorage.getItem('darkModShoppingCart'))
    return { products, darkModeOnLS };
}

export async function action(paramsAction: ActionFunctionArgs) {
    const formData = await paramsAction.request.formData()
    const product = formData.get('product') as unknown as number
    if (formData.has('quantity')) {
        const quantity = formData.get('quantity') as unknown as number
        editCart(product, quantity)
    }
    else { removeFromCart(product) }
    return null
}

export default function Root() {
    return (
        <Layout>
            <Outlet />
            <ScrollRestoration />
        </Layout>
    )
}
import { ActionFunctionArgs, Outlet, redirect } from 'react-router-dom';
import Layout from './Layout';
import { getCartProducts, ReqParams, editCart } from '../utils/productsRequests';
import { removeFromCart } from '../utils/productsRequests';

export async function loader() {
    const products = await getCartProducts()
    return { products };
}

export async function action(paramsAction: ActionFunctionArgs) {
    const formData = await paramsAction.request.formData()
    const actualURL = formData.get('actualUrl')
    const product = formData.get('product') as unknown as number
    if (formData.has('quantity')) {
        const quantity = formData.get('quantity') as unknown as number
        editCart(product, quantity)
    } else { removeFromCart(product) }
    return redirect(`${actualURL}`)
}

export default function Root() {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}
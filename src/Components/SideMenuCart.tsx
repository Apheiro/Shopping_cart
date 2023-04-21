import Btn from "./Core/Btn"
import ProductInCartCard from "./ProductInCartCard"

type Product = {
    img: string,
    title: string,
    price: number,
    quantity: number
}

interface Props {
    products: Product[],
    hidde: boolean
}

export default function SideMenuCart({ products, hidde = true }: Props) {

    function totalPrice() {
        return products.reduce((acc, product) => acc + product.price * product.quantity, 0)
    }

    return (
        <div className={`${hidde && '!translate-x-0'} flex flex-col h-screen fixed top-0 right-0 translate-x-full transition-transform duration-500 max-w-xl bg-db text-neutral-300`}>
            <p className="font-bold p-3">My cart</p>
            <div className="flex flex-col px-3 pb-10 gap-3 h-full scrollbar-thin scrollbar-thumb-[#ffffff21] scrollbar-thumb-rounded-lg overflow-x-auto">
                {
                    products.map(({ img, title, price, quantity }) =>
                        <ProductInCartCard img={img} title={title} price={price} quantity={quantity} />
                    )
                }
            </div>
            <div className="bg-db-1 flex justify-between items-start p-3 gap-5">
                <p className="font-bold">Total: ${totalPrice()}</p>
                <Btn variant="pay">Go to pay</Btn>
            </div>
        </div>
    )
}
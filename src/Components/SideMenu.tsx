import Btn from "./Core/Btn"
import ProductInCartCard from "./ProductInCartCard"
import { IconChevronLeft } from "@tabler/icons-react"

type Product = {
    img: string,
    title: string,
    price: number,
    quantity: number
}

interface Props {
    products?: Product[],
    hidde: boolean,
    setHidde: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SideMenu({ products, hidde, setHidde }: Props) {

    function totalPrice() {
        if (products)
            return products.reduce((acc, product) => acc + product.price * product.quantity, 0)
    }

    return (
        <div className={`${hidde ? 'translate-x-full' : 'translate-x-0'} z-10 flex flex-col h-screen fixed top-0 right-0 transition-transform duration-500 w-full max-w-xl bg-db text-neutral-300`}>
            <div className="p-3 flex gap-3 items-center">
                <Btn variant="cart" onClick={() => { setHidde(!hidde) }}><IconChevronLeft />My cart</Btn>
                <p className="font-bold "></p>
            </div>
            <div className="flex flex-col px-3 pb-10 gap-3 h-full scrollbar-thin scrollbar-thumb-[#ffffff21] scrollbar-thumb-rounded-lg overflow-x-auto">
                {
                    products &&
                    products.map(({ img, title, price, quantity }) =>
                        <ProductInCartCard img={img} title={title} price={price} quantity={quantity} />
                    )
                }
            </div>
            <div className="bg-dbm flex justify-between items-start p-3 gap-5">
                <p className="font-bold">Total: ${totalPrice()}</p>
                <Btn variant="pay">Go to pay</Btn>
            </div>
        </div>
    )
}
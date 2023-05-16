import { ReqParams } from "../utils/productsRequests"
import Btn from "./Core/Btn"
import ProductInCartCard from "./ProductInCartCard"
import { IconChevronLeft } from "@tabler/icons-react"
import { useLoaderData } from "react-router-dom"

interface Props {
    hidde: boolean,
    setHidde: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SideMenu({ hidde, setHidde }: Props) {
    const { products } = useLoaderData() as { products: ReqParams[] }

    function totalPrice() {
        if (products)
            return products.reduce((acc, product) => acc + parseInt(product.salePrice) * parseInt(product.quantity), 0)
    }

    return (
        <div className={`${hidde ? 'translate-x-full' : 'translate-x-0'} z-10 flex flex-col h-screen fixed top-0 right-0 transition-transform duration-500 w-full max-w-xl bg-db text-neutral-300`}>
            <div className="p-3 flex gap-3 items-center">
                <Btn variant="cart" onClick={() => { setHidde(!hidde) }}><IconChevronLeft />My cart</Btn>
                <p className="font-bold "></p>
            </div>
            <div className="scrollbar flex flex-col px-3 pb-10 gap-3 h-full scrollbar-thin scrollbar-thumb-[#ffffff21] scrollbar-thumb-rounded-lg overflow-x-auto">
                {
                    products.map(({ images, name, salePrice, quantity, sku }) =>
                        <ProductInCartCard key={`productsInCart-${crypto.randomUUID()}`}
                            img={images}
                            title={name}
                            price={parseInt(salePrice)}
                            quantity={parseInt(quantity)}
                            sku={parseInt(sku)}
                            hidde={hidde}
                            setHidde={setHidde}
                        />
                    )
                }
            </div>
            <div className="bg-dbm flex justify-between items-start p-3 gap-5">
                <p className="font-bold">Total: ${totalPrice()}</p>
                {
                    products.length > 0 ?
                        <Btn asChild variant="pay">
                            <a href={`https://api.bestbuy.com/click/-/${products.map(({ sku }) => sku).join(',')}/cart`} >
                                Go to pay
                            </a>
                        </Btn> :
                        <Btn variant="pay" classNameCustom='!bg-db !cursor-unset'>
                            Add products
                        </Btn>
                }

            </div>
        </div>
    )
}
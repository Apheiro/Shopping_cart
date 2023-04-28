import { useState } from "react"
import Btn from "./Core/Btn"
import ProductInCartCard from "./ProductInCartCard"
import { IconChevronLeft, IconShoppingCart, IconCategory, IconHome, IconInfoSquare } from "@tabler/icons-react"

type Product = {
    img: string,
    title: string,
    price: number,
    quantity: number
}

interface Props {
    variant: 'cart' | 'navSection'
    products?: Product[],
    hidde: boolean,
    setHidde: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function SideMenu({ products, variant, hidde, setHidde }: Props) {

    const [hiddeCart, setHiddeCart] = useState(true)

    function totalPrice() {
        if (products)
            return products.reduce((acc, product) => acc + product.price * product.quantity, 0)
    }


    function hiddeSideBar() {
        if (variant === 'navSection' && hiddeCart || variant === 'cart') { setHidde(!hidde) }
        if (!hiddeCart) { setHiddeCart(!hiddeCart) }
    }

    const navLinks: { name: string, href: string, svg: React.ReactNode }[] = [
        { name: 'Home', href: '/Home#', svg: <IconHome /> },
        { name: 'Features', href: '/Features#', svg: <IconInfoSquare /> },
        { name: 'Categories', href: '/Categories#', svg: <IconCategory /> },
    ]
    const Cart = () =>
        <>
            <div className="p-3 flex gap-3 items-center">
                <Btn variant="cart" onClick={hiddeSideBar}><IconChevronLeft />{hiddeCart ? 'My cart' : 'Menu'}</Btn>
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
            <div className="bg-db-1 flex justify-between items-start p-3 gap-5">
                <p className="font-bold">Total: ${totalPrice()}</p>
                <Btn variant="pay">Go to pay</Btn>
            </div>
        </>



    return (
        <div className={`${hidde ? 'translate-x-full' : 'translate-x-0'} z-10 flex flex-col h-screen fixed top-0 right-0 transition-transform duration-500 w-full max-w-xl bg-db text-neutral-300`}>
            {variant === 'cart' && Cart()}
            {variant === 'navSection' && !hiddeCart && Cart()}
            {
                variant === 'navSection' && hiddeCart &&
                <>
                    <div className="p-3 flex gap-3 items-center">
                        <Btn variant="cart" onClick={hiddeSideBar}><IconChevronLeft />Close</Btn>
                    </div>
                    <div className="flex flex-col gap-3 p-3 justify-start items-start ">
                        {
                            navLinks.map(({ name, href, svg }) => {
                                return (
                                    <Btn asChild variant='cart' classNameCustom={'!text-xl'} key={name}>
                                        <a href={href}>{svg} {name}</a>
                                    </Btn>
                                )
                            })
                        }
                        <Btn onClick={() => { setHiddeCart(!hiddeCart) }} classNameCustom={'!text-xl'} variant='cart'><IconShoppingCart size={20} /> Cart</Btn>

                    </div>


                </>
            }

        </div>
    )
}
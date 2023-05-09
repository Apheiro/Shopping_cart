import Btn from "./Core/Btn";
import Input from "./Core/Input";
import { useState } from 'react'
interface Props {
    img: string,
    title: string,
    price: number,
    quantity: number
}

export default function ProductInCartCard({ img, title, price, quantity }: Props) {
    const [showRemoveBtn, setShowRemoveBtn] = useState(false)
    const darkerText = 'text-neutral-500 leading-4'

    return (
        <div onMouseEnter={() => { setShowRemoveBtn(true) }} onMouseLeave={() => { setShowRemoveBtn(false) }} className="flex flex-col p-3 gap-3 rounded-lg bg-dbm text-base text-neutral-300 font-semibold">
            <div className="flex gap-5 w-full">
                <div className="p-1 w-24 aspect-square bg-white rounded">
                    <div className="h-full w-full bg-contain bg-no-repeat bg-center bg-white" style={{ backgroundImage: `url(${img})` }} />
                </div>

                <div className="w-full grid grid-cols-2 grid-rows-[1fr_auto] flex-col justify-between gap-3">
                    <h2 className="leading-5 font-semibold line-clamp-2 col-start-1 col-end-3">{title}</h2>
                    <p className="leading-4 self-center justify-self-start"><span className={darkerText}>Price: </span>${price}</p>
                    <div className="flex gap-2 justify-self-end  items-center">
                        <p className={darkerText}>Quantity:</p>
                        <Input variant="quantity" />
                    </div>
                </div>
            </div>
            {showRemoveBtn && <Btn variant='removeCart'>Remove</Btn>}
        </div>

    )
}
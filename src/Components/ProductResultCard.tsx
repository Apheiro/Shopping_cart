import Btn from "./Core/Btn";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom"

interface Props {
    img: string,
    condition: string,
    title: string,
    model: string,
    sku: string | number,
    price: number,
    oldPrice: number,
    orderable: 'Available' | 'SoldOut' | 'PreOrder'
}

export default function ProductResultCard({ img, condition, title, model, sku, price, oldPrice, orderable }: Props) {
    const isMobile = useMediaQuery('(max-width: 500px)')
    const [isLoad, setIsLoad] = useState(false)
    const darkerText = 'text-neutral-500 leading-4 font-semibold text-sm'
    const isLoading = useNavigation().state === "loading"

    function conditioAndTitle() {
        return (
            <div className='row-start-1 row-end-2 col-start-1 col-end-3'>
                <h5 className={darkerText}>{condition}</h5>
                <h2 className="leading-5 font-semibold  line-clamp-2 text-ellipsis">{title}</h2>
            </div>
        )
    }

    useEffect(() => {
        setIsLoad(false)
    }, [img])

    return (
        <div className={`${isMobile ? 'grid grid-cols-[minmax(20px,160px)_auto] grid-rows-[auto_1fr]' : 'flex'} gap-5 p-3 rounded-lg  bg-dbm text-base text-neutral-300 w-full`}>
            {isMobile && conditioAndTitle()}
            <div className={` ${!isLoad && 'animate-pulse'} flex justify-center items-center p-1 w-full max-w-[10rem] aspect-square bg-white rounded`}>
                {/* <div className="h-full w-full bg-contain bg-no-repeat bg-center bg-white" style={{ backgroundImage: `url(${img})` }} /> */}
                <img src={img} onLoad={() => setIsLoad(true)} className={`${isLoad ? 'opacity-100' : 'opacity-0'} max-h-full max-w-full transition-opacity duration-800`} />
            </div>
            <div className={`${isMobile ? 'justify-evenly gap-2' : 'justify-between'} w-full flex flex-col `}>
                <div className="flex flex-col gap-2">
                    {!isMobile && conditioAndTitle()}
                    <div className="flex gap-2 justify-between">
                        <p className=" text-sm leading-4 break-all"><span className={darkerText}>Model:</span> {model}</p>
                        <p className=" text-sm leading-4"><span className={darkerText}>SKU:</span> {sku}</p>
                    </div>
                </div>
                {orderable === 'PreOrder' && <h2 className=' text-amber-4 leading-5'>Pre-Order</h2>}
                {orderable === 'SoldOut' && <h2 className=' text-red-4 leading-5'>Sold Out</h2>}
                <div className="flex justify-between items-center">

                    <p className="text-lg leading-4">
                        <span className={darkerText}>Price: </span>${price} {price < oldPrice && <span className='line-through decoration-neutral-5 decoration-2 text-neutral-5'>{oldPrice}</span>}
                    </p>
                    <Btn asChild variant='base'>
                        <Link to={`/product/${sku}`}>
                            See details
                        </Link>
                    </Btn>
                </div>
            </div>
        </div>
    )
}
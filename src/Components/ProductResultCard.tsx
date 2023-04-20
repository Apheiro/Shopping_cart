import Btn from "./Core/Btn";

interface Props {
    img: string,
    condition: string,
    title: string,
    model: string,
    sku: string,
    price: number,
}
export default function ProductResultCard({ img, condition, title, model, sku, price }: Props) {
    const darkerText = 'text-neutral-500 leading-4 font-semibold text-sm'

    return (
        <div className="flex gap-5 p-3 rounded-lg  bg-db-1  text-base text-neutral-300 w-full max-w-4xl">
            <div className="p-1 w-full max-w-[10rem] aspect-square bg-white rounded">
                <div className="h-full w-full bg-contain bg-no-repeat bg-center bg-white" style={{ backgroundImage: `url(${img})` }} />
            </div>
            <div className="w-full flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                    <div>
                        <h5 className={darkerText}>{condition}</h5>
                        <h2 className="leading-5 font-semibold line-clamp-2">{title}</h2>
                    </div>
                    <div className="flex justify-between sm:gap-[50%] sm:justify-normal ">
                        <p className=" text-sm leading-4"><span className={darkerText}>Model:</span> {model}</p>
                        <p className=" text-sm leading-4"><span className={darkerText}>SKU:</span> {sku}</p>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-lg leading-4"><span className={darkerText}>Price: </span>${price}</p>
                    <Btn variant='base'>See details</Btn>
                </div>
            </div>
        </div>
    )
}
import Btn from "./Core/Btn"

interface Props {
    condition: string,
    title: string,
    model: string,
    sku: string,
    price: number,
}

export default function ProductAddPageCard({ condition, title, model, sku, price }: Props) {
    return (
        <div className="flex flex-col gap-10 w-full bg-dbm rounded-lg p-3 text-neutral-300 font-semibold">
            <div className="flex flex-col gap-4">
                <div className="leading-5">
                    <p className="text-neutral-500 ">{condition}</p>
                    <h2 className="line-clamp-3">{title}</h2>
                </div>
                <div className="flex justify-between">
                    <p><span className="text-neutral-500">Model: </span>{model}</p>
                    <p><span className="text-neutral-500">SKU: </span>{sku}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col leading-5">
                    <p className="text-neutral-500 leading-5">Price</p>
                    <p className="text-xl leading-5">${price}</p>
                </div>
                <Btn variant='base'>Add to cart</Btn>
            </div>
        </div>
    )
}
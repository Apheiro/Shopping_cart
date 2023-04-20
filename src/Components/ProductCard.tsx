interface Props {
    img: string,
    title: string,
    price: number,
    oldPrice?: number,
    link?: string
}

export default function ProductCard({ img, title, price, oldPrice, link }: Props) {
    return (
        <a href={link} className='w-48 h-64 p-2 bg-db-1 rounded-lg flex flex-col gap-2 cursor-pointer select-none'>
            <div className="p-1 h-36 bg-white rounded shrink-0">
                <div className="h-full w-full bg-contain bg-no-repeat bg-center bg-white" style={{ backgroundImage: `url(${img})` }} />
            </div>
            <div className=" h-full flex flex-col justify-between ">
                <h3 className='text-sm text-stone-300 leading-4'>{title}</h3>
                <div className="flex justify-between text-stone-300 font-bold">
                    <p className=''>${price}</p>
                    {!!oldPrice && <p className='opacity-50 line-through'>${oldPrice}</p>}
                </div>
            </div>
        </a>
    )
}
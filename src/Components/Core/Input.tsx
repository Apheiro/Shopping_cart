interface Props {
    variant: 'search' | 'price' | 'quantity',
    rangeType?: 'min' | 'max'
}


export default function Input({ variant, rangeType }: Props) {
    const focusStyle: string = 'text-neutral-300 text-opacity-50 focus:text-opacity-100 transition-colors duration-500'
    const removeInputBtn: string = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'

    return (
        <>
            {
                variant === 'search' &&
                <input type="text" placeholder="Search" className={`outline-none bg-neutral-500 bg-opacity-10 rounded-lg p-1 placeholder:text-neutral-500 text-center focus:bg-opacity-30 font-semibold ${focusStyle}`} />
            }

            {
                variant === 'price' &&
                <label htmlFor="" className={`flex gap-2 bg-db rounded-lg p-1 font-semibold`}>
                    <p className={`text-stone-300 text-opacity-50`} >$</p>
                    <input type="number" placeholder={rangeType} className={`bg-transparent outline-none w-14 ${focusStyle} ${removeInputBtn}`} name="" id="" />
                </label>
            }

            {
                variant === 'quantity' &&
                <label htmlFor="" className={`flex gap-2 bg-db rounded-lg p-1 font-semibold`}>
                    <input type="number" placeholder={rangeType} className={`bg-transparent outline-none w-14 ${focusStyle} ${removeInputBtn}`} name="" id="" />
                </label>
            }
        </>

    )
}
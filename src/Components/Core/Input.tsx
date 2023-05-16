interface Props {
    variant: 'search' | 'price' | 'quantity',
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    name?: string,
    id?: string,
    defaultValue?: string | number
}

function Input({ variant, ...Props }: Props) {
    const focusStyle: string = 'text-neutral-300 text-opacity-50 focus:text-opacity-100 transition-colors duration-500'
    const removeInputBtn: string = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
    return (
        <>
            {
                variant === 'search' &&
                <input
                    type="search"
                    placeholder="Search"
                    autoComplete="off"
                    className={`outline-none bg-transparent rounded-l-lg p-1 placeholder:text-neutral-500 text-center focus:bg-neutral-500 focus:bg-opacity-20 max-w-sm w-full font-semibold ${focusStyle}`}
                    {...Props}
                />
            }
            {
                variant === 'price' &&
                <label htmlFor="" className={`flex gap-2 bg-db rounded-lg p-1 font-semibold`}>
                    <p className={`text-stone-300 text-opacity-50`} >$</p>
                    <input
                        type="number"
                        className={`bg-transparent outline-none w-14 ${focusStyle} ${removeInputBtn}`}
                        {...Props}
                    />
                </label>
            }
            {
                variant === 'quantity' &&
                <label htmlFor="" className={`flex gap-2 bg-db rounded-lg p-1 font-semibold`}>
                    <input
                        type="number"
                        max={999}
                        className={`bg-transparent outline-none w-7 ${focusStyle} ${removeInputBtn}`}
                        {...Props}
                    />
                </label>
            }
        </>

    )
}

export default Input
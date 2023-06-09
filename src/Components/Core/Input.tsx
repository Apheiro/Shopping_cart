import { forwardRef, Ref } from "react"

interface Props {
    variant: 'search' | 'price' | 'quantity',
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    name?: string,
    id?: string,
    defaultValue?: string | number,
    customClass?: string,
    // ref?: React.RefObject<HTMLInputElement>
}

const Input = forwardRef(({ variant, customClass, ...Props }: Props, ref: Ref<HTMLInputElement>) => {
    const focusStyle: string = ' text-neutral-9/50 focus:text-neutral-9 dark:(text-neutral-3/50 focus:text-neutral-3) transition-colors duration-500'
    const removeInputBtn: string = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
    return (
        <>
            {
                variant === 'search' &&
                <input
                    type="search"
                    placeholder="Search"
                    autoComplete="off"
                    className={`${customClass} outline-none bg-neutral-3  rounded-lg p-1 placeholder:text-neutral-6 focus:bg-neutral-8/10 dark:(placeholder:text-neutral-5 focus:bg-neutral-5/20 bg-db) text-center max-w-sm w-full font-semibold ${focusStyle}`}
                    ref={ref}
                    {...Props}
                />
            }
            {
                variant === 'price' &&
                <label htmlFor="" className={`flex gap-2 bg-neutral-3 dark:(bg-db) rounded-lg p-1 font-semibold`}>
                    <p className={`dark:(text-neutral-3) text-opacity-50`} >$</p>
                    <input
                        type="number"
                        ref={ref}
                        className={`bg-transparent outline-none w-14 ${focusStyle} ${removeInputBtn}`}
                        {...Props}
                    />
                </label>
            }
            {
                variant === 'quantity' &&
                <label htmlFor="" className={`flex gap-2 dark:(bg-db) rounded-lg p-1 font-semibold`}>
                    <input
                        type="number"
                        ref={ref}
                        max={999}
                        className={`bg-transparent outline-none w-7 ${focusStyle} ${removeInputBtn}`}
                        {...Props}
                    />
                </label>
            }
        </>

    )
})

export { Input }
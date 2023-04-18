interface Props {
    variant: 'text' | 'number',
    rangeType?: 'min' | 'max'
}


export default function InputText({ variant, rangeType }: Props) {
    const focusStyle: string = 'text-stone-300 text-opacity-50 focus:text-opacity-100 transition-colors duration-500'
    const removeInputBtn: string = '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'

    return (
        <div>
            {
                variant === 'text' ?
                    <input type="text" className={`outline-none bg-stone-200 bg-opacity-20 rounded-lg p-1 font-semibold ${focusStyle}`} />
                    :
                    <>
                        <label htmlFor="" className={`flex gap-2 bg-db rounded-lg p-1 font-semibold`}>
                            <p className={`text-stone-300 text-opacity-50`} >$</p>
                            <input type="number" placeholder={rangeType} className={`bg-transparent outline-none w-14 ${focusStyle} ${removeInputBtn}`} name="" id="" />
                        </label>
                    </>
            }
        </div>

    )
}
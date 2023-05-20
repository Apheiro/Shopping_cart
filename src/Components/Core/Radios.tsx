import { useId, useState } from 'react'
import { motion } from 'framer-motion'
interface Props {
    Title: string | JSX.Element,
    name: string,
    variantStyle: 'clasic' | 'compact',
    value: string,
    radioSelectedDefault: string
}
function Radios({ Title, value, radioSelectedDefault, variantStyle, ...Props }: Props) {
    const [radioSelected, setRadioSelected] = useState<string>(radioSelectedDefault);
    const id: string = useId();

    return (
        <>
            {
                variantStyle === 'clasic' &&
                <label htmlFor={id} className='flex items-center gap-2 cursor-pointer select-none'>
                    <div className='flex justify-center items-center rounded-md bg-transparent w-5 aspect-square p-0.5 border-2 border-solid border-neutral-7 dark:(border-gray-300)'>
                        <input type="radio" onChange={(e) => { setRadioSelected(e.target.value) }} id={id} value={value} className='peer hidden' defaultChecked={value === radioSelected} {...Props} />
                        <span className={`content-[''] h-0 aspect-square peer-checked:h-full rounded bg-neutral-7 dark:(bg-neutral-2) transition-height`} />
                    </div>
                    {Title}
                </label>
            }

            {
                variantStyle === 'compact' &&
                <label htmlFor={id}>
                    <input type="radio" onChange={(e) => { setRadioSelected(e.target.value) }} id={id} value={value} className='peer hidden' defaultChecked={value === radioSelected} {...Props} />
                    <motion.div
                        className='flex p-3 shadow-md rounded-lg justify-center bg-neutral-1 peer-checked:bg-neutral-3 transition-colors dark:(bg-dbl peer-checked:bg-db)'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, type: 'spring' }}
                    >
                        {Title}
                    </motion.div>
                </label>
            }
        </>
    )
}

export { Radios }
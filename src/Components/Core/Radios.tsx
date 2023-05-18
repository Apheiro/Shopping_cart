import { useId } from 'react'

interface Props {
    Title: string
    name: string,
    value: string,
    radioSelected: string,
    setRadioSelected: React.Dispatch<React.SetStateAction<string>>
}
function Radios({ Title, value, radioSelected, setRadioSelected, ...Props }: Props) {
    const id: string = useId();
    return (
        <label htmlFor={id} className='text-neutral-2 flex items-center gap-2 cursor-pointer select-none'>
            {/* <input type="checkbox" id={id} className='hidden' /> */}
            <div className='flex justify-center items-center rounded-md bg-transparent w-5 aspect-square p-0.5 border-2 border-solid border-gray-300 '>
                <span className={`content-[''] rounded bg-neutral-2 aspect-square ${radioSelected} ${value} ${value === radioSelected ? 'h-full' : 'h-0'} transition-height`} />
            </div>
            <input type="radio" onChange={(e) => { setRadioSelected(e.target.value) }} id={id} value={value} className='hidden' {...Props} />
            {Title}
        </label>
    )
}

export { Radios }
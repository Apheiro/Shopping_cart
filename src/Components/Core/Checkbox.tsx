import { useId, useState } from 'react'
export default function Checkbox() {
    const [checked, setChecked] = useState<boolean>(false)
    // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {setChecked(e.target.checked)}
    const id: string = useId();
    return (
        <label htmlFor={id} className='text-stone-300 flex items-center gap-2 cursor-pointer select-none'>
            {/* <input type="checkbox" id={id} className='hidden' /> */}
            <div className='flex justify-center items-center rounded-md bg-transparent w-5 aspect-square p-0.5 border-2 border-solid border-gray-300 '>
                <span className={`content-[''] rounded bg-white aspect-square ${checked ? 'h-full ' : 'h-0'} transition-[height]`}></span>
            </div>
            <input type="checkbox" onChange={(e) => { setChecked(e.target.checked) }} id={id} className='hidden' />
            test
        </label>
    )
}
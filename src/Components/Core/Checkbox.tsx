import { useId, useState } from 'react'

interface Props {
    Name: string
}

export default function Checkbox({ Name }: Props) {
    const [checked, setChecked] = useState<boolean>(false);

    function test(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('works')
        setChecked(e.target.checked)
    }
    // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {setChecked(e.target.checked)}
    const id: string = useId();
    return (
        <label htmlFor={id} className='text-neutral-2 flex items-center gap-2 cursor-pointer select-none'>
            {/* <input type="checkbox" id={id} className='hidden' /> */}
            <div className='flex justify-center items-center rounded-md bg-transparent w-5 aspect-square p-0.5 border-2 border-solid border-gray-300 '>
                <span className={`content-[''] rounded bg-neutral-2 aspect-square ${checked ? 'h-full ' : 'h-0'} transition-[height]`} />
            </div>
            <input type="checkbox" onChange={test} id={id} className='hidden' />
            {Name}
        </label>
    )
}
import Btn from './Core/Btn';
import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

interface Props {
    title: string,
    description: string,
    variant: 'folding' | 'static'
}

export default function InfoCard({ title, description, variant }: Props) {
    const [foldCard, setFoldCard] = useState<boolean>(false)
    const titleStyle: string = 'flex gap-3 items-center text-neutral-400 text-xl font-bold flex justify-between'
    const descriptionStyle: string = 'text-neutral-300 text-sm'
    return (
        <div className='bg-db-1 rounded-lg p-3 w-full flex flex-col gap-2'>
            {
                variant === 'static' &&
                <>
                    <div className={titleStyle}>
                        <h2>{title}</h2>
                    </div>
                    <p className={descriptionStyle}>
                        {description}
                    </p>
                </>
            }
            {
                variant === 'folding' &&
                <>
                    <div className={titleStyle}>
                        <h2>{title}</h2>
                        <Btn variant='cart' onClick={() => { setFoldCard(!foldCard); }}><IconChevronDown className={`${foldCard && 'rotate-180'} transition-transform`} /></Btn>
                    </div>
                    {foldCard && <p className={descriptionStyle}>{description}</p>}
                </>
            }
        </div>
    )
}
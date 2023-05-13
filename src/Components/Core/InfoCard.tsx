import Btn from './Btn';
import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

interface Props {
    title: string,
    description: string | JSX.Element,
    customClass?: string,
    variant: 'folding' | 'static'
}

export default function InfoCard({ title, description, variant, customClass }: Props) {
    const [foldCard, setFoldCard] = useState<boolean>(false)
    const titleStyle: string = 'flex items-center text-neutral-400 text-md 2sm:text-xl font-bold '
    const descriptionStyle: string = 'text-neutral-300 text-sm'
    return (
        <div className={`${customClass} bg-dbm h-fit rounded-lg p-3 w-full flex flex-col gap-2`} key={crypto.randomUUID()}>
            {
                variant === 'static' &&
                <>
                    <div>
                        <h2 className={titleStyle}>{title}</h2>
                    </div>
                    <p className={descriptionStyle}>
                        {description}
                    </p>
                </>
            }
            {
                variant === 'folding' &&
                <>
                    <div className='flex justify-between items-center'>
                        <h2 className={titleStyle}>{title}</h2>
                        <Btn variant='cart' onClick={() => { setFoldCard(!foldCard); }}><IconChevronDown className={`${foldCard && 'rotate-180'} transition-transform`} /></Btn>
                    </div>
                    {foldCard && <div className={`${descriptionStyle} flex flex-col gap-3`}>{description}</div>}
                </>
            }
        </div>
    )
}
import Btn from './Btn';
import { useState, useRef, useEffect } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

interface Props {
    title: string,
    description: string | JSX.Element,
    customClass?: string,
    variant: 'folding' | 'static'
}

export default function InfoCard({ title, description, variant, customClass }: Props) {
    const [foldCard, setFoldCard] = useState<boolean>(false)
    const [seeMore, setSeeMore] = useState<boolean>(false)
    const [itClamp, setItClamp] = useState<boolean>(false)

    const titleStyle: string = 'flex items-center text-neutral-400 text-md 2sm:text-xl font-bold'
    const descriptionStyle: string = `text-neutral-300 text-sm text-justify ${!seeMore && 'line-clamp-11'}`
    const paraRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (variant === 'static') {
            const height = paraRef.current?.clientHeight ?? 0
            const scrollHeight = paraRef.current?.scrollHeight ?? 0
            setItClamp(height < scrollHeight)
        }
    }, [description])

    return (
        <div className={`${customClass} bg-dbm h-fit rounded-lg p-3 w-full flex flex-col gap-2`} key={crypto.randomUUID()}>
            {
                variant === 'static' &&
                <>
                    <div>
                        <h2 className={titleStyle}>{title}</h2>
                    </div>
                    <p ref={paraRef} className={descriptionStyle}>
                        {description}
                    </p>
                    {itClamp && <Btn variant='base' onClick={() => setSeeMore(!seeMore)} classNameCustom={'!bg-dbm !p-0 w-fit justify-end self-end'}>  {seeMore ? 'Show less' : 'Show more'}</Btn>}
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
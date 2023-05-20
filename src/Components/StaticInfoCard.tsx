import { Btn } from './Core/Exports';
import { useState, useRef, useEffect } from 'react';

interface Props {
    title: string,
    description: string | JSX.Element,
    customClass?: string,
}

function StaticInfoCard({ title, description, customClass }: Props): JSX.Element {
    const titleStyle: string = 'flex items-center text-neutral-7 dark:(text-neutral-400) text-md 2sm:text-xl font-bold'
    const [seeMore, setSeeMore] = useState<boolean>(false)
    const [itClamp, setItClamp] = useState<boolean>(false)
    const descriptionStyle: string = `text-sm text-justify ${!seeMore && 'line-clamp-11 break-words'} `
    const paraRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const height = paraRef.current?.clientHeight ?? 0
        const scrollHeight = paraRef.current?.scrollHeight ?? 0
        setItClamp(height < scrollHeight)
    }, [description])

    return (
        <div className={`${customClass} bg-neutral-1 dark:(bg-dbm) h-fit rounded-lg p-3 w-full flex flex-col gap-2 shadow-md`}>
            <div>
                <h2 className={titleStyle}>{title}</h2>
            </div>
            <p ref={paraRef} className={descriptionStyle} >
                {description}
            </p>
            {itClamp &&
                <Btn
                    variant='base'
                    onClick={() => setSeeMore(!seeMore)}
                    classNameCustom={' !bg-transparent !p-0 w-fit justify-end self-end'}
                >
                    {seeMore ? 'Show less' : 'Show more'}
                </Btn>}
        </div>
    )
}

export { StaticInfoCard }
import { Btn } from './Core/Exports';
import { useState, useRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { motion } from 'framer-motion'

interface Props {
    title: string,
    description: string | JSX.Element,
    customClass?: string,
}

function FoldingInfoCard({ title, description, customClass }: Props): JSX.Element {
    const titleStyle: string = 'flex items-center text-neutral-400 text-md 2sm:text-xl font-bold'
    const [open, setOpen] = useState<boolean>(false)
    const [showCardData, setShowCardData] = useState<boolean>(false)
    const foldingCardRef = useRef<HTMLDivElement>(null)
    const isOpen = () => foldingCardRef.current?.clientHeight === foldingCardRef.current?.scrollHeight
    const FCardProps = {
        ref: foldingCardRef,
        animate: { height: open ? 'fit-content' : '64px' },
        onAnimationComplete: () => isOpen() && setShowCardData(true),
        className: `${customClass ?? ''} bg-dbm rounded-lg w-full h-16 max-w-xl flex flex-col gap-2 overflow-hidden`
    }

    return (
        <motion.div {...FCardProps}>
            <div className='flex justify-between items-center m-3 mb-0'>
                <h2 className={titleStyle}>{title}</h2>
                <Btn variant='cart'
                    onClick={() => {
                        !isOpen() && setOpen(true)
                        isOpen() && setShowCardData(false)
                    }}
                >
                    <IconChevronDown className={`${open && 'rotate-180'} transition-transform`} />
                </Btn>
            </div>
            <motion.div
                className='m-3 mt-0 op-0'
                animate={{ opacity: showCardData ? 1 : 0 }}
                onAnimationComplete={() => isOpen() && !showCardData && setOpen(false)}
            >
                {description}
            </motion.div>
        </motion.div>
    )
}

export { FoldingInfoCard }
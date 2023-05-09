import { useState, useEffect } from 'react'
import { useDidUpdate } from '@mantine/hooks'
import Btn from "./Core/Btn"
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react"

interface Props {
    totalPages: number,
    customClass?: string
}

export default function Pagination({ totalPages, customClass }: Props) {
    const [indexSelected, setIndexSelected] = useState(1)
    const [indexPages, setIndexPages] = useState<number[]>([1, 2, 3])

    function changeIndexPage(e: React.MouseEvent<HTMLButtonElement>) {
        if (e.currentTarget.id === 'next' && indexSelected !== totalPages) {
            setIndexSelected(indexSelected + 1)
        } else if (e.currentTarget.id === 'previous' && indexSelected !== 1) {
            setIndexSelected(indexSelected - 1)
        }
    }

    useDidUpdate(() => {
        setIndexPages(indexPagesFn())
    }, [indexSelected])

    function indexPagesFn() {
        let indexPagesArray: number[] = [indexSelected];
        for (let i = indexSelected; i < indexSelected + 3; i++) {
            if (i !== indexSelected && i <= totalPages)
                indexPagesArray.push(i)
        }
        for (let i = indexSelected; i > indexSelected - 3; i--) {
            if (i !== indexSelected && i > 0)
                indexPagesArray.push(i)
        }
        indexPagesArray.sort((a, b) => a - b)
        return indexPagesArray
    }

    return (
        <div className={`${customClass} flex gap-2 items-center `}>
            <Btn variant="base" id='previous' onClick={changeIndexPage} classNameCustom="!p-1"><IconChevronLeft /></Btn>
            {!indexPages.includes(1) && <Btn variant='cart' onClick={() => { setIndexSelected(1) }}>1...</Btn>}
            {
                indexPages.map((index) =>
                    <Btn variant="cart" key={index} onClick={() => { setIndexSelected(index) }} classNameCustom={`${indexSelected === index && '!bg-dbl !opacity-100'} text-sm`}>{index}</Btn>
                )
            }
            {!indexPages.includes(totalPages) && <Btn variant='cart' onClick={() => { setIndexSelected(totalPages) }}>...{`${totalPages}`}</Btn>}
            <Btn variant="base" id='next' onClick={changeIndexPage} classNameCustom="!p-1"><IconChevronRight /></Btn>
        </div>
    )
}
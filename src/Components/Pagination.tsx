import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Btn from "./Core/Btn"
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react"

interface Props {
    totalPages: number,
    customClass?: string,
    defaultIndex: number
}

export default function Pagination({ totalPages, customClass, defaultIndex }: Props) {
    const [indexSelected, setIndexSelected] = useState(defaultIndex)
    const [indexPages, setIndexPages] = useState<number[]>([1, 2, 3])
    const location = useLocation()
    const navigate = useNavigate()

    function changePageUrl(index: number) {
        setIndexSelected(index)
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('pg', index.toString())
        navigate(`/search?${searchParams.toString()}`)
    }

    function changeIndexPage(e: React.MouseEvent<HTMLButtonElement>) {
        if (e.currentTarget.id === 'next' && indexSelected !== totalPages) {
            changePageUrl(indexSelected + 1)
        } else if (e.currentTarget.id === 'previous' && indexSelected !== 1) {
            changePageUrl(indexSelected - 1)
        }
    }

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

    useEffect(() => {
        setIndexSelected(defaultIndex)
        setIndexPages(indexPagesFn())
    }, [defaultIndex, indexSelected])

    return (
        <div className={`${customClass} flex gap-2 items-center `}>
            <Btn variant="base" id='previous' onClick={changeIndexPage} classNameCustom="!p-1"><IconChevronLeft /></Btn>
            {
                !indexPages.includes(1) &&
                <Btn
                    variant='cart'
                    onClick={() => { changePageUrl(1) }}
                >
                    1...
                </Btn>
            }
            {
                indexPages.map((index) =>
                    <Btn
                        variant="cart"
                        key={index}
                        onClick={() => { changePageUrl(index) }}
                        classNameCustom={`${indexSelected === index && '!bg-dbl !opacity-100'} text-sm`}
                    >
                        {index}
                    </Btn>
                )
            }
            {
                !indexPages.includes(totalPages) &&
                <Btn
                    variant='cart'
                    onClick={() => { changePageUrl(totalPages) }}
                >
                    ...{`${totalPages}`}
                </Btn>}
            <Btn variant="base" id='next' onClick={changeIndexPage} classNameCustom="!p-1"><IconChevronRight /></Btn>
        </div>
    )
}
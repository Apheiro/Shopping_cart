import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Btn from "./Core/Btn"
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react"
import useDebounceFn from '../hooks/useDebounceFn'

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
    const changePageUrlDebounce = useDebounceFn(changePageUrl, 800)

    function changePageUrl() {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('pg', indexSelected.toString())
        navigate(`/search?${searchParams.toString()}`)
    }

    function changeIndexPage(e: React.MouseEvent<HTMLButtonElement>) {
        if (e.currentTarget.id === 'next' && indexSelected !== totalPages) {
            setIndexSelected(indexSelected + 1)
            changePageUrlDebounce()
        } else if (e.currentTarget.id === 'previous' && indexSelected !== 1) {
            setIndexSelected(indexSelected - 1)
            changePageUrlDebounce()
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
        setIndexPages(indexPagesFn())
    }, [indexSelected])

    return (
        <div className={`${customClass} flex justify-between w-full max-w-sm items-center self-center justify-self-center`}>
            <Btn variant="base" id='previous' onClick={changeIndexPage} classNameCustom="!p-1"><IconChevronLeft /></Btn>
            {
                !indexPages.includes(1) &&
                <Btn
                    variant='cart'
                    onClick={() => { setIndexSelected(1), changePageUrlDebounce() }}
                >
                    1...
                </Btn>
            }
            {
                indexPages.map((index) =>
                    <Btn
                        variant="cart"
                        key={index}
                        onClick={() => { setIndexSelected(index), changePageUrlDebounce() }}
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
                    onClick={() => { setIndexSelected(totalPages), changePageUrlDebounce() }}
                >
                    ...{`${totalPages}`}
                </Btn>}
            <Btn variant="base" id='next' onClick={changeIndexPage} classNameCustom="!p-1"><IconChevronRight /></Btn>
        </div>
    )
}
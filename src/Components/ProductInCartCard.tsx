import { Btn, Input } from "./Core/Exports";
import { useState, useRef } from 'react'
import { useLocation, useSubmit, Link } from "react-router-dom"
import { IconAlertTriangle } from '@tabler/icons-react'
import useDebounceFn from '../hooks/useDebounceFn'
import { motion } from "framer-motion"

interface Props {
    img: string,
    title: string,
    price: number,
    quantity: number,
    quantityLimit: number,
    sku: number,
    setShowElements: React.Dispatch<React.SetStateAction<boolean>>,
}

function createFormData(formType: 'change' | 'remove', actualURL: string, product: number, quantity?: string) {
    const formData = new FormData()
    if (formType === 'change' && quantity) {
        formData.append('actualUrl', actualURL)
        formData.append('product', product.toString())
        formData.append('quantity', quantity.toString())
    } else {
        formData.append('actualUrl', actualURL)
        formData.append('product', product.toString())
    }
    return formData
}

function ProductInCartCard({ img, title, price, quantity, quantityLimit, sku, setShowElements }: Props) {
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [overLimit, setOverLimit] = useState(false)
    const [expandProductList, setExpandProductList] = useState(false)
    const [showRemoveBtn, setShowRemoveBtn] = useState(false)
    const productRef = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const submit = useSubmit()
    const submitDebounced = useDebounceFn(submit, 800)
    const darkerText = 'text-neutral-500 leading-4'
    const isOpen = () => productRef.current?.clientHeight === productRef.current?.scrollHeight


    function changeQuantity(e: React.ChangeEvent<HTMLInputElement>) {
        if (parseInt(e.currentTarget.value) > quantityLimit) { setOverLimit(true) }
        else {
            setOverLimit(false)
            const formData = createFormData('change', `${location.pathname}${location.search}`, sku, e.currentTarget.value)
            submitDebounced(formData, { method: 'POST' })
        }
    }

    function deleteItemFromCart() {
        const formData = createFormData('remove', `${location.pathname}${location.search}`, sku)
        setDisabledBtn(true)
        submit(formData, { method: 'POST' })
    }

    const productProps = {
        ref: productRef,
        className: 'flex flex-col h-27 gap-3 rounded-lg bg-dbm text-base text-neutral-300 font-semibold overflow-hidden mb-4',
        initial: { opacity: 0 },
        animate: { opacity: 1, height: expandProductList ? 'auto' : '108px' },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        onMouseEnter: () => setExpandProductList(true),
        onMouseLeave: () => {
            isOpen() && setShowRemoveBtn(false)
            !isOpen() && setExpandProductList(false)
        },
        onAnimationComplete: () => isOpen() && setShowRemoveBtn(true)

    }

    const buttonsProps = {
        className: "flex flex-wrap gap-2 items-center justify-between m-3 mt-0 ",
        animate: { opacity: showRemoveBtn ? 1 : 0 },
        onAnimationComplete: () => isOpen() && !showRemoveBtn && setExpandProductList(false),
        transition: { duration: 0.15 }
    }

    return (
        <motion.div {...productProps} >
            <div className="flex min-h-21 gap-5 m-3 mb-0">
                <div className="p-1 min-w-21 aspect-square bg-white rounded">
                    <div className="h-full w-full bg-contain bg-no-repeat bg-center bg-white" style={{ backgroundImage: `url(${img})` }} />
                </div>
                <div className="w-full grid grid-cols-2 grid-rows-[1fr_auto] flex-col justify-between gap-3">
                    <h2 className="leading-5 font-semibold line-clamp-2 col-start-1 col-end-3">{title}</h2>
                    <p className="leading-4 self-center justify-self-start">
                        <span className={darkerText}>Price: </span>${price}
                    </p>
                    <div className="flex gap-2 items-center justify-self-end">
                        <div className={`flex items-center gap-1 ${overLimit && '!text-amber-4'}`}>
                            {overLimit && <IconAlertTriangle height={15} width={15} />}
                            <p className={`${darkerText} ${overLimit && '!text-amber-4'}`}>Quantity:</p>
                        </div>
                        <Input variant="quantity" name="quantity" defaultValue={quantity} onChange={changeQuantity} />
                    </div>
                </div>
            </div>
            <motion.div {...buttonsProps}>
                <div className="flex gap-2">
                    <Btn variant='removeCart' disabled={disabledBtn} onClick={deleteItemFromCart}>Remove</Btn>
                    <Btn asChild variant="base" onClick={() => { setShowElements(false) }}>
                        <Link to={`/product/${sku}`}>Go to product page</Link>
                    </Btn>
                </div>
                <div>
                    <p className="text-lg" ><span className={darkerText}>Total: </span>${price * quantity}</p>
                </div>
            </motion.div>
        </motion.div>
    )
}

export { ProductInCartCard }
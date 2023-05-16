import Btn from "./Core/Btn";
import Input from "./Core/Input";
import { useState } from 'react'
import { useLocation, useSubmit, Link } from "react-router-dom"
import useDebounceFn from '../hooks/useDebounceFn'
interface Props {
    img: string,
    title: string,
    price: number,
    quantity: number,
    sku: number,
    hidde: boolean,
    setHidde: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductInCartCard({ img, title, price, quantity, sku, hidde, setHidde }: Props) {
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [showRemoveBtn, setShowRemoveBtn] = useState(false)
    const location = useLocation()
    const submit = useSubmit()
    const submitDebounced = useDebounceFn(submit, 800)
    const darkerText = 'text-neutral-500 leading-4'

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

    return (
        <div onMouseEnter={() => { setShowRemoveBtn(true) }} onMouseLeave={() => { setShowRemoveBtn(false) }} className="flex flex-col p-3 gap-3 rounded-lg bg-dbm text-base text-neutral-300 font-semibold">
            <div className="flex gap-5 w-full">
                <div className="p-1 w-24 aspect-square bg-white rounded">
                    <div className="h-full w-full bg-contain bg-no-repeat bg-center bg-white" style={{ backgroundImage: `url(${img})` }} />
                </div>

                <div className="w-full grid grid-cols-2 grid-rows-[1fr_auto] flex-col justify-between gap-3">
                    <h2 className="leading-5 font-semibold line-clamp-2 col-start-1 col-end-3">{title}</h2>
                    <p className="leading-4 self-center justify-self-start"><span className={darkerText}>Price: </span>${price}</p>
                    <div className="flex gap-2 items-center w-30 justify-self-end">
                        <p className={darkerText}>Quantity:</p>
                        <Input
                            variant="quantity"
                            name="quantity"
                            defaultValue={quantity}
                            onChange={(e) => {
                                const formData = createFormData('change', `${location.pathname}${location.search}`, sku, e.currentTarget.value)
                                submitDebounced(formData, { method: 'POST' })
                            }}
                        />
                    </div>
                </div>
            </div>
            {showRemoveBtn &&
                <div className="flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex gap-2">
                        <Btn variant='removeCart' disabled={disabledBtn}
                            onClick={() => {
                                const formData = createFormData('remove', `${location.pathname}${location.search}`, sku)
                                setDisabledBtn(true)
                                submit(formData, { method: 'POST' })
                            }}
                        >
                            Remove
                        </Btn>
                        <Btn asChild variant="base" onClick={() => { setHidde(!hidde) }}>
                            <Link to={`/product/${sku}`}>
                                Go to product page
                            </Link>
                        </Btn>
                    </div>


                    <div>
                        <p className="text-lg" ><span className={darkerText}>Total: </span>${price * quantity}</p>
                    </div>
                </div>


            }
        </div>

    )
}
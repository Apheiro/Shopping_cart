import { addToCart, ReqParams, getCartProducts, getProduct, ProductInfo } from "../utils/productsRequests"
import { LoaderFunctionArgs, useLoaderData, ActionFunctionArgs, useSubmit } from "react-router-dom"
import { details, features, images, description } from "../utils/dataFormatter"
import { Btn } from "../Components/Core/Exports"
import { ImagesProduct, StaticInfoCard, FoldingInfoCard } from "../Components/Exports"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"

export async function loader(paramsLoader: LoaderFunctionArgs) {
    const product = await getProduct(paramsLoader.params.sku ?? '')
    const productsInCart = await getCartProducts()
    const isProductInCart = !!productsInCart.find(p => p.sku === product.sku.toString())
    return { product, isProductInCart }
}
export async function action(paramsAction: ActionFunctionArgs) {
    const formData = await paramsAction.request.formData()
    let product: ReqParams = {};
    formData.forEach((value, key) => product[key] = value.toString())
    addToCart(product)
    return { product }
}

const productAnimation = {
    initial: {
        opacity: 0,
        scale: 0.9,
        transition: { scale: { type: 'spring', bounce: 0.5 }, opacity: { duration: 0.8 } }
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { scale: { type: 'spring', bounce: 0.5 }, opacity: { duration: 0.8 } }
    }
}

export default function Product() {
    const { product, isProductInCart } = useLoaderData() as { product: ProductInfo, isProductInCart: boolean };
    const [disabledBtn, setDisabledBtn] = useState(isProductInCart)
    const submit = useSubmit()

    useEffect(() => {
        setDisabledBtn(isProductInCart)
    }, [isProductInCart])

    function createFormData(name: string, salePrice: number, image: string, sku: string, quantity: number, quantityLimit: number): FormData {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('salePrice', salePrice.toString())
        formData.append('images', image)
        formData.append('sku', sku.toString())
        formData.append('quantity', quantity.toString())
        formData.append('quantityLimit', quantityLimit.toString())
        return formData
    }

    function handleSubmit(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        setDisabledBtn(true)
        const formData = createFormData(product.name, product.salePrice, product.image, product.sku, 1, product.quantityLimit)
        submit(formData, { method: 'POST' })
    }

    function buttonState(productOrderable: 'Available' | 'SoldOut' | 'PreOrder'): JSX.Element {
        switch (productOrderable) {
            case 'Available':
                return <Btn variant="base" disabled={disabledBtn} onClick={handleSubmit} classNameCustom={disabledBtn && '!bg-db'}>{isProductInCart ? 'Added' : 'Add to cart'}</Btn>
            case 'SoldOut':
                return <Btn variant="base" disabled classNameCustom={'!bg-db'}>Sold out</Btn>
            case 'PreOrder':
                return <Btn variant="base" disabled={disabledBtn} onClick={handleSubmit} classNameCustom={`${disabledBtn && '!bg-db'} !bg-amber-4/30 !color-amber-4`}>{isProductInCart ? 'Added' : 'Pre-order'}</Btn>
        }
    }

    return (
        <motion.section
            className="min-h-screen w-full p-4 py-21"
            initial={'initial'}
            animate={'animate'}
            variants={productAnimation}
            transition={{ type: 'spring', stiffness: 100, damping: 2 }}
        >
            <div className=" flex flex-col gap-4 md:( grid grid-cols-2 grid-rows-[1fr_auto]  max-w-5xl mx-auto )  ">
                <AnimatePresence mode='wait'>
                    <ImagesProduct
                        key={`${product.sku}-ProductInfoImages`}
                        imgs={images(product.images, product.image)}
                    />
                </AnimatePresence>
                <AnimatePresence mode='wait'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={`${product.sku}-ProductInfo`}
                        className="flex flex-col gap-4 text-neutral-3"
                    >
                        <div className="flex flex-col gap-4 bg-dbm p-3 rounded-lg">
                            <div className="flex justify-between">
                                <p className="font-semibold text-neutral-5">{product.condition}</p>
                                {product.quantityLimit === 1 && <p className="color-amber-4 border-amber-4 border-1 rounded-md px-1">Only one per customer</p>}
                            </div>
                            <h1 className="font-bold text-xl">{product.name}</h1>
                            <div className="flex justify-between">
                                <p><span className="text-neutral-5 font-bold">Model:</span> {product.model}</p>
                                <p><span className="text-neutral-5 font-bold">SKU:</span> {product.sku}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-neutral-5 font-bold">Price</p>
                                    <h2 className="text-xl">${product.salePrice} {product.salePrice < product.regularPrice && <span className="line-through decoration-neutral-5 decoration-2 text-neutral-5"> {product.regularPrice}</span>}</h2>
                                </div>
                                {buttonState(product.orderable)}
                            </div>
                        </div>
                        <StaticInfoCard title="Description" description={description(product.description, product.longDescription, product.plot)} />
                    </motion.div>
                </AnimatePresence>
                <FoldingInfoCard title="Features" description={features(product.features)} />
                <FoldingInfoCard title="Details" description={details(product.details)} />
            </div>
        </motion.section>
    )
}
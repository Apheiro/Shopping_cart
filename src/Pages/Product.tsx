import { ImagesProduct } from "../Components/Exports"
import { InfoCard, Btn } from "../Components/Core/Exports"
import { LoaderFunctionArgs, useLoaderData, ActionFunctionArgs, useSubmit } from "react-router-dom"
import { getProduct, Details, Features, Images, ProductInfo } from "../utils/productsRequests"
import { addToCart, ReqParams, getCartProducts } from "../utils/productsRequests"
import { useState, useEffect } from "react"

function details(detailsObj: Details[]): JSX.Element {
    return (
        <>
            {
                detailsObj.map((detail, index) => <p key={`detail-${index}`} ><span className="font-bold">{detail.name}:</span> {detail.value}</p>)
            }
        </>
    )
}

function features(featuresObj: Features[]): JSX.Element {
    if (featuresObj.length === 0) { return <>This product doesn't have any features</> }
    return (
        <>
            {featuresObj.map((feature, index) => <p key={`feature-${index}`} >{feature.feature}</p>)}
        </>
    )
}

function images(imgObj: Images[], img: string): string[] {
    const images: string[] = imgObj.filter(img => img.rel.includes("Zoom")).map(img => img.href)
    if (images.length === 0) { return [img] }
    return images
}

function description(desc: string, longDesc: string, plot: string): string {
    if (longDesc !== null) { return longDesc }
    else if (desc !== null) { return desc }
    else { return plot }
}

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

    // console.log(product)
    return (
        <section className="min-h-screen w-full p-4 py-21">
            <div className=" flex flex-col gap-4 md:( grid grid-cols-2 grid-rows-[1fr_auto]  max-w-5xl mx-auto )  ">
                <ImagesProduct imgs={images(product.images, product.image)} />
                <div className="flex flex-col gap-4 text-neutral-3">
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
                    <InfoCard variant="static" title="Description" description={description(product.description, product.longDescription, product.plot)} />
                </div>
                <InfoCard variant="folding" title="Features" description={features(product.features)} />
                <InfoCard variant="folding" title="Details" description={details(product.details)} />
            </div>
        </section>
    )
}
import { ImagesProduct } from "../Components/Exports"
import { InfoCard, Btn } from "../Components/Core/Exports"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { getProduct, Details, Features, Images, ProductInfo } from "../utils/productsRequests"

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
    return (
        <>
            {featuresObj.map((feature, index) => <p key={`feature-${index}`} >{feature.feature}</p>)}
        </>
    )

}

function images(imgObj: Images[]): string[] {
    return imgObj.filter(img => img.rel.includes("Zoom")).map(img => img.href)
}

export async function loader(paramsLoader: LoaderFunctionArgs) {
    const product = await getProduct(paramsLoader.params.sku ? paramsLoader.params.sku : "")
    return { product }
}

export default function Product() {
    const { product } = useLoaderData() as { product: ProductInfo };
    return (
        <section className="min-h-screen w-full p-4 py-21">
            <div className=" flex flex-col gap-4 md:( grid grid-cols-2 grid-rows-[1fr_auto]  max-w-5xl mx-auto )  ">
                <ImagesProduct imgs={images(product.images)} />
                <div className="flex flex-col gap-4 text-neutral-3">
                    <div className="flex flex-col gap-4 bg-dbm p-3 rounded-lg">
                        <p className="font-semibold text-neutral-5">{product.condition}</p>
                        <h1 className="font-bold text-xl">{product.name}</h1>
                        <div className="flex justify-between">
                            <p><span className="text-neutral-5 font-bold">Model:</span> {product.model}</p>
                            <p><span className="text-neutral-5 font-bold">SKU:</span> {product.sku}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-neutral-5 font-bold">Price</p>
                                <h2 className="text-xl">${product.salePrice}</h2>
                            </div>
                            <Btn variant="base">Add to cart</Btn>
                        </div>
                    </div>
                    <InfoCard variant="static" title="Description" description={product.description} />
                </div>
                <InfoCard variant="folding" title="Features" description={features(product.features)} />
                <InfoCard variant="folding" title="Details" description={details(product.details)} />
            </div>
        </section>
    )
}
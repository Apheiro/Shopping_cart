import { ReqParams } from "../utils/productsRequests"
import { Btn } from "./Core/Exports"
import { ProductInCartCard } from "./Exports"
import { IconChevronLeft } from "@tabler/icons-react"
import { useLoaderData } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { memo } from "react"
import { motion } from "framer-motion"

interface Props {
    setShowElements: React.Dispatch<React.SetStateAction<boolean>>
}

function totalPrice(products: ReqParams[]) {
    return products.reduce((acc, product) => acc + parseFloat(product.salePrice) * parseFloat(product.quantity), 0)
}

function productsAddUrl(products: ReqParams[]) {
    const productsArray: string[] = products.flatMap((p) => {
        const skuArray: string[] = []
        for (let i = 0; i < parseInt(p.quantity); i++) { skuArray.push(p.sku) }
        return skuArray
    })
    const productsString = productsArray.join(',')
    return productsString
}

const SideMenu = memo(({ setShowElements }: Props) => {
    const { products } = useLoaderData() as { products: ReqParams[] }

    return (
        <motion.div
            className={`z-10 flex flex-col h-screen w-full fixed left-100% max-w-xl bg-db text-neutral-300`}
            initial={{ x: '0' }}
            animate={{ x: '-100%' }}
            exit={{ x: '0' }}
            transition={{ duration: 1, ease: [0.34, 1.09, 0.14, 1] }}
        >
            <div className="p-3 flex gap-3 items-center">
                <Btn variant="cart" onClick={() => { setShowElements(false) }}>
                    <IconChevronLeft />My cart
                </Btn>
                <p className="font-bold "></p>
            </div>
            <div className="scrollbar px-3 pb-10 gap-3 h-full overflow-x-auto ">
                <AnimatePresence mode="sync">
                    {
                        products.map(({ images, name, salePrice, quantity, quantityLimit, sku }) =>
                            <ProductInCartCard
                                key={`${sku}-InCart`}
                                img={images}
                                title={name}
                                price={parseFloat(salePrice)}
                                quantity={parseInt(quantity)}
                                quantityLimit={parseInt(quantityLimit)}
                                sku={parseInt(sku)}
                                setShowElements={setShowElements}
                            />
                        )
                    }
                </AnimatePresence>
            </div>
            <div className="bg-dbm flex justify-between items-start p-3 gap-5">
                <p className="font-bold">Total: ${totalPrice(products)}</p>
                {
                    products.length > 0 ?
                        <Btn asChild variant="pay">
                            <a href={`https://api.bestbuy.com/click/-/${productsAddUrl(products)}/cart`} >
                                Go to pay
                            </a>
                        </Btn> :
                        <Btn variant="pay" classNameCustom='!bg-db !cursor-unset'>
                            Add products
                        </Btn>
                }
            </div>
        </motion.div>
    )
}, (prevProp, nextProp) => prevProp === nextProp)

export { SideMenu }


6538722
28640148
33444027
33571646
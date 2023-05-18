import { ProductResultCard, Pagination, FilterForm, SortForm } from '../Components/Exports'
import { getProductsList, ReqParams, SearchResult } from '../utils/productsRequests'
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { IconFilter } from '@tabler/icons-react'
import { Btn } from "../Components/Core/Exports"
import { useState } from "react"
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export async function loader(args: LoaderFunctionArgs) {
    const url = new URL(args.request.url);
    const params: ReqParams = {};
    url.searchParams.forEach((value, key) => { params[key] = value; });
    const result = await getProductsList(params);
    return { searchResult: result, reqParams: params };
}

const searchAnimation = {
    initial: {
        opacity: 0,
        scale: 0.96,
        transition: {
            scale: {
                type: 'spring',
                bounce: 0.5
            },
            opacity: { duration: 0.8 }
        }
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            scale: {
                type: 'spring',
                bounce: 0.5
            },
            opacity: { duration: 0.8 }
        }
    }
}

export default function Search() {
    const { searchResult, reqParams } = useLoaderData() as {
        searchResult: SearchResult;
        reqParams: ReqParams;
    };
    const [isFilterHidden, setIsFilterHidden] = useState(false);
    const noProductsFound = searchResult.products.length === 0;

    const toggleFilter = () => setIsFilterHidden(!isFilterHidden);

    return (
        <motion.section
            className="min-h-screen flex justify-center p-4 py-30"
            initial={'initial'}
            animate={'animate'}
            variants={searchAnimation}
        >
            <div className="flex flex-col md:(grid grid-cols-[auto_1fr]) gap-4 w-full max-w-5xl">
                <div className="bg-dbm h-fit p-3 rounded-lg col-start-2 col-end-3 flex flex-wrap gap-4 justify-center sm:justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Btn variant="cart" onClick={toggleFilter}>
                            <IconFilter size={20} />
                        </Btn>
                        Result {searchResult.total} items
                    </div>
                    <SortForm defaultValue={reqParams.sr} />
                </div>
                <AnimatePresence>
                    {
                        !isFilterHidden &&
                        <FilterForm
                            defaultValue={{
                                condition: reqParams.condition,
                                min: reqParams.min,
                                max: reqParams.max,
                            }}
                        />

                    }
                </AnimatePresence>
                <div className={`flex ${noProductsFound && 'justify-center items-center'} flex-col gap-4 col-start-2 col-end-3 h-full`}>
                    <AnimatePresence mode="wait">
                        {
                            noProductsFound &&
                            <h1 className="text-2xl font-bold text-neutral-5"> No products found</h1>
                        }
                        {
                            searchResult.products.map(
                                ({ image, condition, name, modelNumber, sku, salePrice, regularPrice, orderable }) =>
                                    <ProductResultCard
                                        key={`productSearchResult-${sku}`}
                                        img={image}
                                        condition={condition}
                                        title={name}
                                        model={modelNumber}
                                        sku={sku}
                                        price={salePrice}
                                        oldPrice={regularPrice}
                                        orderable={orderable}
                                    />
                            )
                        }
                    </AnimatePresence>
                </div>
                {
                    searchResult && searchResult.totalPages > 1 &&
                    <Pagination
                        defaultIndex={searchResult.currentPage}
                        totalPages={searchResult.totalPages}
                        customClass="col-start-2 col-end-3 justify-self-end self-end"
                    />
                }
            </div>
        </motion.section>
    );
}
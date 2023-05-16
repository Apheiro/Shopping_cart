import { ProductResultCard, Pagination, FilterForm, SortForm } from '../Components/Exports'
import { getProductsList, ReqParams, SearchResult } from '../utils/productsRequests'
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { IconFilter } from '@tabler/icons-react'
import { Btn } from "../Components/Core/Exports"
import { useMediaQuery } from "@mantine/hooks"
import { useState } from "react"

export async function loader(paramsLoader: LoaderFunctionArgs) {
    const actualURL = new URL(paramsLoader.request.url);
    let reqParams: ReqParams = {}
    actualURL.searchParams.forEach((value, key) => { reqParams[key] = value });
    const searchResult = await getProductsList(reqParams)
    console.log('loader of search')
    return { searchResult, reqParams }
}

export default function Search() {
    const { searchResult, reqParams } = useLoaderData() as { searchResult: SearchResult, reqParams: ReqParams };
    const [hiddeFilters, setHiddeFilters] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const prodNotFound = searchResult.products.length === 0

    return (
        <section className="min-h-screen flex justify-center p-4 py-30">
            <div className={`${isMobile ? 'flex flex-col' : 'grid'} ${hiddeFilters ? 'flex flex-col' : 'grid-cols-[auto_1fr] grid-rows-[auto_1fr]'} gap-4 w-full max-w-5xl`}>
                <div className="bg-dbm h-fit p-3 rounded-lg flex flex-wrap gap-4 justify-center sm:justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Btn variant='cart' onClick={() => setHiddeFilters(!hiddeFilters)}><IconFilter size={20} /></Btn>
                        Result {searchResult.total} items
                    </div>
                    <SortForm defaultValue={reqParams.sr} />
                </div>
                {!hiddeFilters && <FilterForm defaultValue={{ condition: reqParams.condition, min: reqParams.min, max: reqParams.max }} />}
                <div className={`flex ${prodNotFound && 'justify-center items-center'} flex-col gap-4 col-start-2 col-end-3 h-full`}>
                    {prodNotFound && <h1 className='text-2xl font-bold text-neutral-5'>Not products found</h1>}
                    {
                        searchResult.products.map(({ image, condition, name, modelNumber, sku, salePrice, regularPrice, orderable }, index) =>
                            <ProductResultCard
                                key={`productSearchResult-${index}`}
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
                </div>
                {searchResult && searchResult.totalPages > 1 && <Pagination defaultIndex={searchResult.currentPage} totalPages={searchResult.totalPages} customClass="col-start-2 col-end-3 justify-self-end self-end" />}
            </div>
        </section>
    )
}
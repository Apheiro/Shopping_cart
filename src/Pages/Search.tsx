import { useState } from "react"
import { useMediaQuery } from "@mantine/hooks"
import { Btn } from "../Components/Core/Exports"
import { ProductResultCard, Pagination, FilterForm, SortForm } from '../Components/Exports'
import { IconFilter } from '@tabler/icons-react'
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { getProductsList, ReqParams, SearchResult } from '../utils/productsRequests'

export async function loader(paramsLoader: LoaderFunctionArgs) {
    const actualURL = new URL(paramsLoader.request.url);
    let reqParams: ReqParams = {}
    actualURL.searchParams.forEach((value, key) => { reqParams[key] = value });
    const searchResult = await getProductsList(reqParams)
    return { searchResult, reqParams }
}

export default function Search() {
    const [hiddeFilters, setHiddeFilters] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { searchResult, reqParams } = useLoaderData() as { searchResult: SearchResult, reqParams: ReqParams };

    return (
        <section className="min-h-screen flex justify-center items-center p-4 py-30">
            <div className={`${isMobile ? 'flex flex-col' : 'grid'} ${hiddeFilters ? 'flex flex-col' : 'grid-cols-[auto_1fr] grid-rows-[auto_1fr]'} gap-4 w-full max-w-5xl`}>
                <div className="bg-dbm h-fit p-3 rounded-lg flex flex-wrap gap-4 justify-center sm:justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Btn variant='cart' onClick={() => setHiddeFilters(!hiddeFilters)}><IconFilter size={20} /></Btn>
                        Result {searchResult.total} items
                    </div>
                    <SortForm defaultValue={reqParams.sr} />
                </div>
                {!hiddeFilters && <FilterForm defaultValue={{ condition: reqParams.condition, min: reqParams.min, max: reqParams.max }} />}
                <div className="flex flex-col gap-4 col-start-2 col-end-3">
                    {
                        searchResult.products.map(({ image, condition, name, modelNumber, sku, salePrice }, index) =>
                            <ProductResultCard
                                key={`productSearchResult-${index}`}
                                img={image}
                                condition={condition}
                                title={name}
                                model={modelNumber}
                                sku={sku}
                                price={salePrice}
                            />
                        )
                    }
                </div>
                {searchResult && searchResult.totalPages > 1 && <Pagination defaultIndex={searchResult.currentPage} totalPages={searchResult.totalPages} customClass="col-start-2 col-end-3 justify-self-end self-end" />}
            </div>
        </section>
    )
}
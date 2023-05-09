import Layout from "./Layout"
import { useState } from "react"
import { useMediaQuery } from "@mantine/hooks"
import { Btn, Input, Checkbox } from "../Components/Core/Exports"
import { ProductResultCard, Pagination } from '../Components/Exports'
import { IconFilter } from '@tabler/icons-react'


const productsResults: { img: string, condition: string, title: string, model: string, sku: string, price: number }[] = [
    {
        img: `https://imgs.search.brave.com/k5d9aXZnHVc-DGXjlyU_deGentXX5ka3Xhnba9Uayl4/rs:fit:1024:683:1/g:ce/aHR0cHM6Ly9saXZl/LnN0YXRpY2ZsaWNr/ci5jb20vNjAzNi82/Mzc3Nzg0NDUzXzBh/NjEzZjMzMDVfYi5q/cGc`,
        condition: 'New',
        title: 'LG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TV',
        model: '1111111',
        sku: '234324',
        price: 100,
    },
    {
        img: `https://imgs.search.brave.com/KDFBSN9qN6XeLFb0-nltWT4RhwQ3lWYcRo0fAl6gqpI/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5t/b3JpYXJldmlld3Mu/Y29tL3Jvbmd1bGF0/b3Ivd3AtY29udGVu/dC91cGxvYWRzL1Nj/YXJ5LU1vdmllLTIw/MDAtOC5qcGc`,
        condition: 'New',
        title: 'LG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TVLG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TV',
        model: '1111111',
        sku: '234324',
        price: 100,
    },
    {
        img: `https://imgs.search.brave.com/g6QUYsPVEtkrphXofxL45v30c7yK5oiQsvLNA7YuddQ/rs:fit:1200:690:1/g:ce/aHR0cHM6Ly9maWxt/ZGFpbHkuY28vd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMDUv/aG9ycm9ybW92aWVz/LTAyLmpwZw`,
        condition: 'New',
        title: 'LG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TV',
        model: '1111111',
        sku: '234324',
        price: 100,
    },
    {
        img: `https://imgs.search.brave.com/k5d9aXZnHVc-DGXjlyU_deGentXX5ka3Xhnba9Uayl4/rs:fit:1024:683:1/g:ce/aHR0cHM6Ly9saXZl/LnN0YXRpY2ZsaWNr/ci5jb20vNjAzNi82/Mzc3Nzg0NDUzXzBh/NjEzZjMzMDVfYi5q/cGc`,
        condition: 'New',
        title: 'LG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TV',
        model: '1111111',
        sku: '234324',
        price: 100,
    },
    {
        img: `https://imgs.search.brave.com/KDFBSN9qN6XeLFb0-nltWT4RhwQ3lWYcRo0fAl6gqpI/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5t/b3JpYXJldmlld3Mu/Y29tL3Jvbmd1bGF0/b3Ivd3AtY29udGVu/dC91cGxvYWRzL1Nj/YXJ5LU1vdmllLTIw/MDAtOC5qcGc`,
        condition: 'New',
        title: 'LG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TVLG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TV',
        model: '1111111',
        sku: '234324',
        price: 100,
    },
    {
        img: `https://imgs.search.brave.com/g6QUYsPVEtkrphXofxL45v30c7yK5oiQsvLNA7YuddQ/rs:fit:1200:690:1/g:ce/aHR0cHM6Ly9maWxt/ZGFpbHkuY28vd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMDUv/aG9ycm9ybW92aWVz/LTAyLmpwZw`,
        condition: 'New',
        title: 'LG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TV',
        model: '1111111',
        sku: '234324',
        price: 100,
    },
    {
        img: `https://imgs.search.brave.com/k5d9aXZnHVc-DGXjlyU_deGentXX5ka3Xhnba9Uayl4/rs:fit:1024:683:1/g:ce/aHR0cHM6Ly9saXZl/LnN0YXRpY2ZsaWNr/ci5jb20vNjAzNi82/Mzc3Nzg0NDUzXzBh/NjEzZjMzMDVfYi5q/cGc`,
        condition: 'New',
        title: 'LG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TV',
        model: '1111111',
        sku: '234324',
        price: 100,
    },
    {
        img: `https://imgs.search.brave.com/KDFBSN9qN6XeLFb0-nltWT4RhwQ3lWYcRo0fAl6gqpI/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5t/b3JpYXJldmlld3Mu/Y29tL3Jvbmd1bGF0/b3Ivd3AtY29udGVu/dC91cGxvYWRzL1Nj/YXJ5LU1vdmllLTIw/MDAtOC5qcGc`,
        condition: 'New',
        title: 'LG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TVLG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TV',
        model: '1111111',
        sku: '234324',
        price: 100,
    },
    {
        img: `https://imgs.search.brave.com/g6QUYsPVEtkrphXofxL45v30c7yK5oiQsvLNA7YuddQ/rs:fit:1200:690:1/g:ce/aHR0cHM6Ly9maWxt/ZGFpbHkuY28vd3At/Y29udGVudC91cGxv/YWRzLzIwMjAvMDUv/aG9ycm9ybW92aWVz/LTAyLmpwZw`,
        condition: 'New',
        title: 'LG - 65" Class C2 Series OLED evo 4K  UHD Smart webOS TV',
        model: '1111111',
        sku: '234324',
        price: 100,
    }
]

export default function Search() {
    const [hiddeFilters, setHiddeFilters] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <Layout>
            <section className="min-h-screen flex justify-center items-center p-4 py-30">
                <div className={`${isMobile ? 'flex flex-col' : 'grid'} ${hiddeFilters ? 'flex flex-col' : 'grid-cols-[auto_1fr] grid-rows-[auto_1fr]'} gap-4`}>

                    <div className="bg-dbm h-13 p-3 rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Btn variant='cart' onClick={() => setHiddeFilters(!hiddeFilters)}><IconFilter size={20} /></Btn>
                            Result 1928 items
                        </div>
                        <div>
                            Sort by: test
                        </div>
                    </div>

                    {
                        !hiddeFilters &&
                        <form className={`md:(row-start-1 row-end-3) bg-dbm h-fit gap-4 p-4 rounded-lg flex flex-col items-start `}>
                            <h2 className="font-bold">Filters</h2>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold color-neutral-5">Condition</h3>
                                <Checkbox Name='New' />
                                <Checkbox Name='Pre-Owned' />
                                <Checkbox Name='Refurbished' />
                                <Checkbox Name='Open-box' />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold color-neutral-5">Price range</h3>
                                <div className="flex justify-center items-center gap-3">
                                    <Input variant="price" rangeType="min" />-<Input variant="price" rangeType="max" />
                                </div>
                            </div>
                            <Btn variant="base" type="submit">Apply</Btn>
                        </form>
                    }

                    <div className="flex flex-col gap-4 col-start-2 col-end-3">

                        {
                            productsResults.map(({ img, condition, title, model, sku, price }) => {
                                return <ProductResultCard img={img} condition={condition} title={title} model={model} sku={sku} price={price} />
                            })
                        }

                    </div>
                    <Pagination totalPages={900} customClass="col-start-2 col-end-3 justify-self-end self-end" />
                </div>
            </section>
        </Layout>
    )
}
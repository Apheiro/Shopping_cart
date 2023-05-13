import API_KEY from "../a/apikey";

interface Products {
    image: string,
    condition: string,
    name: string,
    modelNumber: string,
    sku: number | string,
    salePrice: number
}

export interface SearchResult {
    currentPage: number,
    totalPages: number,
    total: number,
    products: Products[],
}

export type ReqParams = {
    [key: string]: string
}

export interface Details {
    name: string,
    value: string,
    values: string[]
}

export interface Features {
    feature: string
}

export interface Images {
    href: string,
    rel: string
}

export interface ProductInfo {
    condition: string,
    details: Details[],
    features: Features[],
    images: Images[],
    description: string,
    model: string,
    name: string,
    regularPrice: number,
    salePrice: number,
    sku: string
}

const urlProducts = "https://api.bestbuy.com/v1/products";

function formatQuery(query: string): string {
    const words = query.split(' ');
    const result = words.map(word => 'search=' + word);
    return result.join('&');
}

export async function getProductsList(reqParams: ReqParams) {
    console.log('request from search component')
    const paramsBB = new URLSearchParams({
        format: "json",
        pageSize: '10',
        show: "name,regularPrice,salePrice,sku,image,condition,modelNumber",
        page: reqParams.pg,
        sort: reqParams.sr === 'bm' || !reqParams.sr ? '' : reqParams.sr,
        apiKey: API_KEY,
    });
    const attributes = `((${formatQuery(reqParams.q)}${reqParams.condition ? `&condition=${reqParams.condition}` : ''}${reqParams.min ? `&salePrice>${reqParams.min}` : ''}${reqParams.max ? `&salePrice<${reqParams.max}` : ''}))`
    return fetch(`${urlProducts}${attributes}?${paramsBB.toString()}`, { mode: 'cors' })
        .then(res => res.json())
        .then(data => {
            const dataFormated: SearchResult = {
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                total: data.total,
                products: data.products
            }
            return dataFormated
        }).catch(err => console.log(err))
}

export async function getProduct(sku: string) {
    const paramsBB = new URLSearchParams({
        show: "name,regularPrice,longDescription,features,details,salePrice,sku,images,condition,modelNumber",
        apiKey: API_KEY
    })
    console.log('request from product component')

    return fetch(`${urlProducts}/${sku}.json?${paramsBB.toString()}`, { mode: 'cors' })
        .then((response) => response.json())
        .then((data) => {
            const productData: ProductInfo = {
                condition: data.condition,
                details: data.details,
                features: data.features,
                images: data.images,
                description: data.longDescription,
                model: data.modelNumber,
                name: data.name,
                regularPrice: data.regularPrice,
                salePrice: data.salePrice,
                sku: data.sku
            }
            return productData
        })
        .catch((error) => console.error(error));
}
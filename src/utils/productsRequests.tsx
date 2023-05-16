import API_KEY from "../a/apikey";

interface Products {
    image: string,
    condition: string,
    name: string,
    modelNumber: string,
    sku: number | string,
    salePrice: number,
    regularPrice: number,
    orderable: 'Available' | 'SoldOut' | 'PreOrder'
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
    image: string,
    longDescription: string,
    description: string,
    plot: string,
    model: string,
    name: string,
    regularPrice: number,
    salePrice: number,
    sku: string,
    orderable: 'Available' | 'SoldOut'
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
        show: "name,regularPrice,salePrice,sku,image,condition,modelNumber,orderable",
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
        show: "name,regularPrice,salePrice,longDescription,description,plot,features,details,sku,images,image,condition,modelNumber,orderable",
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
                image: data.image,
                longDescription: data.longDescription,
                description: data.description,
                plot: data.plot,
                model: data.modelNumber,
                name: data.name,
                regularPrice: data.regularPrice,
                salePrice: data.salePrice,
                sku: data.sku,
                orderable: data.orderable
            }
            return productData
        })
}

export async function getCartProducts() {
    const products: ReqParams[] = await JSON.parse(localStorage.getItem('Products') ?? '[]')
    return products
}

export async function addToCart(product: ReqParams) {
    let Products = await getCartProducts()
    Products.push(product)
    localStorage.setItem('Products', JSON.stringify(Products))
}

export async function removeFromCart(product: number) {
    let Products = await getCartProducts()
    const productsku = product.toString()
    const index = Products.findIndex(p => p.sku == productsku)
    Products.splice(index, 1)
    localStorage.setItem('Products', JSON.stringify(Products))
}

export async function editCart(product: number, quantity: number) {
    let Products = await getCartProducts()
    const productsku = product.toString()
    const index = Products.findIndex(p => p.sku == productsku)
    Products[index].quantity = `${quantity}`
    localStorage.setItem('Products', JSON.stringify(Products))
}

export interface ProductsWrapper {
    "products": Products;
}
export interface Products{
    "data": Data;
}

export interface Data {
    "items": Item[];
}

export interface Item {
    "id": string;
    "name": string;
    "price": string;
    "totalreview": string;
    "Rating": string;
}

export default ProductsWrapper;
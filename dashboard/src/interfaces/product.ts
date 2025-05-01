export interface ProductsWrapper {
    "products": Products;
    "lastPage": boolean;
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
    "totalReviews": string;
    "rating": string;
}

export default ProductsWrapper;
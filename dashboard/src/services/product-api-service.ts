import ProductsWrapper from "../interfaces/product";

export enum SortBy {
    MOSTREVIEWED = "mostReviewed",
    BESTRATED = "bestRated"
}

export interface GetProductsProps {
    sortBy: SortBy;
    page: number;
    limit: number;
}

class ProductApiService {
    public static async getProducts(props: GetProductsProps): Promise<ProductsWrapper> {
        try {
            const response = await fetch(`http://localhost:8080/products?sortBy=${props.sortBy}&page=${props.page}&limit=${props.limit}`);
            return await response.json() as ProductsWrapper;
        } catch (err) {
            console.error("Error occurred while fetching products:", err);
            return {} as ProductsWrapper;
        }
    }
}

export default ProductApiService;
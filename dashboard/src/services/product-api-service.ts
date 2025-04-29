import ProductsWrapper from "../interfaces/product";

export enum SortBy {
    MOSTREVIEWED = "mostReviewed",
    BESTRATED = "bestRated"
}

class ProductApiService {
    public static async getProducts(sortBy: SortBy): Promise<ProductsWrapper> {
        try {
            const response = await fetch(`http://localhost:8080/products?sortBy=${sortBy}`);
            return await response.json() as ProductsWrapper;
        } catch (err) {
            console.error("Error occurred while fetching products:", err);
            return {} as ProductsWrapper;
        }
    }
}

export default ProductApiService;
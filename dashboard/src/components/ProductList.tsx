import React, { useEffect, useState } from "react";
import ProductApiService, { SortBy } from "../services/product-api-service";
import { Products } from "../interfaces/product"; 

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Products | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsWrapper = await ProductApiService.getProducts(SortBy.MOSTREVIEWED);
                setProducts(productsWrapper.products);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading products...</div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products?.data.items.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
import "./Category.css";
import ProductsWrapper from "../../interfaces/product"; 
import ProductCard from "../ProductCard/ProductCard";
import ProductApiService, { GetProductsProps, SortBy } from "../../services/product-api-service";
import { useEffect, useState } from "react";

interface CategoryProps {
    label: string
    category: SortBy
}

const Category = (props: CategoryProps) => {
    const [productsWrapper, setProductsWrapper] = useState<ProductsWrapper | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const limit = 5;

    useEffect(() => { 
        const fetchProducts = async (getPage: number) => {
            try {
                const productsWrapper = await ProductApiService.getProducts({
                    sortBy: props.category,
                    page: getPage,
                    limit: limit,
                } as GetProductsProps);
                setProductsWrapper(productsWrapper);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch products");
                setLoading(false);
            }
        };
        
        fetchProducts(page); 
    }, [page, props.category]);

    if (loading) {
        return <div>Loading products...</div>
    }

    if (error) {
        return <div>Unable to load products</div>
    }

    return (
        <div className="center-horizontally">
            <div>            
                <div className="category-label">{props.label}</div>
                <div className="category-pagination">
                    {/* left arrow */}
                    <div
                        className={`arrow-left ${page === 1 ? "disabled" : ""}`}
                        onClick={() => {
                            if (page > 1) {
                                setPage(page - 1);
                            }
                        }}
                    />

                    {/* products */}
                    <div className="product-container">
                        {productsWrapper?.products.data.items.map((item) => (
                            <ProductCard item={item} />
                        ))}
                    </div>

                    {/* right arrow */}
                    <div 
                        className={`arrow-right ${productsWrapper?.lastPage ? "disabled" : ""}`} 
                        onClick={() => {
                            if (!productsWrapper?.lastPage) setPage(page + 1) 
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Category;
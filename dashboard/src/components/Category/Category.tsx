import React, { useEffect, useState } from "react";
import ProductApiService, { GetProductsProps, SortBy } from "../../services/product-api-service";
import { Products } from "../../interfaces/product"; 
import ProductCard from "../ProductCard/ProductCard";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import './Category.css';

const Category = () => {
    const [mostReviewed, setMostReviewed] = useState<Products | null>(null);
    const [mostReviewedPage, setMostReviewedPage] = useState<number>(1);
    
    const [bestRated, setBestRated] = useState<Products | null>(null);
    const [bestRatedPage, setBestRatedPage] = useState<number>(1);
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const limit = 5;

    useEffect(() => {
        const fetchMostReviewed = async () => {
            try {
                const productsWrapper = await ProductApiService.getProducts({
                    sortBy: SortBy.MOSTREVIEWED,
                    page: mostReviewedPage,
                    limit: limit,
                } as GetProductsProps);
                setMostReviewed(productsWrapper.products);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch most reviewed products");
                setLoading(false);
            }
        };
        const fetchBestRated = async () => {
            try {
                const productsWrapper = await ProductApiService.getProducts({
                    sortBy: SortBy.BESTRATED,
                    page: bestRatedPage,
                    limit: limit,
                } as GetProductsProps);
                setBestRated(productsWrapper.products);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch best rated products");
                setLoading(false);
            }
        };

        fetchMostReviewed();
        fetchBestRated();
    }, []);

    if (loading) {
        return <div>Loading products...</div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Most Reviewed</h1>
            <div className="category-pagination">
                <div className="arrow-left" />
                <div className="category-container">
                    {mostReviewed?.data.items.map((item) => (
                        <ProductCard item={item} />
                    ))}
                </div>
                <div className="arrow-right" />
            </div>

            <h1>BestRated</h1>
            <div className="category-container">
                {bestRated?.data.items.map((item) => (
                    <ProductCard item={item} />
                ))}
            </div>
        </div>
    );
};

export default Category;
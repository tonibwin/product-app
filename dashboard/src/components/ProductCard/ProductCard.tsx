import './ProductCard.css';
import { Item } from "../../interfaces/product";

interface ProductCardProps {
    item: Item;
}

const ProductImage = () => {
    return (
        <div className="product-image-container">
            <div className="circle-container">
                <div style={{padding: "13px 9px", fontWeight: "500"}}>
                    <div>Product</div> 
                    <div>Image</div>
                </div>
            </div>
        </div>
    )
}

const ProductCard = ({item}: ProductCardProps) => {
    return (
        <div className="product-card vertical-spacing-sm">
            <ProductImage />
            <div className="center-text bold-font-weight">
                <div>{item?.name}</div>
                <div>Price : ${item?.price}</div>
            </div>
            <div className="vertical-spacing-sm medium-font-weight align-bottom">
                <div className="product-details">
                    <span>Total Reviews: </span>
                    <span>{item?.totalReviews}</span>
                </div>
                <div className="product-details">
                    <span>Rating: </span>
                    <span>{item?.rating}</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
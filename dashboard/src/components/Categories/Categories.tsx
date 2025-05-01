import { SortBy } from "../../services/product-api-service";
import Category from "../Category/Category";

const Categories = () => {
    return (
        <div className="vertical-spacing-sm">
            <Category 
                label="Most Reviewed"
                category={SortBy.MOSTREVIEWED}/>
            <Category 
                label="Best Rated" 
                category={SortBy.BESTRATED}/>

        </div>
    );
};

export default Categories;
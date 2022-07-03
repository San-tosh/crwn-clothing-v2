import './category.style.scss'
import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ProductCard from "../product-card/product-card.component";
import Spinner from "../spinner/spinner.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap, selectIsCategoriesLoading} from "../../features/categories/categories.selector";

export type CategoryRouteParams = {
    category: string;
}
const Category = ()=> {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams; // we can either get category or any other additional values
    console.log('category render/re-render');
    const categoriesMap = useSelector(selectCategoriesMap); // returns object
    const isLoading = useSelector(selectIsCategoriesLoading); // returns object
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
        console.log('useEffect setProducts')
    },[category, categoriesMap]); // calls whenever a category or directories map changes


    return (
        <Fragment>
            <h2 className='category-title'>{category}</h2>
            {
                isLoading ? <Spinner/> : <div className='category-container'>
                {
                    products && products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                    ))
                }
                </div>
            }
        </Fragment>
    )
}

export default Category
import './category.style.scss'
import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ProductCard from "../product-card/product-card.component";
import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../features/categories/categories.selector";

const Category = ()=> {
    const { category } = useParams();
    console.log('category render/re-render');
    const categoriesMap = useSelector(selectCategoriesMap); // returns object
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
        console.log('useEffect setProducts')
    },[category, categoriesMap]); // calls whenever a category or directories map changes


    return (
        <Fragment>
            <h2 className='category-title'>{category}</h2>
            <div className='category-container'>
                {
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                }
            </div>
        </Fragment>
    )
}

export default Category
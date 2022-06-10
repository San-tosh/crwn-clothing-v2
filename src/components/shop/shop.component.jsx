import {Routes, Route} from "react-router-dom";
import './shop.styles.scss'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {fetchCategoriesAsync, fetchCategoriesStart} from "../../features/categories/categoriesSlice";
import {useDispatch} from "react-redux";

const Shop = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log('shop component')
         dispatch(fetchCategoriesStart())
    },[]);

    return (
        //nested routes inside shop
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes>
    )
}

export default Shop
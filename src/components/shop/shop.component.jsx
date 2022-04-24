import {Routes, Route} from "react-router-dom";
import './shop.styles.scss'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

const Shop = () => {
    return (
        //nested routes inside shop
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=':category' element={<Category/>}/>
        </Routes>
    )
}

export default Shop
import {createContext, useEffect, useState} from "react";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils";
// import SHOP_DATA from "../shop-data";

// import {addCollectionAndDocuments} from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext( {
        categoriesMap:{}
    }
)

export const CategoriesProvider =  ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(()=>{
        const getCategoriesMap = async ()=>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
            console.log(categoryMap);
        }
        getCategoriesMap();
    },[]);

    //used only to insert data
    // useEffect(()=>{
    //     addCollectionAndDocuments('directories',SHOP_DATA)
    //     //directories key
    // },[]);

    const value = {categoriesMap};
    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
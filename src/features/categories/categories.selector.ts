// export const selectCategoriesMap = (state) => {
//     // console.log('selector fired')
//     return state.categories.categories.reduce((acc, category) => {
//         const {title, items} = category
//         acc[title.toLowerCase()] = items;
//         return acc;
//     }, {})
// }

// creating a memoized selector

import {createSelector} from "reselect";
import {CategoriesState} from "./categoriesSlice";
import {CategoryMap} from "./categories.types";
import {RootState} from "../../store/store";
// import {categoriesSlice} from "./categoriesSlice";

const selectCategoryReducer = (state: RootState) : CategoriesState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer], // create selector api accepts one or more input selectors that extracts the values
    (categoriesSlice) => categoriesSlice.categories // out put selector receives the extracted values and should return a derived value
)
// returns selectCategoryReducer

export const selectCategoriesMap = createSelector(
    [selectCategories], // unless the categories array is changed do not re run the reduce the method
    (categories) : CategoryMap => categories.reduce((acc, category) => {
        const {title, items} = category
        acc[title.toLowerCase()] = items;
        return acc;
        },{} as CategoryMap)
)

export const selectIsCategoriesLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)


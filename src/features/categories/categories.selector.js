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

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer], // create selector api accepts one or more input selectors that extracts the values
    (categoriesSlice) => categoriesSlice.categories // out put selector receives the extracted values and should return a derived value
)
// returns selectCategoryReducer

export const selectCategoriesMap = createSelector(
    [selectCategories], // unless the categories array is changed do not re run the reduce the method
    (categories) => categories.reduce((acc, category) => {
        const {title, items} = category
        acc[title.toLowerCase()] = items;
        return acc;
        },{})
)


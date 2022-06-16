import {createSlice} from "@reduxjs/toolkit";
// import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {Category} from "./categories.types";

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: Boolean;
    readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState ={
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        // setCategories: (state,action) =>{
        //     state.categories = action.payload
        // },
        fetchCategoriesStart: (state, action) => {
            state.isLoading = true
        },
        fetchCategoriesSuccess: (state, action) => {
            state.categories = action.payload
            state.isLoading = false
        },
        fetchCategoriesFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

// export const fetchCategoriesAsync = () => async (dispatch) => {
//     console.log('fetch categories async started');
//     dispatch(fetchCategoriesStart())
//     try {
//         const categoryArray = await getCategoriesAndDocuments();
//         console.log('fetch categories async fetch');
//         dispatch(fetchCategoriesSuccess(categoryArray))
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error))
//         return
//     }
//     console.log('fetch categories async end');
// }

export const { fetchCategoriesStart } = categoriesSlice.actions
export const { fetchCategoriesSuccess } = categoriesSlice.actions
export const { fetchCategoriesFailed } = categoriesSlice.actions

export default categoriesSlice.reducer
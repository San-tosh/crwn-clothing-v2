import {createSlice} from "@reduxjs/toolkit";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        isLoading: false,
        error: null
    },
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

export const fetchCategoriesAsync = () => async (dispatch) => {
    console.log('fetch categories async started');
    dispatch(fetchCategoriesStart())
    try {
        const categoryArray = await getCategoriesAndDocuments();
        console.log('fetch categories async fetch');
        dispatch(fetchCategoriesSuccess(categoryArray))
    } catch (error) {
        dispatch(fetchCategoriesFailed(error))
        return
    }
    console.log('fetch categories async end');
}

export const { fetchCategoriesStart } = categoriesSlice.actions
export const { fetchCategoriesSuccess } = categoriesSlice.actions
export const { fetchCategoriesFailed } = categoriesSlice.actions

export default categoriesSlice.reducer
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {fetchCategoriesFailed, fetchCategoriesSuccess} from "./categoriesSlice";
import {all, call, put, takeLatest} from "typed-redux-saga";
import {sagaActions as categoriesAction} from "./categories.types";

export function* fetchCategoriesAsync() {
    try {
        const categoryArray = yield* call(getCategoriesAndDocuments); // yield pauses until it gets back something similar to await
        // call converts functions to effect or execute.
        yield* put(fetchCategoriesSuccess(categoryArray)) // put is used to dispatch action
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error))
    }
}

// watch on fetch fetchCategoriesStart
export function* onFetchCategories() { //moment i hear
    yield* takeLatest(categoriesAction.FETCH_CATEGORIES,fetchCategoriesAsync) //takeLatest doesn't allow multiple Saga tasks to be fired concurrently. As soon as it gets a new dispatched action, it cancels any previously-forked task (if still running).
}

export function* categoriesSaga() { // call all sagas parallely
    yield* all([call(onFetchCategories)]) // listen on fetchCategoriesStart
}
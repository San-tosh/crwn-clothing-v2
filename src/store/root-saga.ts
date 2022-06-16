import {all, call} from 'typed-redux-saga/macro'
import {categoriesSaga} from "../features/categories/category.saga";
import {userSagas} from "../features/user/user.saga";
export default function* rootSaga() {
    yield* all([call(categoriesSaga),call(userSagas)])
}
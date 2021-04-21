import { call, put } from "redux-saga/effects";
import { logIn } from "../../slices/optionsSlice";
import {requestLogIn} from "../requests/options";

export function* handleFetchLogIn(action) {
    try {
        const {payload} = action
        const response = yield call(requestLogIn,payload);
        const { data } = response;
        yield put(logIn({ ...data }));
    } catch (error) {
        console.log(error);
    }
}

export function* handleFetchAddUser(action) {
    try {
        const {payload} = action
        const response = yield call(requestLogIn,payload);
        const { data } = response;
        console.log("handler "+JSON.stringify(data))
        //yield put(logIn({ ...data }));
    } catch (error) {
        console.log(error);
    }
}
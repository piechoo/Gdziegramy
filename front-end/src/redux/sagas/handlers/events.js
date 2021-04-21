import { call, put } from "redux-saga/effects";
import { addEvents} from "../../slices/eventsSlice";
import {requestCreatedEvents, requestMyEvents, } from "../requests/events";

export function* handleFetchCreatedEvents(action) {
    try {
        const {payload} = action
        const response = yield call(requestCreatedEvents,payload);
        const { data } = response;
        yield put(addEvents({ ...data }));
    } catch (error) {
        console.log(error);
    }
}

export function* handleFetchMyEvents(action) {
    try {
        const {payload} = action
        const response = yield call(requestMyEvents,payload);
        console.log(response)
        const { data } = response;
        yield put(addEvents({ data,status:"myEvents" }));
    } catch (error) {
        console.log(error);
    }
}
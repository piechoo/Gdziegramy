import { takeLatest } from "redux-saga/effects";
import { handleFetchLogIn, handleFetchAddUser } from "./handlers/options";
import { handleFetchCreatedEvents, handleFetchMyEvents } from "./handlers/events";
import { fetchLogIn,fetchAddUser } from "../slices/optionsSlice";
import { fetchCreatedEvents,fetchMyEvents } from "../slices/eventsSlice";

export function* watcherSaga() {
    yield takeLatest(fetchLogIn.type, handleFetchLogIn);
    yield takeLatest(fetchAddUser.type, handleFetchAddUser);
    yield takeLatest(fetchMyEvents().type, handleFetchMyEvents);
    yield takeLatest(fetchCreatedEvents().type, handleFetchCreatedEvents);

}

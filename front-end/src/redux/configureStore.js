import {
    configureStore,
    combineReducers,
    getDefaultMiddleware
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import optionsReducer from "./slices/optionsSlice";
import courtsReducer from "./slices/courtsSlice";
import eventsReducer from "./slices/eventsSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    options: optionsReducer,
    courts: courtsReducer,
    events: eventsReducer,
});

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
});
sagaMiddleware.run(watcherSaga);

export default store;

import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
    name: "events",
    initialState:{
        events:[],
        status:''
    },
    reducers: {
        fetchCreatedEvents(state,action ) {
        },
        fetchMyEvents(state,action ) {
        },
        addEvents(state,action) {
            const {data,status}=action.payload
            return Object.assign({}, state, {
                events:data,
                status
            });
        },
        logOut(state, action) {
            return Object.assign({}, state, {
                isLogged:false,
                userID:"",
                username:"",
                error:''
            });
        },
        setError(state, action) {
            return Object.assign({}, state, {
                isLogged:false,
                userID:"",
                username:"",
                error:action.payload.error
            });
        },
        clearError(state, action) {
            return Object.assign({}, state, {
                error:''
            });
        },

    }
});

export const { fetchCreatedEvents, fetchMyEvents, addEvents} = eventsSlice.actions;

export default eventsSlice.reducer;
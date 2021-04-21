import { createSlice } from "@reduxjs/toolkit";

const participantsSlice = createSlice({
    name: "participants",
    initialState:{
        participants:[],
        status:''
    },
    reducers: {
        fetchCreatedParticipants(state,action ) {
        },
        fetchMyEvents(state,action ) {
        },
        addParticipants(state,action) {
            const {data,status}=action.payload
            return Object.assign({}, state, {
                participants:data,
                status
            });
        },

    }
});

export const { fetchCreatedParticipants, fetchMyEvents, addParticipants} = participantsSlice.actions;

export default participantsSlice.reducer;
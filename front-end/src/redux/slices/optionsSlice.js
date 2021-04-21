import { createSlice } from "@reduxjs/toolkit";

const optionsSlice = createSlice({
    name: "options",
    initialState:{
        isLogged:false,
        userID:'',
        username:'',
        error:''
    },
    reducers: {
        fetchLogIn(state,action ) {
        },
        fetchAddUser(state,action ) {
        },
        logIn(state,action) {
            const {isLogged,userID,username,error}=action.payload
            return Object.assign({}, state, {
                isLogged,
                userID,
                username,
                error
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

export const { logIn, logOut, fetchLogIn, setError, fetchAddUser, clearError} = optionsSlice.actions;

export default optionsSlice.reducer;
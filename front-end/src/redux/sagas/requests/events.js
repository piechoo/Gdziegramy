import axios from "axios";

export function requestCreatedEvents(data) {
    const {userID} = data
    return axios.post(`http://localhost:5000/getmyevents/`,
        {
            userid:userID,
        },
    )
}

export function requestMyEvents(data) {
    const {userID} = data
    return axios.post(`http://localhost:5000/getmyevents/`,
        {
            userid:userID,
        },
    )
}
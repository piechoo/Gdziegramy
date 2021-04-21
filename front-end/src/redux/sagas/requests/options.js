import axios from "axios";

export function requestLogIn(data) {
    console.log("request "+data.name + data.password)
    const {name,password} = data
    return axios.post(`http://localhost:5000/login/`,
        {
            username:name,
            password:password,
        },
    )
}

export function requestAddUser(data) {
    console.log("request "+data.name + data.password)
    const {name,email,password} = data
    return axios.post(`http://localhost:5000/adduser/`,
        {
            username:name,
            email:email,
            password:password,
        },
    )
}
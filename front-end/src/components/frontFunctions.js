export const addItemToSession = (data) => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    Object.assign(user,data)
    sessionStorage.setItem('user', JSON.stringify(user))
}

export const lvlNames = (number)=>{
    switch (number){
        case 1:
            return "Początkujący"
        case 2:
            return "Amator"
        case 3:
            return "Średnio-zaawansowany"
        case 4:
            return "Zaawansowany"
        case 5:
            return "Profesjonalista"
        default:
            return "Początkujący"
    }
}
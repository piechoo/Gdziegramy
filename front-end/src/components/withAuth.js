import React, { useEffect, useState } from 'react';
import AuthService from './AuthService';
import { useHistory} from "react-router-dom";

export default function withAuth(AuthComponent) {
    const Auth = new AuthService('http://localhost:5000');
       return function AuthWrapped (){
           const [user, setUser] = useState(null)
           let history = useHistory();

           let errorData={
               isLogged : false,
               userID : 0,
               username : "",
               error: "Zaloguj się żeby zobaczyć tą stronę !",
               level:0,
           }
           useEffect(()=>{
               if (!Auth.loggedIn()) {

                   sessionStorage.setItem('user', JSON.stringify(errorData));
                   history.replace('/login')
               }
               else {
                   try {
                       const profile = Auth.getProfile()
                       setUser(profile)
                   }
                   catch(err){
                       Auth.logout()
                       sessionStorage.setItem('user', JSON.stringify(errorData));
                       history.replace('/login')
                   }
               }
           },[])


           return user ?<AuthComponent user={user} />:null

       }
}
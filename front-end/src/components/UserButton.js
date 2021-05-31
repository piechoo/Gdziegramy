import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

const UserButton =()=> {


    const history = useHistory();
    const [options, setOptions] = useState({isLogged:false,level:{level:0,name:"ERROR"}});
    useEffect(()=>  {
        if(JSON.parse(sessionStorage.getItem('user')))
            setOptions(JSON.parse(sessionStorage.getItem('user')));
    },[])

    const routeChange = () =>{
        let path = `/userpanel`;
        history.push(path);
    }
    return options.isLogged ? (
            <button type="button" className="btn btn-link text-white"
                    onClick={routeChange}>{options.username}<br /> {`(${options.level.level}) ${options.level.name}`}</button>
    ) : null

}
export default UserButton
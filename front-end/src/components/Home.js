import React, {useEffect, useState} from "react";
import "./Login.css"
import {useHistory} from "react-router-dom";
import HomeTile from "./HomeTile";
import {addItemToSession} from "./frontFunctions";
import withAuth from './withAuth';

const Home =()=> {

    let history = useHistory();
    const [options, setOptions] = useState({isLogged:false});

    useEffect(()=>  {
        if(JSON.parse(sessionStorage.getItem('user'))) {
            const ops = JSON.parse(sessionStorage.getItem('user'))
            if(!ops.isLogged) {
                addItemToSession({error: "Musisz się zalogować żeby widzieć tą stronę!"})
                history.push("/login")
            }
            setOptions(ops);
        }
        else
            history.push("/login")

    },[])

    const firstColumn = [
        {
            href:"/addcourt",
            img:"./images/cropped/football.jpg",
            inside:"Dodaj boisko"
        },
        {
            href:"/addevent",
            img:"./images/cropped/shot.jpg",
            inside:"Dodaj wydarzenie"
        },
        {
            href:"/showevents",
            img:"./images/cropped/racket.jpg",
            inside:"Przeglądaj wydarzenia"
        }
    ]

    const secondColumn = [
        {
            href:"/showcourts",
            img:"./images/cropped/tennis.jpg",
            inside:"Przeglądaj boiska"
        },
        {
            href:"/markusers",
            img:"./images/cropped/team.jpg",
            inside:"Oceń graczy"
        },
        {
            href:"/createdevents",
            img:"./images/cropped/dribble.jpg",
            inside:"Utworzone wydarzenia"
        }
    ]



    return (
        <div>
            <div className="hello">
                {options.isLogged ? <h1 className="text-center">Witaj <b>{options.username}</b>!</h1>:""}
                <h1 className="text-danger text-center">{options.error}</h1>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
                {firstColumn.map(tile=>
                    <HomeTile key={tile.href} href={tile.href} img={tile.img} inside={tile.inside}></HomeTile>
                    )}

            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
                {secondColumn.map(tile=>
                    <HomeTile key={tile.href} href={tile.href} img={tile.img} inside={tile.inside}></HomeTile>
                )}

            </div>
        </div>

    )
}
export default withAuth(Home)
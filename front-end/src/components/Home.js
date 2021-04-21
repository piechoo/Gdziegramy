import React, {useEffect, useState} from "react";
import "./Login.css"
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogIn, setError} from "../redux/slices/optionsSlice";
import HomeTile from "./HomeTile";

const Home =(props)=> {


    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    const dispatch = useDispatch();
    const options = useSelector((state) => state.options);

    const firstColumn = [
        {
            href:"/addcourt",
            img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Microsoft_Suzhou_Football_Court.jpg/800px-Microsoft_Suzhou_Football_Court.jpg",
            inside:"Dodaj boisko"
        },
        {
            href:"/addevent",
            img:"http://cdn.cnn.com/cnnnext/dam/assets/160127095925-tennis-racket-stock-hp-tease-super-tease.jpg",
            inside:"Dodaj wydarzenie"
        },
        {
            href:"/showevents",
            img:"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/handsome-male-playing-basketball-outdoor-pkpix.jpg",
            inside:"Przeglądaj wydarzenia"
        }
    ]

    const secondColumn = [
        {
            href:"/showcourts",
            img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Microsoft_Suzhou_Football_Court.jpg/800px-Microsoft_Suzhou_Football_Court.jpg",
            inside:"Przeglądaj boiska"
        },
        {
            href:"/markusers",
            img:"http://cdn.cnn.com/cnnnext/dam/assets/160127095925-tennis-racket-stock-hp-tease-super-tease.jpg",
            inside:"Oceń graczy"
        },
        {
            href:"/createdevents",
            img:"https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/handsome-male-playing-basketball-outdoor-pkpix.jpg",
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
                <HomeTile href={tile.href} img={tile.img} inside={tile.inside}></HomeTile>
                )}

        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
            {secondColumn.map(tile=>
                <HomeTile href={tile.href} img={tile.img} inside={tile.inside}></HomeTile>
            )}

        </div>
    </div>

)
}
export default Home
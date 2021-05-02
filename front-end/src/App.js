import React, {useEffect, useState} from "react";
import {Link, Route, Switch, useHistory, withRouter, useLocation} from "react-router-dom";

import Index from "./components/Index";
import Login from "./components/Login";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "./redux/slices/optionsSlice"
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import MarkUsers from "./components/MarkUsers";
import MapWithSearch from "./components/MapWithSearch";
import NewCourt from "./components/NewCourt";
import CurrentEvents from "./components/CurrentEvents";
import ShowCourts from "./components/ShowCourts";
import AddEvent from "./components/AddEvent";
import MyEvents from "./components/MyEvents";
import UserButton from "./components/UserButton";

import "./App.css"
import UserPanel from "./components/UserPanel";

const App=()=> {
    const [options, setOptions] = useState({isLogged:false});
    const location = useLocation()
    let history = useHistory();
    useEffect(()=>  {
        if(JSON.parse(sessionStorage.getItem('user')))
            setOptions(JSON.parse(sessionStorage.getItem('user')));
    },[location.pathname])
    const loginOut = () => {
        sessionStorage.setItem('user', JSON.stringify({
            isLogged:false,
            userID:"",
            username:"",
            error:''
        }));
        setOptions(JSON.parse(sessionStorage.getItem('user')));
        history.push("/")
    }


  return (
      <div className="main">
          {options.isLogged ?
              <nav className="navbar navbar-dark bg-danger">
                  <div className="container-fluid">
                      <div className="navbar-header">
                          <Link to="/home" className="navbar-brand"><b>Gdzie Gramy?</b></Link>
                      </div>

                      <ul className="nav navbar-nav navbar-right">
                          <li>
                              <UserButton/>
                          </li>

                          <li>
                              <button type="button" className="btn btn-link text-white" onClick={loginOut}>Wyloguj</button>
                          </li>
                      </ul>
                  </div>
              </nav>:""}
        <Switch>
          <Route exact path="/"><Index/></Route>
          <Route path="/login"><Login/></Route>
          <Route path="/adduser"><AddUser/></Route>
          <Route path="/markusers"><MarkUsers/></Route>
          <Route path="/home"><Home/></Route>
          <Route path="/map"><NewCourt/></Route>
          <Route path="/addcourt"><NewCourt/></Route>
          <Route path="/showevents"><CurrentEvents/></Route>
          <Route path="/showcourts"><ShowCourts/></Route>
          <Route path="/addevent"><AddEvent/></Route>
          <Route path="/createdevents"><MyEvents/></Route>
          <Route path="/userpanel"><UserPanel/></Route>
        </Switch>
      </div>
  );
}

export default withRouter(App);
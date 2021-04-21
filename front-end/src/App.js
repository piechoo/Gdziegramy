import React from "react";
import {Link, Route, Switch, useHistory} from "react-router-dom";

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


function App() {
    const dispatch = useDispatch();
    const options = useSelector((state) => state.options);
    let history = useHistory();
    const loginOut = () => {
        dispatch(logOut())
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
                              <button type="button" className="btn btn-link text-white" onClick={loginOut}>{options.username}</button>
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
        </Switch>
      </div>
  );
}

export default App;
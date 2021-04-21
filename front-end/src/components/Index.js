import React from "react";
import "./Index.css"
import {Link} from "react-router-dom";

class Index extends React.Component {
    render() {
        return (
            <div className="index">
                <div className="index__form">
                    <h2 className="text-white m-3">Zrzeszamy fanów sportu z każdego miejsa.<br />Chcesz się dowiedzieć <b>GDZIE GRAMY?</b></h2>

                    <Link
                        className="btn btn-danger btn-lg mb-3 index__link"
                        role="button"
                        to="/login"
                    >
                        Zaloguj się
                    </Link>
                    <h3 className="text-white">Nie masz konta? </h3>
                    <a className="text-white" href="adduser">Zarejestruj się</a>
                </div>
            </div>
        );
    }
}

export default Index
import React from "react";
import "./Login.css"
import {Link} from "react-router-dom";

const HomeTile =(props)=> {

    return (
        <div className="col">
            <div className="card h-100">
                <img src={props.img}
                    className="card-img-top" alt="..."/>
                    <div className="card-body text-center">
                        <Link to={props.href} className="btn btn-danger btn-lg mb-3">
                            <h5 className="card-title">{props.inside}</h5>
                        </Link>
                    </div>
            </div>
        </div>
    )
}
export default HomeTile
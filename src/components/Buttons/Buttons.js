import React from "react";
import { Link } from "react-router-dom";

export const ButtonLink = (props) => {
    let color =props.color?props.color:'primary';
    let position = props.position?props.position:'start';
    return (
        <div className={'col-12 col-md-6 d-flex justify-content-center justify-content-sm-'+position} 
        style={{ marginBottom: '0.5rem' }}>
            <Link to={props.url}><span
                className={'btn btn-'+color+' btn-lg waves-effect waves-light mt-1'} >{props.icon}{props.name}</span>
                </Link>
        </div>
    )
}

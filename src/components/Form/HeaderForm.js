import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeaderForm = (props) => {


    return (
        <>
            <h4 className="mt-0 header-title" style={{ fontSize: '1.5rem', color: 'black' }}>{props.Title}</h4>
            <p style={{ fontSize: '1rem', color: 'black' }}>{props.subTitle}</p>
            <br />
        </>
    )
}

export default HeaderForm;
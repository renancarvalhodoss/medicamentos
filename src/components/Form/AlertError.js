import React, { useState } from "react";
import { Link } from "react-router-dom";

const AlertError = (props) => {


    return (
        <div>
            <div className="alert alert-danger alert-dismissible fade show mb-0" role="alert">
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => props.ClickClose()}></button>
                <p style={{ marginBottom: 0, whiteSpace: 'pre' }}>{props.msgErro}</p>
            </div>
            <br />
        </div>
    )
}

export default AlertError;
import React from 'react';
import { Link } from 'react-router-dom';
const queryParameters = new URLSearchParams(window.location.search)
const message = queryParameters.get("message");

const Error = (props) => {
    return (
        <div>
            <h2>There has been an error</h2>
            {props.invoice && <div>No invoices found.</div>}
            {message && <div>{message}</div>}
            <Link to="/">Go to Home</Link>
        </div>
    );
};

export default Error;
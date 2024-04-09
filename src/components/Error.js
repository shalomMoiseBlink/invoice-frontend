import React from 'react';
const queryParameters = new URLSearchParams(window.location.search)
const message = queryParameters.get("message");

const Error = (props) => {
const reload =()=>{
    window.location.reload()
}
    return (
        <div className='text'>
            <h2>There has been an error</h2>
            {props.invoice && <div>No invoices found.</div>}
            {message && <div>{message}</div>}
            <button onClick={reload} className='btn btn-success'>Go Home</button>
        </div>
    );
};

export default Error;
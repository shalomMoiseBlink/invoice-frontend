import React from 'react';

const Error = (props) => {
    return (
        <div>
            {props.invoice && <div>No invoices found.</div>}
        </div>
    );
};

export default Error;
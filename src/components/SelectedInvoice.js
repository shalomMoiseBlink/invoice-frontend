import React from 'react';

const SelectedInvoice = (props) => {
    const {id, name, amount} = props.invoice
    return (
        <div>
               <h2 className="text">Take Payment</h2>
          <p className="text">Invoice: <i>{id}</i> to {name} for £ {amount}</p>
        </div>
    );
};

export default SelectedInvoice;
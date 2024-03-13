import React from 'react';

const Modal = (props) => {
  const {transaction_id, customer_email, customer_name, payment_source, status, amount, /*currency*/ } = props.transaction
    return (
        <ul>
            <li>Transaction {status}</li>
            <li>Transaction ID: {transaction_id}</li>
            <li>Amount: £{amount}</li>
            <li>Payee: {customer_name}</li>
            <li>Receipt sent to {customer_email}</li>
            <li>Payment Method: {payment_source}</li>
           
        </ul>
    );
};

export default Modal;
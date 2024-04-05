import React, { useState } from 'react';
import Loading from './Loading';
import {Route, Link } from 'react-router-dom';
import * as BlinkAPI from '../blinkAPI'
const PaidInvoice = (props) => {
    const invoiceId = window.location.href.split("/paidInvoice/")[1];
    const [invoice, setInvoice] = useState(null);
    const [transaction, setTransaction] = useState();
    if(!invoice){
        BlinkAPI.getInvoiceById(invoiceId)
        .then((res)=>{
            setInvoice(res)
            console.log(res)
            return res.transaction_id
        }).then((transaction)=>{
            BlinkAPI.createNewToken().then(()=>{
                BlinkAPI.getTransactionById(transaction)
                .then((trasnactionRes)=>{
                    console.log(trasnactionRes.data)
                    setTransaction(trasnactionRes.data)
                })
            })
            
        })
    }

    const cardLogos = {
        "Visa Credit Card": 'visa',
        "Visa Debit Card": 'visa',
        "MasterCard Credit Card": 'mastercard',
        "MasterCard Debit Card": 'mastercard',
        "Maestro (UK) Card": 'maestro',
        "American Express Card": 'amex',
        "Visa Electron Card": 'visa',
        "JCB Card": 'jcb',
        "Direct Debit": 'direct-debit'
    }

    return (
        <div>

            {!invoice || !transaction ? <div>
                <Loading />
            </div> : 
                <div className='modal text' >
              
    Invoice <i>{invoice.id}</i> for <i>{invoice.name}</i> was paid in full (<i>£ {invoice.amount}</i> by <i>{transaction.customer_name}</i> ).
    Payment Method:   
    <img src={window.location.href.split("/paidInvoice/")[0] + `/images/${cardLogos[transaction.payment_source]}.svg`} data={transaction.payment_source} className='card-logos' alt={transaction.payment_source}></img>
    

                </div>
            }
            <br></br>
            <Link to="/" className='btn btn-success'>Back to Invoices</Link>
        </div>
    );
};

export default PaidInvoice;
import React, {useState} from 'react';
import * as BlinkAPI from '../blinkAPI';
import Modal from './Modal';
const Success = (props) => {
    const [transactionResult, setTransactionResult] = useState(null)
    const fetchTransaction = () => {
        BlinkAPI.getTransactionById(props.transaction_id).then((res) => { 
            setTransactionResult(res.data)
            
         })
    }

    const closeModal =()=>{
        setTransactionResult(null)
    }
    return (
        <div className="text">{!transactionResult ? 
            <div>
            {props.paymentType === "credit-card" && props.status === "captured" ||
             props.paymentType === "direct-debit" && props.status === "Pending+Submission"  ?
                <div>
                    Invoice <b>{props.invoiceId}</b> for £{props.invoice.amount} has been paid.
                </div> :
                <div>
                    Payment for invoice  {props.invoiceId} has failed, please try again.
                </div>}
                 <button onClick={fetchTransaction} className='btn btn-success'>Click to see the transaction details</button> 
                </div>
            : <div>
              <Modal transaction={transactionResult}/>
              <button className='btn btn-danger' onClick={closeModal}>Close</button>
            </div>
        }
        </div>
    );
};

export default Success;
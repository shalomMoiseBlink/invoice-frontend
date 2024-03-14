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
        <div>{!transactionResult ? 
            props.status === "captured" ?
                <div>
                    Invoice <b>{props.invoiceId}</b> for £{props.invoice.amount} has been paid.
                    Click <button onClick={fetchTransaction}>here</button> to see the transaction details
                </div> :
                <div>
                    Payment for invoice  {props.invoiceId} has failed, please try again.
                </div>
            : <div>
              <Modal transaction={transactionResult}/>
              <button onClick={closeModal}>Close</button>
            </div>
        }
        </div>
    );
};

export default Success;
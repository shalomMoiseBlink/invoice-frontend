import React, { useState } from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import Success from './Success';
import * as BlinkAPI from '../blinkAPI'
const Return = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const status = queryParameters.get("status");
    const transaction_id = queryParameters.get("transaction_id");
    const merchant_data = JSON.parse(decodeURIComponent(queryParameters.get("merchant_data")));

    const [invoice, setInvoice] = useState(null)

    if (!invoice) {
        BlinkAPI.getInvoiceById(merchant_data.invoice_id)
            .then((res) => {

                setInvoice(res)
            })
    }

    return (
        <div>

            {!invoice ? <div>
                <Loading />
            </div> :
                <div>
                    <Success status={status} transaction_id={transaction_id} invoiceId={merchant_data.invoice_id} invoice={invoice} paymentType={merchant_data.payment_type} />
                    <br></br>
                    <Link to="/" className='btn btn-success'>Back to Invoices</Link>
                </div>
            }

        </div>
    );
};

export default Return;
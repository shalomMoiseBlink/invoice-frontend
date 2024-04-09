import React, { useState } from 'react';
import Loading from './Loading';
import * as BlinkAPI from '../blinkAPI';

function HostedForm(props) {
    const [submitted, submit] = useState(true);
    const [intent, setIntent] = useState(null); 
    const customJquery = document.createElement("script");
    customJquery.id = "customJquery";
    customJquery.src = `${window.location.origin}/custom.js`;
    document.head.appendChild(customJquery);

    if (!intent) BlinkAPI.getIntentById(props.intent.id)
        .then((intent) => {
            setIntent(intent)
            submit(false)
        });
    function createMetaData(invoiceId) {
        const merchantData = JSON.stringify({
            invoice_id: invoiceId,
            payment_type: "credit-card"
        });
        return `<input type="hidden" name="merchant_data" value=${merchantData}></input>`
    }

    const hideForm = () => {
        setTimeout(() => {
            submit(true)
        }, 2000)

    }
    function createMarkup() {
        return { __html: intent.element.ccMotoElement + createMetaData(props.invoiceId) + `<input type="submit" />` };
    }
    return (
        <div>
            {submitted ? <Loading /> :
                <form disabled={submitted} id="paymentForm" className='payment-modal' onSubmit={hideForm} action={`${process.env.REACT_APP_API_URL}/blink/process/`} dangerouslySetInnerHTML={createMarkup()} method="post">
                </form>
            }
        </div>
    );
}

export default HostedForm;

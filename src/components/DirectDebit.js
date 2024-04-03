import React from 'react';

const DirectDebit = (props) => {
    const {invoice} = props;
    function createMetaData(invoiceId) {
        const merchantData = JSON.stringify({
            invoice_id: invoiceId,
            payment_type: "direct-debit"
        });
        return `<input type="hidden" name="merchant_data" value=${merchantData}></input>`
    }

    function createMarkup() {
        console.log(props.invoice);

        const [givenName, familyName] = invoice.name.split(" ");
        const formArr = [givenName, familyName, '', invoice.email];
        let directDebitArr= props.intent.element.ddElement.split('value=""');
        for (let i = 0; i <formArr.length; i++){
        directDebitArr[i] += `value='${formArr[i]}'`;
        }
        const str = directDebitArr.join("")

        return { __html: str + createMetaData(props.invoiceId) + '<input type="submit" value="Charge"/>' };
    }
    return (
        <div >

            <form id="ddPaymentForm" action={`${process.env.REACT_APP_API_URL}/blink/process/`} dangerouslySetInnerHTML={createMarkup()} method="post"></form>

        </div>
    );
};

export default DirectDebit;
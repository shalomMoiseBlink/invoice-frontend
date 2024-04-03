import React from 'react';

const PaymentModal = (props) => {

    const takePaymentCC = () => {
        setLoading(true)
        return blinkAPI.createIntent(selectedInvoice)
          .then((intentRes) => {
            if (intentRes.success === false){ 
              console.log(intentRes.message)
              setError(true)
            }
            else {
              setIntent(intentRes);
              setMethod("card")
              setLoading(false);
    
              setIntentLoad(true);
            }
    
          }).catch((err) => { console.log(err) })
    
    
      };
    
      const takePaymentDD = () => {
        setLoading(true)
    
        return blinkAPI.createIntent(selectedInvoice)
          .then((intentRes) => {
            if (intentRes.success === false) console.log(intentRes.message);
            else {
              setIntent(intentRes);
              setMethod("direct debit")
              setLoading(false);
              setIntentLoad(true);
            }
    
          }).catch((err) => { console.log(err) })
    
    
      };
      const makePaylink = () => {
        setLoading(true)
    
        const paylInkBody = {
          payment_method: payment_types,
          transaction_type: "SALE",
          full_name: selectedInvoice.name,
          email: selectedInvoice.email,
          transaction_unique: `Invoice ID: ${selectedInvoice.id}`,
          is_decide_amount: false,
          amount: selectedInvoice.amount,
          notes: "Please pay Promptly",
          notification_url:  "https://63aa-154-57-250-68.ngrok-free.app/blink/paylink-notification",
          is_notification_required: false
        }
        return blinkAPI.createPaylink(paylInkBody)
          .then((res) => {
            setPaylink(res);
            setLoading(false);
          })
      }
    return (
        <div className="modal">
          <div className="modal-content">
            <h2>Take Payment</h2>
            <p>{`Invoice ID: ${selectedInvoice.id}`}</p>
            {payment_types.includes("credit-card") && <button onClick={takePaymentCC}>Take Payment via card</button>}
            {payment_types.includes("direct-debit") && <button onClick={takePaymentDD}>Take payment via Direct Debit</button>}
            <button onClick={makePaylink}>Send a PayLink</button>
            <button onClick={() => setPaymentModalOpen(false)}>Cancel</button>
          </div>
          {intentLoading ? <div>
            {method === "card" ?
              <HostedForm intent={intent} invoiceId={selectedInvoice.id} /> :
              <DirectDebit intent={intent} invoiceId={selectedInvoice.id} invoice={selectedInvoice}/>
            }
          </div> :
            paylink ? (<div>
              <p> Paylink <a href={paylink.paylink_url}> {paylink.id}</a> has been made.</p>
            </div>) :
              isLoading ? <div><Loading /></div> : <div></div>}
        </div>
    );
};

export default PaymentModal;
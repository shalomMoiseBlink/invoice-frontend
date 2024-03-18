import React, {useState} from 'react';

const DirectDebit = (props) => {
const [directDebitExists, setDirectDebit] = useState(false);
const [directDebitOn, setDirectDebitOn] = useState(false);

  
    if(props.intent.element.ddElement && !directDebitExists) setDirectDebit(true)
const loadDirectDebit =()=> {
   setDirectDebitOn(true)
}
function createMetaData(invoiceId){
    const merchantData =JSON.stringify({
        invoice_id: invoiceId
    });        
    return `<input type="hidden" name="merchant_data" value=${merchantData}></input>`
 }   
 function createMarkup() {
    return {__html: props.intent.element.ddElement + createMetaData(props.invoiceId)+'<input type="submit" value="Charge"/>'};
  }
    return (
        <div >
            {!directDebitExists ? <div></div>:
              !directDebitOn ?
            <div>
                <button onClick={loadDirectDebit}>Take Direct Debit</button>
                </div> :
            <div>
                 <form id="ddPaymentForm" action="http://localhost:9000/blink/process/" dangerouslySetInnerHTML={createMarkup()} method="post"></form>
            </div> }
            
        </div>
    );
};

export default DirectDebit;
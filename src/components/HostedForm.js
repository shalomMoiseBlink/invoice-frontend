import React , {useState}from 'react';
import Loading from './Loading';
function HostedForm(props) {
        if(document.getElementById("blinkCardGateway")){
            // document.getElementById("blinkCardGateway").remove()
            // document.getElementById("customJquery").remove()
        }
            const blinkCardGateway = document.createElement("script");
            blinkCardGateway.id = "blinkCardGateway";
            blinkCardGateway.src = "https://gateway2.blinkpayment.co.uk/sdk/web/v1/js/hostedfields.min.js";
            document.head.appendChild(blinkCardGateway);
    
            // Load the custom.js script
            const customJquery = document.createElement("script");
            customJquery.id = "customJquery";
            // customJquery.src = "https://dev.blinkpayment.co.uk/assets/js/api/custom.js";
            customJquery.innerHTML = `$(function () {
                var formID = $('form').attr('id');
                var $form = $('#' + formID);
                
                var auto = {
                    autoSetup: true,
                    autoSubmit: true,
                    submitOnEnter: true,
                    nativeEvents: true
                };
                try {
                    var hf = $form.hostedForm(auto);
                } catch (e) {
                    //Add your exception handling code here
                    console.log("error here",  e)
                }
                 $('input[type=submit]').val('Charge');
            });`
            setTimeout(function() {
                document.head.appendChild(customJquery);
              }, 100);
     function createMetaData(invoiceId){
        const merchantData =JSON.stringify({
            invoice_id: invoiceId,
            payment_type: "credit-card"
        });        
        return `<input type="hidden" name="merchant_data" value=${merchantData}></input>`
     }   

     const [submitted,submit] = useState(false)
const hideForm =()=>{
    setTimeout(()=>{
        submit(true)
    }, 2000)

}

    function createMarkup() {
        return {__html: props.intent.element.ccMotoElement + createMetaData(props.invoiceId)+`<input type="submit" />`};
        
      }
    return (
        <div>
            {submitted ? <Loading /> :
           <form disabled={submitted} id="paymentForm" onSubmit={hideForm} action={`${process.env.REACT_APP_API_URL}/blink/process/`} dangerouslySetInnerHTML={createMarkup()} method="post">
        </form>    
}   
        </div>
    );
}

export default HostedForm;

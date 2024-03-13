import React, { useState } from 'react';
import * as blinkAPI from '../blinkAPI';
import HostedForm from './HostedForm';
import Loading from './Loading';
import Error from './Error';


function MainPage() {
  const [token] =  useState(null)
  const [intent, setIntent] =  useState(null)
  const [intentLoading, setIntentLoad] =  useState(false)
  const [invoices, setInvoices] = useState([]);
  const [invoiceLoading, setInvoiceLoading] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paylink, setPaylink] = useState(null);
  const [isLoading, setLoading] = useState(false); 
  const [isError, setError] = useState(false)
  const openPaymentModal = (invoice) => {   
    setIntentLoad(false)
    setIntent(null);
    setSelectedInvoice(invoice);

    setPaymentModalOpen(true);
  };
  const loadInvoices = ()=>{
    return blinkAPI.getAllInvoices().then((res)=>{
      if(!invoiceLoading){
      setInvoices(res)
      setInvoiceLoading(true)
      }
    }).catch((err)=>{
      setError(true)
      console.log(err)
    })
  }
  loadInvoices()
  const takePayment = () => {
    setLoading(true)
   return blinkAPI.createNewToken()
   .then(()=>{ 
    blinkAPI.createIntent(selectedInvoice)
    .then((intentRes)=>{
      setIntent(intentRes); 
      setLoading(false);   
      setIntentLoad(true);
    }).catch((err)=>{console.log(err)})
  })
   
  };
const makePaylink =()=>{
  setLoading(true)
  return blinkAPI.createNewToken()
  .then((token)=>{ 
const paylInkBody = {
  payment_method: token.payment_types,
    transaction_type: "SALE",
    full_name: selectedInvoice.name,
    email: selectedInvoice.email,
    transaction_unique: `Invoice ID: ${selectedInvoice.id}`,
    is_decide_amount: false,
    amount: selectedInvoice.amount,
    notes: "Please pay Promptly",
    notification_url: "https://webhook.site/28beac5e-3af7-4a7d-b7e2-3b7c14a15cc7",
    is_notification_required: false
}
    blinkAPI.createPaylink(paylInkBody)
    .then((res)=>{
    setPaylink(res);
    setLoading(false); 
    })
  })
}
  return (
    <div onLoad={loadInvoices}>
     {isError ? <Error invoice={true}/> :
      <table >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length >0? invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.name}</td>
              <td>{invoice.email}</td>
              <td>£{invoice.amount}</td>
              <td>{invoice.dueDate}</td>
              <td>
                {invoice.status === 'Unpaid' ? (
                  <button onClick={() => {openPaymentModal(invoice)}} disabled={paymentModalOpen}>Unpaid</button>
                ) : (
                  <span>Paid</span>
                )}
              </td>
            </tr>
          )): (<tr>{isError ? <td>Error in Laoding the invoices</td> :<td>Loading...</td>}</tr>)}
        </tbody>
      </table>
}
      {paymentModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Take Payment</h2>
            <p>{`Invoice ID: ${selectedInvoice.id}`}</p>
            <button onClick={takePayment}>Take Payment</button>
            <button onClick={makePaylink}>Send a PayLink</button>
            <button onClick={() => setPaymentModalOpen(false)}>Cancel</button>
          </div>
          {intentLoading ? <HostedForm intent={intent} invoiceId={selectedInvoice.id} token={token}/>: 
          paylink ? (<div>
            <p> Paylink <a href={paylink.paylink_url}> {paylink.id}</a> has been made.</p>
          </div>): 
          isLoading ? <div><Loading/></div>: <div></div>}
        </div>
      )}
    </div>
  );
          
}

export default MainPage;

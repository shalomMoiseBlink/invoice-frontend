import React, { useState } from 'react';
import * as blinkAPI from '../blinkAPI';
import HostedForm from './HostedForm';
import Loading from './Loading';
import Error from './Error';
import DirectDebit from './DirectDebit';
import * as utils from'../utils';
function MainPage() {
  const [token] = useState(null)
  const [intent, setIntent] = useState(null)
  const [intentLoading, setIntentLoad] = useState(false)
  const [invoices, setInvoices] = useState([]);
  const [invoiceLoading, setInvoiceLoading] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paylink, setPaylink] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [method, setMethod] = useState("card");
  const [payment_types, setPaymentTypes] = useState([])
  const openPaymentModal = (invoice) => {
    setIntentLoad(false)
    setIntent(null);
    setSelectedInvoice(invoice);
    blinkAPI.createNewToken().then((token) => {
      setPaymentTypes(token.payment_types)
      setPaymentModalOpen(true);
    })

  };
  const loadInvoices = () => {
    return blinkAPI.getAllInvoices().then((res) => {
      const {created_at, invoices} = res;
      if (invoices.filter((invoice) => invoice.status === "Unpaid").length <= 0 || utils.createDate() !== created_at) {
        setError(false)
        setInvoiceLoading(true)
        setInvoices([]);
        return blinkAPI.refreshInvoices()
        .then((res)=>{
          setInvoices(res.invoices);
        })
      } else if (!invoiceLoading) {
        setInvoices(invoices)
        setInvoiceLoading(true)
      }
    }).catch((err) => {
      setError(true)
      console.log(err)
    })
  }
  if (!invoiceLoading) loadInvoices()
  const takePaymentCC = () => {
    setLoading(true)
    console.log(payment_types)
    console.log(payment_types.includes("credit-card"))
    return blinkAPI.createIntent(selectedInvoice)
      .then((intentRes) => {
        if (intentRes.success === false) console.log(intentRes.message);
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
      full_name: selectedInvoice.name,
      email: selectedInvoice.email,
      transaction_unique: `Invoice ID: ${selectedInvoice.id}`,
      amount: selectedInvoice.amount
    }
    return blinkAPI.createPaylink(paylInkBody)
      .then((res) => {
        setPaylink(res);
        setLoading(false);
      })
  }
  return (
    <div onLoad={loadInvoices}>
      {isError ? <Error invoice={true} /> :
        <table >
          <thead>
            <tr>
              <th>Invoice-ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.name}</td>
                <td>{invoice.email}</td>
                <td>{invoice.currency.symbol}{invoice.amount}</td>
                <td>{invoice.dueDate}</td>
                <td>
                  {invoice.status === 'Unpaid' ? (
                    <button onClick={() => { openPaymentModal(invoice) }} disabled={paymentModalOpen}>Unpaid</button>
                  ) : (
                    <span>Paid</span>
                  )}
                </td>
              </tr>
            )) : (<tr>{isError ? <td>Error in Loading the invoices</td> : <td>Loading...</td>}</tr>)}
          </tbody>
        </table>
      }
      {paymentModalOpen && (
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
              <DirectDebit intent={intent} invoiceId={selectedInvoice.id} invoice={selectedInvoice} />
            }
          </div> :
            paylink ? (<div>
              <p> Paylink <a href={paylink.paylink_url}> {paylink.id}</a> has been made.</p>
            </div>) :
              isLoading ? <div><Loading /></div> : <div></div>}
        </div>
      )}
    </div>
  );

}

export default MainPage;

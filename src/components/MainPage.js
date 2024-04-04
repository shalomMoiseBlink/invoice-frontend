import React, { useState } from 'react';
import * as blinkAPI from '../blinkAPI';
import HostedForm from './HostedForm';
import Loading from './Loading';
import Error from './Error';
import DirectDebit from './DirectDebit';
import SelectedInvoice from './SelectedInvoice';
import * as utils from '../utils';
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
      setLoading(false);
    })

  };
  const loadInvoices = () => {
    return blinkAPI.getAllInvoices().then((res) => {
      const { created_at, invoices } = res;
      if (invoices.filter((invoice) => invoice.status === "Unpaid").length <= 0 || utils.createDate() !== created_at) {
        setError(false)
        setInvoiceLoading(true)
        setInvoices([]);
        return blinkAPI.refreshInvoices()
          .then((res) => {
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
    setMethod("Paylink")
    setIntentLoad(false)
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
  const closeModal = () => {
    setPaymentModalOpen(false);
    setMethod(null)
    setPaylink(null)
  }
  return (
    <div className="table-responsive" onLoad={loadInvoices}>
      {isError ? <Error invoice={true} /> :

        !paymentModalOpen && invoices.length > 0 ?
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
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
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.name}</td>
                  <td>{invoice.email}</td>
                  <td>{invoice.currency.symbol}{invoice.amount}</td>
                  <td>{invoice.dueDate}</td>
                  <td>
                    {invoice.status === 'Unpaid' ? (
                      <button className='btn btn-danger' onClick={() => { openPaymentModal(invoice) }} disabled={paymentModalOpen}>Unpaid</button>
                    ) : (
                      <span className='btn btn-success'>Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> : isError ? <div>Error in Loading the invoices</div> :isLoading && <Loading />}


      {paymentModalOpen && (
        <div className="modal">
          <SelectedInvoice invoice={selectedInvoice} />
          <div className="modal-content">
            {payment_types.includes("credit-card") && <button className='btn paymentBtn' onClick={takePaymentCC}>Take Payment via card</button>}
            {payment_types.includes("direct-debit") && <button className='btn paymentBtn' onClick={takePaymentDD}>Take payment via Direct Debit</button>}
            <button className='btn paymentBtn' onClick={makePaylink}>Send a PayLink</button>
            <button className='btn btn-danger ' onClick={closeModal}>Cancel</button>
          </div>
          {intentLoading ? <div>
            {method === "card" ?
              <HostedForm intent={intent} invoiceId={selectedInvoice.id} /> :
              <DirectDebit intent={intent} invoiceId={selectedInvoice.id} invoice={selectedInvoice} />
            }
          </div> :
            paylink ? (<div className="text">
              <p > Paylink  {paylink.id}has been made and sent to <i> {selectedInvoice.email}</i></p>
              <a href={paylink.paylink_url}><button className='btn paymentBtn'>Open Paylink</button> </a>
            </div>) :
              isLoading ? <div><Loading /></div> : <div></div>}
        </div>
      )}
    </div>
  );

}

export default MainPage;

import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:9000/blink'
});


export const createNewToken = () => {

    return instance.post('/token').then((token) => {
        return token.data;
    })
        .catch((err) => err);

}

export const createIntent = (invoiceInfo) => {
    const {name, email, amount } = invoiceInfo;
    return instance.post('/intent', {
        customer_email: email,
        customer_name: name,
        amount: amount,
        transaction_type: "SALE",
        payment_type: "credit-card",
        currency: "GBP",
        return_url: "http://localhost:3000/return",
        notification_url: "http://google.com",
        card_layout: "single-line"
    }).then(({ data }) => {
        return data
    }).catch((err) => err);
}


export const getAllInvoices =()=>{
    return instance.get("/invoices")
    .then(({ data })=>{
        return data.data
    }).catch((err) => err);
}

export const getInvoiceById = (id)=>{
    return instance.get(`/invoices/${id}`)
    .then(({ data })=>{
        return data
    }).catch((err) => err);
}

export const getTransactionById = (id)=>{
    return instance.get(`/transactions/${id}`)
    .then(({ data })=>{
        return data
    }).catch((err) => err);
}

export const createPaylink = (body)=>{
    return instance.post(`/paylink/`, body)
    .then(({ data })=>{
        return data
    }).catch((err) => err);
}
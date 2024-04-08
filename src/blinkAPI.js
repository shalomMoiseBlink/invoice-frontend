import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/blink`
});


export const createNewToken = () => {

    return instance.post('/token').then((token) => {
        return token.data;
    })
        .catch((err) => err);

}

export const createIntent = (invoiceInfo) => {

    const { name, email, amount, currency } = invoiceInfo;
    return instance.post('/intent', {
        customer_email: email,
        customer_name: name,
        amount: amount,
        transaction_type: "SALE",
        payment_type: "credit-card",
        currency: currency.code,
        return_url: `${window.location.href}return`,
        notification_url: `${process.env.REACT_APP_API_URL}/blink/payment-notification`,
        card_layout: "single-line"
    }).then(({ data }) => {
        return data
    }).catch((err) => err);
}


export const getAllInvoices = () => {
    return instance.get("/invoices")
        .then((res) => {
            return res.data
        }).catch((err) => err);
}

export const getInvoiceById = (id) => {
    return instance.get(`/invoices/${id}`)
        .then(({ data }) => {
            return data
        }).catch((err) => err);
}

export const getTransactionById = (id) => {
    return instance.get(`/transactions/${id}`)
        .then((res) => {
            return res.data
        }).catch((err) => err);
}

export const createPaylink = (paylinkBody) => {
    const body = {
        ...paylinkBody,
        transaction_type: "SALE",
        is_decide_amount: false,
        notes: "Please pay Promptly",
        notification_url: `${process.env.REACT_APP_API_URL}/blink/paylink-notification`,
        redirect_url: window.location.href,
        is_notification_required: false
    }


    return instance.post(`/paylink/`, body)
        .then(({ data }) => {
            return data
        }).catch((err) => err);
}

export const refreshInvoices = () => {
    return instance.post(`/invoices/refresh/`)
        .then(({ data }) => {
            return data
        }).catch((err) => err);
}

export const addPaylinkToInvoice = (invoiceId, paylink) => {
    return instance.patch(`/invoices/${invoiceId}`, { paylinkDetails: paylink })
        .then(({ data }) => {
            return data
        }).catch((err) => err);
}

export const getPaylinkById = (paylinkId)=>{
    return instance.get(`/paylinks/${paylinkId}`) .then(({ data }) => {
        return data
    }).catch((err) => err);
}
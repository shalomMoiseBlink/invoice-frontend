import React from 'react';

const Modal = (props) => {

    const { transaction_id, customer_email, customer_name, payment_source, status, amount } = props.transaction;
    const cardLogos = {
        "Visa Credit Card": 'visa',
        "Visa Debit Card": 'visa',
        "MasterCard Credit Card": 'mastercard',
        "MasterCard Debit Card": 'mastercard',
        "Maestro (UK) Card": 'maestro',
        "American Express Card": 'amex',
        "Visa Electron Card": 'visa',
        "JCB Card": 'jcb',
        "Direct Debit": 'direct-debit'
    }

    return (
            <ul >
                <li>Transaction <i>{status}</i></li>
                <li>Transaction ID: <i>{transaction_id}</i></li>
                <li>Amount: <i>£{amount}</i></li>
                <li>Payee: <i>{customer_name}</i></li>
                <li>Receipt sent to <i>{customer_email}</i></li>
                <li>Payment Method: <img src={window.location.href.split("/return?")[0] + `/images/${cardLogos[payment_source]}.svg`} data={payment_source} className='card-logos' alt={payment_source}></img></li>
            </ul>
       );
};

// 'cardTypes' => [
//     'VC' => 'Visa',
//     'MC' => 'MasterCard',
//     'DC' => 'Discover',
//     'DN' => 'Diners',
//     'AM' => 'American Express'
// ],
// 'cardTypesCodes' => [
//     'Visa' => 'VC',
//     'MasterCard' => 'MC',
//     'Discover' => 'DC',
//     'Diners'  => 'DN',
//     'American Express' => 'AM'
// ],

// 'cardTypeFullNames' => [
//     'VC' => 'Visa Credit',
//     'VD' => 'Visa Debit',
//     'EL' => 'Visa Electron',
//     'VA' => 'Visa ATM',
//     'VP' => 'Visa Purchasing',
//     'AM' => 'Amex',
//     'MC' => 'Mastercard Credit',
//     'MD' => 'Mastercard Debit',
//     'MA' => 'MasterCard Maestro',
//     'MP' => 'MasterCard Purchasing',
//     'MU' => 'Maestro',
//     'CU' => 'China UnionPay',
//     'CC' => 'China UnionPay Credit',
//     'CD' => 'China UnionPay Debit',
//     'DN' => 'Diners Club',
//     'DI' => 'Diners Club',
//     'DS' => 'Discover',
//     'JC' => 'JCB',
// ],

// 'cardTypeIcons' => [
//     'VC' => 'Visa.png',
//     'VD' => 'Visa.png',
//     'EL' => 'visa-electron.png',
//     'VA' => 'Visa.png',
//     'VP' => 'Visa.png',
//     'AM' => 'Amex.png',
//     'MC' => 'icon-master-card.jpg',
//     'MD' => 'icon-master-card.jpg',
//     'MA' => 'icon-master-card.jpg',
//     'MP' => 'icon-master-card.jpg',
//     'MU' => 'maestro.png',
//     'CU' => 'unionpay-card-icon.png',
//     'CC' => 'unionpay-card-icon.png',
//     'CD' => 'unionpay-card-icon.png',
//     'DN' => 'diners.png',
//     'DI' => 'diners.png',
//     'DS' => 'discover.png',
//     'JC' => 'jcb-card-icon.png',
// ],


export default Modal;
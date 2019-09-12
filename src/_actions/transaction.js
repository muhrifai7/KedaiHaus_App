import axios from 'axios'

export const getTransactions = (id, data) => {
    databefore = {
        id: id,
        tableNumber: data,
        finishedTime: null,
        subtotal: null,
        discount: 0,
        serviceCharge: 10,
        tax: 5,
        isPaid: 0
    }
    return {
        type: 'GET_TRANSACTIONS',
        payload: data
    }
}

export const postTransactionsId = (data) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: axios({
            url: 'http://192.168.1.112:5000/api/v1/transaction',
            method: 'POST',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}

export const updateOrder = (data) => {
    return {
        type: 'UPDATE_TRANSACTION',
        payload: axios.patch('https://foodappss.herokuapp.com/api/v1/transaction',{data})
    }
}
import axios from 'axios'

export const getTransactions = (data) => {
    // databefore = {
    //     id: id,
    //     tableNumber: data,
    //     orderId: null,
    //     subtotal: null,
    //     discount: 0,
    //     serviceCharge: 10,
    //     tax: 5,
    //     isPaid: 0
    // }
    return {
        type: 'GET_TRANSACTIONS',
        payload: data
    }
}

export const postTransactionsId = (data) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: axios({
            url: 'https://foodappss.herokuapp.com/api/v1/transaction',
            method: 'POST',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}

export const updateOrder = (data,id) => {
     console.log("id",id)
    return {
        type: 'UPDATE_TRANSACTION',
        payload: axios({
            url: `https://foodappss.herokuapp.com/api/v1/transaction/${id}`,
            method: 'PATCH',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}
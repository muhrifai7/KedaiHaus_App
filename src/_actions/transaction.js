export const addTransaction = (data) => {
    return {
        type: 'ADD_TRANSACTION',
        payload: axios({
            url: 'http://192.168.1.46:5000/api/v1/transaction',
            method: 'POST',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}
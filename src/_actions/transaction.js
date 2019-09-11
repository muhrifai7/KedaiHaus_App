export const postOrder = (data) => {
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
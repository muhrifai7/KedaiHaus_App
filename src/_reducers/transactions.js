
const initialState = {
    is_Loading : false,
    orders : [],
    message : ''
}

const transactions = (state = initialState, action) =>  {
   switch (action.type) {
    case 'ADD_TRANSACTION_PENDING':
    return {
        ...state,
        is_Loading: true
    }
    
    case 'ADD_TRANSACTION':
    return {
        ...state,
        data: action.payload,
        message: action.payload.data.message,
        is_Loading: false
    }
    
    case 'ADD_TRANSACTION_REJECTED':
    return {
        ...state,
        message: action.payload.data.message,
        isLoading: false
     }
        default:
           return state;
    }

}
export default transactions
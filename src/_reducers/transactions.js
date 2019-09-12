
const initialState = {
    is_Loading : false,
    data : [],
    message : '',
    dataBefore : ''
}

const transactions = (state = initialState, action) =>  {
   switch (action.type) {
    case 'ADD_TRANSACTION_PENDING':
    return {
        ...state,
        is_Loading: true
    }
    
    case 'ADD_TRANSACTION_FULFILLED':
    return {
        ...state,
        dataBefore: action.payload.data,
        message: action.payload.data.message,
        is_Loading: false
    }
    
    case 'UPDATE_TRANSACTION':
    return {
        ...state,
        data: action.payload,
        message: action.payload.data.message,
        is_Loading: false
    }
    
    case 'UPDATE_TRANSACTION_REJECTED':
    return {
        ...state,
        message: action.payload.data.message,
        isLoading: false
     }

    case 'ADD_TRANSACTION_REJECTED':
    return {
        ...state,
        message: action.payload.data.message,
        isLoading: false
     }
     case 'GET_TRANSACTIONS':
            return {
                ...state,
                dataBefore: action.payload,
                isLoading: false
            }
        default:
           return state;
    }

}
export default transactions
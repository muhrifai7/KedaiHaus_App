const initialState = {
    isLoading : false,
    data : [],
}

const transactions = (state = initialState, action) =>  {
   switch (action.type) {
       case "ADD_ORDER" :
       return {
           ...state,
           isLoading: true,
           data: [...state.data,action.payload]
       }
    //    case "GET_PENDING_MENU" :
    //    return {
    //        ...state,
    //        isLoading: true
    //    }
       default:
           return state;
   }
}
export default transactions
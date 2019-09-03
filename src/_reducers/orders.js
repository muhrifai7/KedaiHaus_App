const initialState = {
    isLoading : false,
    data : [],
  
}

const orders = (state = initialState, action) =>  {
   switch (action.type) {
       case "GET_ORDER" :
       return {
           ...state,
           isLoading: true,
           data: action.payload,
           
       }
       case "GET_PENDING_MENU" :
       return {
           ...state,
           isLoading: true
       }
       default:
           return state;
   }
}
export default orders
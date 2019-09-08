const initialState = {
    is_Loading : false,
    data : [],
  
}

const drinks = (state = initialState, action) =>  {
   switch (action.type) {
    case "GET_PENDING_MENU" :
        return {
            ...state,
            is_oading: true
        }
       case "GET_DRINK" :
       return {
           ...state,
           data: action.payload,
           is_loading: false,
       }
    
       default:
           return state;
   }
}
export default drinks
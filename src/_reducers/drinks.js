const initialState = {
    isLoading : false,
    data : [],
  
}

const drinks = (state = initialState, action) =>  {
   switch (action.type) {
    case "GET_PENDING_MENU" :
        return {
            ...state,
            isLoading: true
        }
       case "GET_DRINK" :
       return {
           ...state,
           data: action.payload,
           isLoading: false,
       }
    
       default:
           return state;
   }
}
export default drinks
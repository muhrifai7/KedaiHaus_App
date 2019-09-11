const initialState = {
    is_Loading : true,
    data : [],
  
}

const drinks = (state = initialState, action) =>  {
   switch (action.type) {
    case "GET_PENDING_MENU" :
        return {
            ...state,
            is_Loading: true
        }
       case "GET_DRINK" :
       return {
           ...state,
           data: action.payload,
           is_Loading: false,
       }
    
       default:
           return state;
   }
}
export default drinks
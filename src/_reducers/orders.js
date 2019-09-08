const initialState = {
    isLoading : false,
    orders : []
}

const transactions = (state = initialState, action) =>  {
   switch (action.type) {
       case 'ADD_NEW_ORDER':
      return {
        ...state,
        orders: [
          ...state.orders,
          action.payload
        ]
      };
       case 'UPDATE_ORDER_QTY': 
      return {
        ...state,
        orders: [
          ...action.payload
        ]
      };
       default:
           return state;
   }
}
export default transactions
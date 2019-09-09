const initialState = {
    isLoading : false,
    orders : []
}

const orders = (state = initialState, action) =>  {
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
      case 'RESET_ORDER':
        return {
            ...state,
            orders: action.payload
        };
      case 'INCREMENT':
          let data = action.payload
          let dataincrement = action.datapatch.findIndex(item => item.id == data.id)
          // console.log(dataincrement);
          // console.log(action.datapatch[dataincrement])
          let qtyNew = action.payload.qty++
          let dataincrementfix = { ...action.datapatch[dataincrement] , qty: qtyNew }
          console.log('hasil',dataincrementfix)
          // action.datapatch = action.datapatch.splice(dataincrement, 1, dataincrementfix)
          // let dataincrementNew = [...action.datafix, dataincrementfix]
          
         // dataincrementfix.pop()
          return {
              ...state,
              orders: {dataincrementfix,data}
          }
       default:
           return state;
   }
}
export default orders
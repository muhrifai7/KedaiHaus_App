const initialState = {
    isLoading : false,
    orders : [],
    isSelected: false
}

const orders = (state = initialState, action) =>  {
   switch (action.type) {

      case 'ADD_NEW_ORDER':
        return {
        ...state,
        orders: [
          ...state.orders,
          action.payload],
          isSelected: true
        
      };

      // case 'UPDATE_ORDER_QTY': 
      //   return {
      //   ...state,
      //   orders: [
      //     ...action.payload
      //   ]
      // };

      case 'RESET_ORDER':
        return {
            ...state,
            orders: action.payload
        };
        
      case 'INCREMENT':
          let data = action.payload
          let dataincrement = action.datapatch.findIndex(item => item.id == data.id)
          let qtyNew = data.qty + 1
          let dataincrementfix = { ...action.datapatch[dataincrement] , qty: qtyNew
          }
         
          action.datapatch = action.datapatch.splice(dataincrement, 1, dataincrementfix)
          let dataincrementNew = [...action.datafix, dataincrementfix]
         
          dataincrementNew.pop()
          return {
              ...state,
              orders: dataincrementNew
          };

      case 'DECREMENT' : 
        let dec = action.payload
        let dataDecrement = action.datapatch.findIndex(item => item.id == dec.id)
        let qtyBaru = dec.qty - 1
        let dataDecrementfix = { ...action.datapatch[dataDecrement] , qty: qtyBaru }
        if(dataDecrementfix.qty > 0) {
           action.datapatch = action.datapatch.splice(dataDecrement, 1, dataDecrementfix)
           console.log('dec',action.datapatch)
        }else {
          action.datapatch = action.datapatch.splice(dataDecrement, 1)
        }
       default:
           return state;
   }
}         
export default orders
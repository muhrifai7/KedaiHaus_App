export const addNewOrders = (data) => {
    return {
      type: 'ADD_NEW_ORDER',
      payload: data
    }
}

export const updateOrderQty = (data) => {
  return {
    type: 'UPDATE_ORDER_QTY',
    payload: data
  }
}
export const resetorder = () => {
  return {
      type: 'RESET_ORDER',
      payload: []
  }
}
export const Increment = (data, datapatch,datafix) => {
  return {
      type: 'INCREMENT',
      payload: data,
      datapatch,
      datafix
  }
}
export const Decrement = (data, datapatch, datafix) => {
  return {
      type: 'DECREMENT',
      payload: data,
      datapatch,
      datafix
  }
}
// export const Count = (data, datapatch, datafix) => {
//   return {
//       type: 'COUNT',
//       payload: data,
//       datapatch,
//       datafix
//   }
// }
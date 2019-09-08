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

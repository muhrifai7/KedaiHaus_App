export const getMenu = (menu) => {
    return {
      type: 'GET_MENU',
      payload: menu
    }
}

export const getMenuPending = () => {
  return {
    type: 'GET_PENDING_MENU'
  }
}

// export const getBreakFast = (databf) => {
//   return {
//     type: 'GET_BREAK_FAST',
//     payload : databf
//   }
// }
  
const initialState = {
    foods: [],
    is_Loading: true,
    message: ''
  }
  
 const menus = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_MENUS_PENDING':
        return {
          ...state,
          is_Loading: true
        }
  
      case 'GET_MENUS': 
        return {
          ...state,
          is_Loading: false,
          foods: action.payload
        }
  
      case 'GET_MENUS_REJECTED': 
        return {
          ...state,
          isLoading: false,
          message: 'Cannot get data menus'
        }
    
      default:
        return state;
    }
  }
  
  export default menus;
  
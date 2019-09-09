const initialState = {
    foods: [],
    is_loading: false,
    message: ''
  }
  
 const menus = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_MENUS_PENDING':
        return {
          ...state,
          is_loading: true
        }
  
      case 'GET_MENUS': 
        return {
          ...state,
          isLoading: false,
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
  
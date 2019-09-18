const initialState = {
    is_Loading: true,
    data: [],
    message: ''
  }
  
 const menus = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_MENUS_PENDING':
        return {
          ...state,
          is_Loading: true
        }
        case "GET_MENU_FOOD_FULFILLED":
            return {
                ...state,
                is_Loading: false,
                data : action.payload.data
            };
         
  
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
  
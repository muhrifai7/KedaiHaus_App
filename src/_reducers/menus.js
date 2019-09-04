const initialState = {
     isLoading : false,
     data : [],
   
}

const menus = (state = initialState, action) =>  {
    switch (action.type) {
        case "GET_MENU" :
        return {
            ...state,
            
            data: action.payload,
            isLoading: false,
            
        }
        case "GET_PENDING_MENU" :
        return {
            ...state,
            isLoading: true
        }
        case "GET_BREAK_FAST" :
        return {
            ...state,
            data: action.payload,
            isLoading: true
        }
        default:
            return state;
    }
}
export default menus

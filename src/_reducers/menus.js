const initialState = {
    data : [],
    isLoading : false
}

const menus = (state = initialState, action) =>  {
    switch (action.type) {
        case "GET_MENU" :
        return {
            ...state,
            data: action.payload,
            isLoading: false
        }
        case "GET_CATEGORIE" :
        return {
            ...state,
            data: action.payload,
            isLoading: false
        }
        default:
            return state;
    }
}
export default menus
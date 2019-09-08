const initialState = {
    is_loading: false,
    data : [],
    foods : []
}

const allmenus = (state = initialState, action) =>  {
    switch (action.type) {
        case "GET_PENDING_MENU" :
            return {
                ...state,
                is_loading: true
            }
        case "GET_MENU_ALL":
            return {
                ...state,
                is_loading: false,
                data: action.payload
            };
            case "GET_MENU_FOOD":
            return {
                ...state,
                is_loading: false,
                foods: action.payload
            };
            case "MENUS_GET_REJECTED":
            return {
                ...state,
                data: action.payload.data
            };
        default:
            return state;
    }
}
export default allmenus
const initialState = {
    is_Loading: true,
    data : [],
    foods : []
}

const allmenus = (state = initialState, action) =>  {
    switch (action.type) {
        case "GET_MENU" :
            return {
                ...state,
                is_Loading: true
            }
        case "GET_MENU_ALL_FULFILLED":
            let data = action.payload.data
            .map(item=> ({
                ...item, selected: false
            }))
            return {
                ...state,
                is_Loading: false,
                data
            };
            case "GET_MENU_FOOD":
            return {
                ...state,
                is_loading: false,
                foods: action.payload.data.menus
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
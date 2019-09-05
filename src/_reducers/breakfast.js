const initialState = {
    is_loading: false,
    data : []
}

const breakfast = (state = initialState, action) =>  {
    switch (action.type) {
        case "GET_BF" :
        return {
            ...state,
            data: action.payload,
            isLoading: false,
        }
        default:
            return state;
    }
}
export default breakfast
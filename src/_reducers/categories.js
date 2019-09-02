
const initialState = {
    data : []
}

const categories = (state = initialState, action) =>  {
    switch (action.type) {
        case "GET_CATEGORIE" :
        return {
            ...state,
            data: action.payload
        }
        default:
            return state;
    }
}
export default categories
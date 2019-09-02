// aksions dari redux
const initialState = {
    number : 0,
    label : 'increment',
    payload : ''
    // ...state untuk eksekusi property yang lain di return nya
}
/*
* comment state2nya
*

*
*
*
*
*/

const counter = (state = initialState, action)=> {
    // state = 0 -> initial,bisa {number : 0} nomber : state + 1
    switch (action.type) {
      case 'INCREMENT':
        return { number : state.number + 1}
      case 'DECREMENT':
        return  { number : state.number - 1}
        case 'ADD_DATA_USERS':
        return  { number : state.number - 1}
      // case 'GET_DATA_USERS' : 
      // return {}
      default:
        return state
    }
  }
  export default counter
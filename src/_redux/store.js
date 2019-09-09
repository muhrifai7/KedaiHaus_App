import { createStore,combineReducers, applyMiddleware  } from  'redux'
import { logger } from './middleware';
import promise from 'redux-promise-middleware'



import drinks from '../_reducers/drinks';
import orders from '../_reducers/orders';
import allmenus from '../_reducers/allmenus';
import menus from "../_reducers/menus";

// this global states
const reducers = combineReducers({
    drinks,
    orders,
    allmenus,
    menus
})

const store = createStore(
    reducers,
    applyMiddleware(logger,promise)
  );
  
export default store

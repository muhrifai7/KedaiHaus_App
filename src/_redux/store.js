import { createStore,combineReducers, applyMiddleware  } from  'redux'
import { logger } from './middleware';
import promise from 'redux-promise-middleware'



import drinks from '../_reducers/drinks';
import orders from '../_reducers/orders';
import allmenus from '../_reducers/allmenus';
import menus from "../_reducers/menus";
import transactions from "../_reducers/transactions"

// this global states
const reducers = combineReducers({
    drinks,
    orders,
    allmenus,
    menus,
    transactions
})

const store = createStore(
    reducers,
    applyMiddleware(promise,logger)
  );
  
export default store

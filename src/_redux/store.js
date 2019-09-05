import { createStore,combineReducers, applyMiddleware  } from  'redux'
import { logger } from './middleware';
import promise from 'redux-promise-middleware'

import counter from '../_reducers/counter';
import users from '../_reducers/users';
import menus from '../_reducers/menus';
import categories from '../_reducers/categories';
import breakfast from '../_reducers/breakfast'

import drinks from '../_reducers/drinks';
import transactions from '../_reducers/transactions';
//alihkan ke variabale reducer ,paramsnya object


// this global states
const reducers = combineReducers({
    counter, 
    users,
    menus,
    categories,
    breakfast,
    drinks,transactions
})

const store = createStore(
    reducers,
    applyMiddleware(logger,promise)
  );
  
  export default store

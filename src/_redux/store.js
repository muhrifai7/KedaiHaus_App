import { createStore,combineReducers, applyMiddleware  } from  'redux'
import { logger } from './middleware';

import counter from '../_reducers/counter';
import users from '../_reducers/users';
import menus from '../_reducers/menus';
import categories from '../_reducers/categories';
import orders from '../_reducers/orders';
//alihkan ke variabale reducer ,paramsnya object


// this global states
const reducers = combineReducers({
    counter, 
    users,
    menus,
    categories,
    orders
})

const store = createStore(
    reducers,
    applyMiddleware(logger)
  );
  
  export default store
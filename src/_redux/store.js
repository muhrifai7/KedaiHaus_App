import { createStore,combineReducers, applyMiddleware  } from  'redux'
import { logger } from './middleware';

import counter from '../_reducers/counter';
import users from '../_reducers/users';
import menus from '../_reducers/menus';
import categories from '../_reducers/categories';
//alihkan ke variabale reducer ,paramsnya object


// this global states
const reducers = combineReducers({
    counter, 
    users,
    menus,
    categories
})

const store = createStore(
    reducers,
    applyMiddleware(logger)
  );
  
  export default store
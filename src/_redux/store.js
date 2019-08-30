import { createStore,combineReducers, applyMiddleware  } from  'redux'
import counter from '../_reducers/counter';
import users from '../_reducers/users';
//alihkan ke variabale reducer ,paramsnya object
import { logger } from './middleware';
// this global states
const reducers = combineReducers({
    counter, 
    users
})

const store = createStore(
    reducers,
    applyMiddleware(logger)
  );
  
  export default store
export const getUsers = (users)=> {
    return {
        type: 'GET_USERS',
        payload: users
    }
   
} 
export const getUsersPending = () => {
    return {
      type: 'GET_USERS_PENDING'
    }
  }

export const getDataUsers = () => {
    return {
        type : 'GET_DATA_USERS'
    }
}
import {Config} from '../env/config'
import axios from 'axios'

export const getMenuPending = () => {
  return {
    type: 'GET_PENDING_MENU'
  }
}

export const getAllMenu = () => {
  return {
    type: 'GET_MENU_ALL',
    payload :axios.get(`${Config}/menus`)
  }
}

// export const getFood = () => {
//   return {
//     type: 'GET_MENU_FOOD',
//     payload :axios.get(`${Config}/categorie/menus/2`)
//   }
// }
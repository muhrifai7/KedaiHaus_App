import Config from '../env/Config'
import axios from 'axios'

export const getMenuPending = () => {
  return {
    type: 'GET_PENDING_MENU'
  }
}

export const getAllMenu = () => {
  return {
    type: 'GET_MENU_ALL',
    payload :axios.get("https://foodappss.herokuapp.com/api/v1/menus")
  }
}

export const getFood = () => {
  return {
    type: 'GET_MENU_FOOD',
    payload :axios.get(`${Config.host}/menus/1`)
  }
}
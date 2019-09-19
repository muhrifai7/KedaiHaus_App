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

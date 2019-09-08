import Config from '../env/Config'
import axios from 'axios'

export const getMenuPending = () => {
  return {
    type: 'GET_PENDING_MENU'
  }
}

export const getAllMenu = (menus) => {
  return {
    type: 'GET_MENU_ALL',
    payload :menus
  }
}

export const getFood = (food) => {
  return {
    type: 'GET_MENU_FOOD',
    payload :food
  }
}
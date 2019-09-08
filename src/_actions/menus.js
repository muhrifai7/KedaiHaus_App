import axios from "axios";
import Config from '../env/Config'

export const getMenus = () => {
  return {
    type: 'GET_MENUS',
    payload: axios.get(`${Config.host}/menus`)
  }
}
import axios from "axios";
import Config from '../env/config'

export const getFood = (data) => {
  return {
    type: 'GET_MENUS',
    payload:data
  }
}
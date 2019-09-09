import axios from "axios";
import Config from '../env/Config'

export const getFood = (data) => {
  return {
    type: 'GET_MENUS',
    payload:data
  }
}
import axios from "axios";
import Config from '../env/config'

export const getFood = () => {
  return {
    type: 'GET_MENU_FOOD',
    payload :axios.get(`https://foodappss.herokuapp.com/api/v1/categorie/menus/2`)
  }
}
import axios from 'axios'

export const getDrinkfast = () => {
    return {
      type: 'GET_DRINK',
      payload: axios.get(`https://foodappss.herokuapp.com/api/v1/categorie/menus/3`)
    }
}
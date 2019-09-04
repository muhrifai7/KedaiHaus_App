import axios from 'axios'
const addOrder = (odereran) => ({
  type: 'FOO',
  payload: axios({
    url: `http://192.168.1.46:5000/api/v1/order`,
    method: 'POST',
    data: orderan,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
});

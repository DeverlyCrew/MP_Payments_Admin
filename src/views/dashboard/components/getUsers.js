import axios from 'axios'
import addData from './addData'

const getUsers = (setData, setShowData) => {
  axios
    .get(`http://localhost:8002/get-users`)
    .then((res) => {
      addData(res.data.data, setData, setShowData)
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status === 401) {
        localStorage.clear()
        window.location.href = '/#/login'
      }
    })
}

export default getUsers

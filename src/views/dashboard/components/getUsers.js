import { httpClient } from 'src/components/interceptor'
import addData from './addData'

const getUsers = (setData, setShowData) => {
  httpClient
    .get(`${process.env.REACT_APP_URL}/get-users`)
    .then((res) => {
      addData(res.data.data, setData, setShowData)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default getUsers

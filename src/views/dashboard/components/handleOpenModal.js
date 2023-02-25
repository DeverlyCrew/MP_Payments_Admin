import { httpClient } from 'src/components/interceptor'

const handleOpenModal = (setCourses, setModalIsOpen) => {
  httpClient
    .get(`${process.env.REACT_APP_URL}/get-courses`)
    .then((res) => {
      setCourses(res.data.data)
      setModalIsOpen(true)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default handleOpenModal

import axios from 'axios'

const handleOpenModal = (setCourses, setModalIsOpen) => {
  axios
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

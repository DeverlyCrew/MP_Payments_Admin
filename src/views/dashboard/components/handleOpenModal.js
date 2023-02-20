import axios from 'axios'

const handleOpenModal = (setCourses, setModalIsOpen) => {
  axios
    .get('http://localhost:8002/get-courses', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      setCourses(res.data.data)
      setModalIsOpen(true)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default handleOpenModal

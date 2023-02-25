import { httpClient } from 'src/components/interceptor'

const handleSubmit = (userObj, setModalIsOpen) => {
  httpClient
    .post(`${process.env.REACT_APP_URL}/register-user`, userObj)
    .then((res) => {
      setModalIsOpen(false)
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status === 401) {
        localStorage.clear()
        window.location.href = '/#/login'
      } else if (err.response.status === 409) {
        alert('Polaznik sa ovim emailom već postoji')
      }
    })
}

export default handleSubmit

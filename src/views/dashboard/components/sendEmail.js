import axios from 'axios'

export const sendEmail = (e, name, email) => {
  e.preventDefault()
  axios
    .post('http://localhost:8002/send-email', {
      subject: 'Upozorenje o isteku uplate',
      text: `želimo da Vas podsjetimo da je Vaša uplata za ${name} istekla`,
      email,
    })
    .then((res) => {
      alert(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

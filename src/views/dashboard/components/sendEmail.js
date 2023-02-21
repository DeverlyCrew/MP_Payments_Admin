import axios from 'axios'

export const sendEmail = (e, name, email) => {
  e.preventDefault()
  axios
    .post(`${process.env.REACT_APP_URL}/send-email`, {
      subject: 'Upozorenje o isteku uplate',
      text: `želimo da Vas podsjetimo da je Vaša uplata za "${name}"istekla`,
      email,
    })
    .then((res) => {
      alert(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

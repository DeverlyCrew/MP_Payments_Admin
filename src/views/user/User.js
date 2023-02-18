import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import './User.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CModal } from '@coreui/react'

const User = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const [user, setUser] = useState(null)
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [amount, setAmount] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    axios
      .post(
        `http://localhost:8002/get-user`,
        {
          user_id: id,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          localStorage.clear()
          window.location.href = '/login'
        }
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        'http://localhost:8002/add-payment',
        {
          user_id: id,
          amount,
          period: [fromDate, toDate],
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        setModalIsOpen(false)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div className="user_container">
        <div className="user_header">
          <h1>
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="user_header_buttons">
            <button className="btn btn-primary">Uredi</button>
            <button
              className="btn btn-info"
              onClick={() => {
                setModalIsOpen(true)
              }}
            >
              Dodaj plaćanje
            </button>
          </div>
        </div>
        <div className="user_body">
          <div className="user_body_left">
            <div className="user_body_left_item">
              <h3>Email</h3>
              <p>{user?.email}</p>
            </div>
            <div className="user_body_left_item">
              <h3>Grad</h3>
              <p>{user?.city}</p>
            </div>
            <div className="user_body_left_item">
              <h3>Broj telefona</h3>
              <p>{user?.phoneNumber}</p>
            </div>
          </div>
          <div className="user_body_right">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Iznos</th>
                  <th scope="col">Od:</th>
                  <th scope="col">Do:</th>
                </tr>
              </thead>
              <tbody>
                {user?.payments[0]?.payments.map((payment) => (
                  <tr key={payment.date}>
                    <td>{payment.amount}</td>
                    <td>{payment.period[0].split('T')[0]}</td>
                    <td>{payment.period[1].split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CModal visible={modalIsOpen}>
        <div className="modal_container">
          <div className="modal_header">
            <h1>Dodaj plaćanje</h1>
            <button
              className="btn btn-danger"
              onClick={() => {
                setModalIsOpen(false)
              }}
            >
              X
            </button>
          </div>
          <div className="modal_body">
            <div className="modal_body_item">
              <h3>Iznos</h3>
              <input type="number" onChange={(amount) => setAmount(amount.target.value)} />
            </div>
            <div className="modal_body_item_dates">
              <div className="modal_body_item">
                <h3>Od:</h3>
                <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} />
              </div>
              <div className="modal_body_item">
                <h3>Do:</h3>
                <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />
              </div>
            </div>
            <div className="modal_body_item">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Dodaj
              </button>
            </div>
          </div>
        </div>
      </CModal>
    </>
  )
}

export default User

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
  const [modalContent, setModalContent] = useState('')
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    course_id: '',
    course_name: '',
    city: '',
    address: '',
    phoneNumber: '',
  })
  const [courses, setCourses] = useState([])

  const handleDelete = (e) => {
    e.preventDefault()
    axios
      .delete(`${process.env.REACT_APP_URL}/delete-user/${id}`)
      .then((res) => {
        window.location.href = '/#/polaznici'
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          localStorage.clear()
          window.location.href = '/#/login'
        }
      })
  }

  const onOpenEditModal = () => {
    axios.get(`${process.env.REACT_APP_URL}/get-courses`).then((res) => {
      setCourses(res.data.data)
      setModalIsOpen(true)
    })
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`${process.env.REACT_APP_URL}/edit-user`, {
        id,
        firstName: editData.firstName,
        lastName: editData.lastName,
        email: editData.email,
        course_id: editData.course_id,
        city: editData.city,
        phoneNumber: editData.phoneNumber,
      })
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

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_URL}/get-user`, {
        user_id: id,
      })
      .then((res) => {
        setUser(res.data)
        setEditData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          course_id: res.data.courses[0]._id,
          course_name: res.data.courses[0].name,
          city: res.data.city,
          phoneNumber: res.data.phoneNumber,
        })
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
      .post(`${process.env.REACT_APP_URL}/add-payment`, {
        user_id: id,
        amount,
        period: [fromDate, toDate],
      })
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
            <button
              className="btn btn-primary"
              onClick={() => {
                onOpenEditModal()
                setModalContent('edit')
              }}
            >
              Uredi
            </button>
            <button
              className="btn btn-info"
              onClick={() => {
                setModalIsOpen(true)
                setModalContent('add-payment')
              }}
            >
              Dodaj plaćanje
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setModalIsOpen(true)
                setModalContent('delete')
              }}
            >
              Obriši
            </button>
          </div>
        </div>
        <div className="user_body">
          <div className="user_body_left">
            <div className="user_body_left_item">
              <h3>Kurs</h3>
              <p>{user?.courses[0]?.name}</p>
            </div>
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
          {modalContent === 'add-payment' ? (
            <>
              <div className="modal_header">
                <h1>Dodaj plaćanje</h1>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setModalIsOpen(false)
                    setModalContent('')
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
            </>
          ) : modalContent === 'edit' ? (
            <>
              <div className="modal_header">
                <h1>Uredi</h1>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setModalIsOpen(false)
                    setModalContent('')
                  }}
                >
                  X
                </button>
              </div>
              <div className="modal_body">
                <div className="modal_body_item">
                  <h3>Ime</h3>
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(firstName) =>
                      setEditData({ ...editData, firstName: firstName.target.value })
                    }
                  />
                </div>
                <div className="modal_body_item">
                  <h3>Prezime</h3>
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(lastName) =>
                      setEditData({ ...editData, lastName: lastName.target.value })
                    }
                  />
                </div>
                <div className="modal_body_item">
                  <h3>Email</h3>
                  <input
                    type="text"
                    value={editData.email}
                    onChange={(email) => setEditData({ ...editData, email: email.target.value })}
                  />
                </div>
                <div className="modal_body_item">
                  <h3>Kurs</h3>
                  <select
                    onChange={(course) =>
                      setEditData({ ...editData, course_id: course.target.value })
                    }
                  >
                    <option key={editData.course_id} value={editData.course_id}>
                      {editData.course_name}
                    </option>
                    {courses?.map((course) => {
                      if (course.name !== editData.course_name) {
                        return (
                          <option key={course._id} value={course._id}>
                            {course.name}
                          </option>
                        )
                      }
                    })}
                  </select>
                </div>
                <div className="modal_body_item">
                  <h3>Grad</h3>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(city) => setEditData({ ...editData, city: city.target.value })}
                  />
                </div>
                <div className="modal_body_item">
                  <h3>Broj telefona</h3>
                  <input
                    type="text"
                    value={editData.phoneNumber}
                    onChange={(phoneNumber) =>
                      setEditData({ ...editData, phoneNumber: phoneNumber.target.value })
                    }
                  />
                </div>
                <div className="modal_body_item">
                  <button className="btn btn-primary" onClick={handleEditSubmit}>
                    Uredi
                  </button>
                </div>
              </div>
            </>
          ) : modalContent === 'delete' ? (
            <>
              <div className="modal_header">
                <h1>Obriši</h1>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setModalIsOpen(false)
                    setModalContent('')
                  }}
                >
                  X
                </button>
              </div>
              <div className="modal_body">
                <div className="modal_body_item">
                  <h3>Da li ste sigurni da želite da obrišete korisnika?</h3>
                </div>
                <div className="modal_body_item">
                  <button className="btn btn-primary" onClick={handleDelete}>
                    Obriši
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </CModal>
    </>
  )
}

export default User

import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import axios from 'axios'
import { CModal } from '@coreui/react'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [city, setCity] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [courses, setCourses] = useState([])

  const handleOpenModal = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post(
        'http://localhost:8002/register-user',
        {
          firstName,
          lastName,
          email,
          course_id: course,
          city,
          phoneNumber: phoneNum,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  useEffect(() => {
    axios
      .get('http://localhost:8002/get-users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          localStorage.clear()
          window.location.href = '/#/login'
        }
      })
  }, [])
  return (
    <>
      <div className="dashbard_container">
        <div className="dashboard_header">
          <h1>Polaznici</h1>
          <button className="btn btn-primary" onClick={handleOpenModal}>
            Dodaj polaznika
          </button>
        </div>
        <div className="dashboard_body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Ime</th>
                <th scope="col">Prezime</th>
                <th scope="col">Email</th>
                <th scope="col">Kurs</th>
                <th scope="col">Datum zadnje uplate</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((polaznik) => (
                <tr
                  key={polaznik._id}
                  onClick={() => {
                    window.location.href = `/#/user/${polaznik._id}`
                  }}
                >
                  <td>{polaznik.firstName}</td>
                  <td>{polaznik.lastName}</td>
                  <td>{polaznik.email}</td>
                  <td>{polaznik.courses.name}</td>
                  <td>{polaznik.latestPayment?.split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CModal visible={modalIsOpen} size="lg">
          <div className="modal_container">
            <div className="modal_header">
              <h1>Dodaj polaznika</h1>
              <button className="btn btn-danger" onClick={() => setModalIsOpen(false)}>
                X
              </button>
            </div>
            <div className="modal_body">
              <form>
                <div className="form-group">
                  <label htmlFor="firstName">Ime</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Unesite ime"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Prezime</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Unesite prezime"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Unesite email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="">Izaberite kurs</option>
                    {courses?.map((kurs) => (
                      <option key={kurs._id} value={kurs._id}>
                        {kurs.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="city">Grad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Unesite grad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNum">Broj telefona</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNum"
                    placeholder="Unesite broj telefona"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                  Dodaj
                </button>
              </form>
            </div>
          </div>
        </CModal>
      </div>
    </>
  )
}

export default Dashboard

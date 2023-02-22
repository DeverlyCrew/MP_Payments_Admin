import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { CModal } from '@coreui/react'
import { MakeRow } from './components/makeRow'
import handleOpenModal from './components/handleOpenModal'
import getUsers from './components/getUsers'
import handleSubmit from './components/handleSubmit'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [showData, setShowData] = useState(data)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [city, setCity] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [courses, setCourses] = useState([])

  const handleSearch = (e) => {
    if (e.target.value === '') {
      setShowData(data)
      return
    }
    const filteredData = data.filter((polaznik) => {
      return (
        polaznik.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        polaznik.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        polaznik.courses.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setShowData(filteredData)
  }

  useEffect(() => {
    getUsers(setData, setShowData)
  }, [])
  return (
    <>
      <div className="dashbard_container">
        <div className="dashboard_header">
          <h1>Polaznici</h1>
          <input
            type="text"
            className="form-control search_input"
            placeholder="Pretraži polaznike"
            onChange={handleSearch}
          />
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModal(setCourses, setModalIsOpen)}
          >
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
                <th scope="col">Status</th>
                <th scope="col">Email status</th>
              </tr>
            </thead>
            <tbody>{showData?.map(MakeRow)}</tbody>
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit(
                      {
                        firstName,
                        lastName,
                        email,
                        course_id: course,
                        city,
                        phoneNumber: phoneNum,
                      },
                      setModalIsOpen,
                    )
                  }}
                >
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

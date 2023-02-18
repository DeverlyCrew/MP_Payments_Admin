import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Admins.css'
import { CModal } from '@coreui/react'

const Admins = () => {
  const [admins, setAdmins] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modal, setModal] = useState(false)

  const addAdmin = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8002/add-admin', {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const deleteAdmin = (id) => {
    axios
      .delete(`http://localhost:8002/delete-admin/${id}`)
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    axios
      .get('http://localhost:8002/get-admins', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setAdmins(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div className="admins">
        <div className="admins_header">
          <h1>Admini</h1>
          <button className="btn btn-primary" onClick={() => setModal(true)}>
            Dodaj Admina
          </button>
        </div>
        <div className="admins_table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Ime</th>
                <th scope="col">Prezime</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {admins?.map((admin) => (
                <tr key={admin._id}>
                  <td className="table_item">{admin.firstName}</td>
                  <td className="table_item">{admin.lastName}</td>
                  <td className="table_item">{admin.email}</td>
                  <td className="td_button">
                    <button className="btn btn-danger" onClick={() => deleteAdmin(admin._id)}>
                      Izbriši
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CModal visible={modal}>
        <div className="modal-header">
          <h3 className="modal-title">Dodaj Admina</h3>
          <button className="btn-close" onClick={() => setModal(false)}></button>
        </div>
        <div className="modal-body">
          <form onSubmit={addAdmin}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Ime
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Prezime
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Dodaj
            </button>
          </form>
        </div>
      </CModal>
    </>
  )
}

export default Admins

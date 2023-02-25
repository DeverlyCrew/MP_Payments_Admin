import React, { useState, useEffect } from 'react'
import { httpClient } from 'src/components/interceptor'
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
    httpClient
      .post(`${process.env.REACT_APP_URL}/add-admin`, {
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
    httpClient
      .delete(`${process.env.REACT_APP_URL}/delete-admin/${id}`)
      .then((response) => {
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    httpClient
      .get(`${process.env.REACT_APP_URL}/get-admins`)
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
                    <button
                      className="btn btn-danger text-white pr-1 pl-1 pt-0 pb-0"
                      onClick={() => deleteAdmin(admin._id)}
                    >
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
            <button type="submit" className="btn btn-primary mb-3 mt-3 w-100">
              Dodaj
            </button>
          </form>
        </div>
      </CModal>
    </>
  )
}

export default Admins

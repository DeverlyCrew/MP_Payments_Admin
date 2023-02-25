import React, { useState } from 'react'
import { httpClient } from 'src/components/interceptor'
import './ChangePassword.css'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')
  const [error, setError] = useState('')

  const changePassword = (e) => {
    e.preventDefault()
    if (newPassword !== newPasswordAgain) {
      setError('Passwordi se ne poklapaju')
    } else if (newPassword.length < 6) {
      setError('Lozinka mora imati najmanje 6 karaktera')
    } else {
      httpClient
        .post(`${process.env.REACT_APP_URL}/change-admin-password`, {
          oldPassword,
          newPassword,
        })
        .then((response) => {
          alert('Uspješno promijenjena lozinka')
          setOldPassword('')
          setNewPassword('')
          setNewPasswordAgain('')
          setError('')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className="changePassword">
      <div className="changePassword_container">
        <h1>Promijeni lozinku</h1>
        <form onSubmit={changePassword}>
          <div className="changePassword_form">
            <label>Stara lozinka</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label>Nova lozinka</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>Ponovi novu lozinku</label>
            <input
              type="password"
              value={newPasswordAgain}
              onChange={(e) => setNewPasswordAgain(e.target.value)}
            />
            <button className="btn btn-primary w-100 mt-3 mb-3" type="submit">
              Promijeni lozinku
            </button>
            <p className="changePassword_error">{error}</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword

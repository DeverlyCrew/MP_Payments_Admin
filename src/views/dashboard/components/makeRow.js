import React from 'react'
import { sendEmail } from './sendEmail'

export const MakeRow = (polaznik) => (
  <tr key={polaznik._id} className="table_row_link">
    <td
      onClick={() => {
        window.location.href = `/#/user/${polaznik._id}`
      }}
    >
      {polaznik.firstName}
    </td>
    <td
      onClick={() => {
        window.location.href = `/#/user/${polaznik._id}`
      }}
    >
      {polaznik.lastName}
    </td>
    <td
      onClick={() => {
        window.location.href = `/#/user/${polaznik._id}`
      }}
    >
      {polaznik.email}
    </td>
    <td
      onClick={() => {
        window.location.href = `/#/user/${polaznik._id}`
      }}
    >
      {polaznik.courses.name}
    </td>
    <td
      onClick={() => {
        window.location.href = `/#/user/${polaznik._id}`
      }}
    >
      {polaznik.latestPayment?.split('T')[0]}
    </td>
    <td
      onClick={() => {
        window.location.href = `/#/user/${polaznik._id}`
      }}
    >
      {polaznik.status}
    </td>
    {polaznik.status === 'Nije plaćeno' ? (
      <td>
        <button
          className="btn btn-danger send_email_btn"
          onClick={(e) =>
            sendEmail(e, `${polaznik.firstName} ${polaznik.lastName}`, polaznik.email)
          }
        >
          Pošalji email
        </button>
      </td>
    ) : (
      <td></td>
    )}
  </tr>
)

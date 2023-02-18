import React, { useEffect, useState } from 'react'
import './Kursevi.css'
import axios from 'axios'
import { CModal } from '@coreui/react'

const Kursevi = () => {
  const [data, setData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [courseName, setCourseName] = useState('')

  const handleAddCourse = (e) => {
    e.preventDefault()
    axios
      .post(
        'http://localhost:8002/add-course',
        {
          name: courseName,
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

  useEffect(() => {
    axios
      .get('http://localhost:8002/get-courses', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          localStorage.clear()
          window.location.href = '/login'
        }
      })
  }, [])
  return (
    <>
      <div className="kursevi_container">
        <div className="kursevi_header">
          <h1>Kursevi</h1>
          <button className="btn btn-primary" onClick={() => setModalIsOpen(true)}>
            Dodaj kurs
          </button>
        </div>
        <div className="kursevi_body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Naziv</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((kurs) => (
                <tr key={kurs._id}>
                  <td>{kurs.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CModal visible={modalIsOpen} size="lg">
        <div className="modal_container">
          <div className="modal_header">
            <h1>Dodaj kurs</h1>
            <button className="btn btn-danger" onClick={() => setModalIsOpen(false)}>
              X
            </button>
          </div>
          <div className="modal_body">
            <form>
              <div className="form-group">
                <label htmlFor="courseName">Naziv kursa</label>
                <input
                  type="text"
                  className="form-control"
                  id="courseName"
                  placeholder="Unesite naziv kursa"
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleAddCourse}>
                Dodaj kurs
              </button>
            </form>
          </div>
        </div>
      </CModal>
    </>
  )
}

export default Kursevi

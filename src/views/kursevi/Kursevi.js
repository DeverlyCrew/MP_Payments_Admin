import React, { useEffect, useState } from 'react'
import './Kursevi.css'
import { httpClient } from 'src/components/interceptor'
import { CModal } from '@coreui/react'

const Kursevi = () => {
  const [data, setData] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [courseName, setCourseName] = useState('')
  const [courseId, setCourseId] = useState('')
  const [modalData, setModalData] = useState('')

  const handleAddCourse = (e) => {
    e.preventDefault()
    httpClient
      .post(`${process.env.REACT_APP_URL}/add-course`, {
        name: courseName,
      })
      .then((res) => {
        setModalIsOpen(false)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleDelete = (id) => {
    httpClient
      .delete(`${process.env.REACT_APP_URL}/delete-course/${id}`)
      .then((res) => {
        setModalIsOpen(false)
        setModalData('')
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    httpClient
      .get(`${process.env.REACT_APP_URL}/get-courses`)
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
          <button
            className="btn btn-primary"
            onClick={() => {
              setModalIsOpen(true)
              setModalData('add')
            }}
          >
            Dodaj kurs
          </button>
        </div>
        <div className="kursevi_body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Naziv</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((kurs) => (
                <tr key={kurs._id}>
                  <td>{kurs.name}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setModalIsOpen(true)
                        setModalData('delete')
                        setCourseId(kurs._id)
                      }}
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CModal visible={modalIsOpen}>
        <div className="modal_container">
          {modalData === 'add' ? (
            <>
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
                  <button
                    type="submit"
                    className="btn btn-primary mb-3 mt-3 w-100"
                    onClick={handleAddCourse}
                  >
                    Dodaj kurs
                  </button>
                </form>
              </div>
            </>
          ) : modalData === 'delete' ? (
            <>
              <div className="modal_header">
                <h1>Obriši kurs</h1>
                <button className="btn btn-danger" onClick={() => setModalIsOpen(false)}>
                  X
                </button>
              </div>
              <div className="modal_body">
                <div className="modal_body_item">
                  <h3>Da li ste sigurni da želite da obrišete kurs?</h3>
                </div>
                <div className="modal_body_item">
                  <button
                    className="btn btn-primary mb-2 w-100"
                    onClick={() => {
                      handleDelete(courseId)
                    }}
                  >
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

export default Kursevi

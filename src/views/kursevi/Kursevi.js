import React, { useEffect, useState } from 'react'
import './Kursevi.css'
import axios from 'axios'

const Kursevi = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8002/get-courses', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        setData(res.data.data)
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className="kursevi_container">
      <div className="kursevi_header">
        <h1>Kursevi</h1>
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
  )
}

export default Kursevi

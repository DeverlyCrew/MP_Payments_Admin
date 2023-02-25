import React, { useEffect, useState } from 'react'
import './Statistike.css'
import { httpClient } from 'src/components/interceptor'

const Statistike = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    httpClient
      .get(`http://localhost:8002/statistics`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="statistike">
      <div className="statistike_polaznici statistike_card">
        <p className="statistike_naslov">Broj Polaznika</p>
        <h1 className="statistike_broj">{data?.users}</h1>
        <div className="statistike_naziv">Polaznika</div>
      </div>
      <div className="statistike_kursevi statistike_card">
        <p className="statistike_naslov">Broj Kurseva</p>
        <h1 className="statistike_broj">{data?.courses}</h1>
        <div className="statistike_naziv">Kurseva</div>
      </div>
      <div className="statistike_admini statistike_card">
        <p className="statistike_naslov">Broj Admina</p>
        <h1 className="statistike_broj">{data?.admins}</h1>
        <div className="statistike_naziv">Admina</div>
      </div>
      <div className="statistike_zarada statistike_card">
        <p className="statistike_naslov">Zarada ovog mjeseca</p>
        <h1 className="statistike_broj">{data?.earnings}</h1>
        <div className="statistike_naziv">BAM</div>
      </div>
    </div>
  )
}

export default Statistike

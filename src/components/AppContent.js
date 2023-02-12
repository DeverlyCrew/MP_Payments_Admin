import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import axios from 'axios'

// routes config
import routes from '../routes'

const AppContent = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || false)
  useEffect(() => {
    if (!token || token === 'undefined') {
      return
    } else {
      axios
        .get('http://localhost:8002/is-token-valid', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          if (!res.data) {
            localStorage.clear()
            setToken(false)
            window.location.reload()
          }
          console.log(res.data)
          localStorage.setItem('token', res.data.user.token)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])
  if (!token) {
    return <Navigate to="/login" />
  }
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="polaznici" replace />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)

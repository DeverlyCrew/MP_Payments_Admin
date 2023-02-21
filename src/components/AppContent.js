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
        .get(`${process.env.REACT_APP_URL}/is-token-valid`)
        .then((res) => {
          if (!res.data) {
            localStorage.clear()
            setToken(false)
            window.location.reload()
          }
          localStorage.setItem('token', res.data.user.token)
        })
        .catch((err) => {
          localStorage.clear()
          setToken(false)
          window.location.reload()
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

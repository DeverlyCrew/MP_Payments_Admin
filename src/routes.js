import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Kursevi = React.lazy(() => import('./views/kursevi/Kursevi'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/polaznici', name: 'Polaznici', element: Dashboard },
  { path: '/kursevi', name: 'Kursevi', element: Kursevi },
]

export default routes

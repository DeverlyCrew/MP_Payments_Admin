import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Kursevi = React.lazy(() => import('./views/kursevi/Kursevi'))
const Logout = React.lazy(() => import('./views/logout/Logout'))
const User = React.lazy(() => import('./views/user/User'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/polaznici', name: 'Polaznici', element: Dashboard },
  { path: '/kursevi', name: 'Kursevi', element: Kursevi },
  { path: '/logout', name: 'Logout', element: Logout },
  { path: '/user/:id', name: 'User', element: User },
]

export default routes

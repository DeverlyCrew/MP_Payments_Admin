import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilMonitor,
  cilExitToApp,
  cilGroup,
  cilBarChart,
  cilLockLocked,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Polaznici',
    to: '/polaznici',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kursevi',
    to: '/kursevi',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Admini',
    to: '/admins',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Statistike',
    to: '/statistike',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Profil',
  },
  {
    component: CNavItem,
    name: 'Promijeni lozinku',
    to: '/changePassword',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Odjavi se',
    to: '/logout',
    icon: <CIcon icon={cilExitToApp} customClassName="nav-icon" />,
  },
]

export default _nav

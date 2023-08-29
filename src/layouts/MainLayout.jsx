import React from 'react'
import Menu from '../components/Menu'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
    <Menu/>
    <Outlet/>
    </>
  )
}

export default MainLayout
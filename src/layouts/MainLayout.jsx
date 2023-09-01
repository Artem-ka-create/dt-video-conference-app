import React from 'react'
import Menu from '../components/Menu'
import { Outlet } from 'react-router-dom'

function MainLayout({panelStatus, onChangePanel}) {
  return (
    <>
    <Menu panelStatus={panelStatus} onChangePanel={onChangePanel}/>
    <Outlet/>
    </>
  )
}

export default MainLayout
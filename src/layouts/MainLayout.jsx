import React from 'react'
import Menu from '../components/Menu'
import { Outlet } from 'react-router-dom'
// import styles from './'
import styles from './MainLayout.module.css'
import Avatar from '../components/Avatar/Avatar'
import  useAuth from '../hooks/useAuth'
function MainLayout({showToast,panelStatus, onChangePanel}) {

  const { auth } = useAuth();

  return (
    <>
    <div className={styles.header}>
      <Menu panelStatus={panelStatus} onChangePanel={onChangePanel}/>
      {auth.id ?
          <Avatar showToast={showToast}/>
          :
          <></>
      }
    </div>
    <Outlet/>
    </>
  )
}

export default MainLayout
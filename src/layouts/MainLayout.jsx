import React, {useEffect} from 'react'
import Menu from '../components/Menu'
import { Outlet } from 'react-router-dom'
// import styles from './'
import styles from './MainLayout.module.css'
import Avatar from '../components/Avatar/Avatar'
import  useAuth from '../hooks/useAuth'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
function MainLayout({showToast,panelStatus, onChangePanel}) {

  const { auth } = useAuth();
  const {setAuth} = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {

    // if (localToken == null) {

    function fetchBusinesses (){
      axiosPrivate.post(`/api/auth/login-credential`).then((response)=> {
        const accessToken = response?.data?.jwtAuthResponse;
        const id = response?.data?.id;
        const roles = response?.data?.roles;
        const name = response?.data?.name;
        const surname = response?.data?.surname;
        const username = response?.data?.username;

        const email = response?.data?.email;
        const password = response?.data?.password;

        // setAuth from response
        setAuth( {username, id ,password, email, name, surname, roles , accessToken});

      });
    }
    if (localStorage.getItem('DTMeetToken')){
      fetchBusinesses();
    }

  },[])

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
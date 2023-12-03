import React, { useEffect } from 'react'
import SimpleButton from './UI/Button/SimpleButton';
import { useNavigate } from 'react-router-dom';
import RoomListComponent from './RoomComponents/RoomListComponent';
import useAuth from '../hooks/useAuth';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Main() {

  const localToken = localStorage.getItem('DTMeetToken');
  console.log('LOCAl_TOKEN ---> ', localToken);

  const { auth } = useAuth();
  const {setAuth} = useAuth();

  const navigate = useNavigate();
  const buttonText = 'Sign in'
  const handleButtonClick = () => navigate('/signin');
  const axiosPrivate = useAxiosPrivate();

  console.log(auth);

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

      {auth.id || localToken != null ?
        <RoomListComponent />
        :
        <>
          <h1>Main</h1>
          <h2>This is main page of This App</h2>
          <h3>Rooms just for authorized users</h3>
          <SimpleButton hadleButtonFunction={handleButtonClick} btnText={buttonText} />
        </>
      }


    </>

  )
}

export default Main
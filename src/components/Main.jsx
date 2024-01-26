import React from 'react'
import SimpleButton from './UI/Button/SimpleButton';
import { useNavigate } from 'react-router-dom';
import RoomListComponent from './RoomComponents/RoomListComponent';
import useAuth from '../hooks/useAuth';

// import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Main({showToastEvent}) {

  const localToken = localStorage.getItem('DTMeetToken');
  console.log('LOCAl_TOKEN ---> ', localToken);

  const { auth } = useAuth();

  const navigate = useNavigate();
  const buttonText = 'Sign in'
  const handleButtonClick = () => navigate('/signin');

  console.log(auth);



  return (
    <>

      {auth.id || localToken != null ?
        <RoomListComponent showToastEvent={showToastEvent}/>
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
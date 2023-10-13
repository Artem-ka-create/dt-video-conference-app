import React from 'react'
import SimpleButton from './UI/Button/SimpleButton';
import {useNavigate} from 'react-router-dom';

function Main() {

  const navigate = useNavigate();
  const buttonText = 'Sign in'
  const handleButtonClick = ()=> navigate('/signin');

  return (
    <>
      <h1>Main</h1>
      <h2>This is main page of This App</h2>
      <h3>Rooms just for authorized users</h3>
      <SimpleButton hadleButtonFunction={handleButtonClick} btnText={buttonText}/>

    </>

  )
}

export default Main